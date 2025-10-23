// MutualFundTable.tsx
"use client";

import React, { useEffect, useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import { ConfigProvider, GetProp, Input, Table } from "antd";
import FundsFilter from "./FundsFilter";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/es/table";
import FundsActions from "./FundsActions";
import { Fund, funds } from "@/app/api/funds/fundsData";
import { Search } from "lucide-react";
interface TableParams {
  pagination?: TablePaginationConfig;
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}
const MutualFundTable = () => {
  const { loading } = useFetchData<Fund[]>({
    // endPoint: "https://api.mfapi.in/mf",
    endPoint: "api/funds",
    defaultAPICall: true,
    isInternal: true,
    method: "GET",
    onSuccess(data, parsedData) {
      console.log({ data, parsedData });
    },
    req: null,
  });

  const [showHoldings, setShowHoldings] = useState(false);
  const [schemeType, setSchemeType] = useState("All");

  const filteredFunds = funds?.filter((f) => {
    const schemeMatch =
      schemeType === "All" ? true : f.schemeType.includes(schemeType);
    const holdingsMatch = showHoldings ? f?.isHolding : true;
    return schemeMatch && holdingsMatch;
  });

  const columns: ColumnsType<Fund> = [
    {
      title: "Fund Name",
      width: 120,
      dataIndex: "fundName",
      key: "fundName",
      render: (text) => (
        <span className="text-blue-600 underline cursor-pointer">{text}</span>
      ),
    },
    {
      title: "Scheme Type",
      width: 120,
      dataIndex: "schemeType",
      key: "schemeType",
    },
    {
      title: "Expense Ratio (%)",
      width: 120,
      dataIndex: "expenseRatio",
      key: "expenseRatio",
    },
    {
      title: "AUM",
      width: 120,
      dataIndex: "aum",
      key: "aum",
      sorter: (a, b) =>
        parseFloat(a.aum.replace(/[^0-9.]/g, "")) -
        parseFloat(b.aum.replace(/[^0-9.]/g, "")),
    },
    {
      title: "1Y Return (%)",
      width: 120,
      dataIndex: "oneYearReturn",
      key: "oneYearReturn",
      sorter: (a, b) =>
        parseFloat(a.oneYearReturn) - parseFloat(b.oneYearReturn),
      render: (text) => (
        <span className={parseFloat(text) >= 0 ? "text-success" : "text-error"}>
          {text}%
        </span>
      ),
    },
    {
      title: "Actions",
      width: 120,
      key: "actions",
      render: (_, record) => <FundsActions fundName={record.fundName} />,
    },
  ];

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
    },
  });

  const [query, setQuery] = useState("");
  const [displaySearch, setDisplaySearch] = useState<boolean>(false);
  const [tempTableData, setTempTableData] = useState<any[] | undefined>([]);

  const searchTable = (e: any) => {
    setQuery(e.target.value);
  };
  useEffect(() => {
    if (query === "") {
      setDisplaySearch(false);
      setTempTableData(undefined);
    } else {
      setDisplaySearch(true);

      const tempSearched = filteredFunds?.filter((item: any) =>
        Object.keys(item).some((key) =>
          String(item[key]).toLowerCase().includes(query.toLowerCase())
        )
      );
      filteredFunds && setTempTableData(tempSearched);
    }
  }, [query]);

  return (
    <div className="w-full flex flex-col gap-2">
      <FundsFilter
        schemeType={schemeType}
        setSchemeType={setSchemeType}
        showHoldings={showHoldings}
        setShowHoldings={setShowHoldings}
      />
      <div>
        {filteredFunds && filteredFunds?.length > 0 && (
          <div className="w-fit ">
            <Input
              prefix={<Search />}
              value={query}
              allowClear
              placeholder={`Search`}
              onChange={searchTable}
              onKeyUp={searchTable}
              style={{
                width: "200px",
              }}
              className="sm:h-full h-10"
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </div>
        )}
      </div>
      <div className="w-full flex flex-col ">
        <ConfigProvider
          theme={{
            components: {
              Table: {
                stickyScrollBarBorderRadius: 200,
                rowHoverBg: "#F8F9FC",
                rowSelectedHoverBg: "#87D068",
                // headerBg: "#2C4E80",
                headerBg: "#145299",
                headerColor: "white",
                cellPaddingInlineSM: 20,
                colorIconHover: "white",
                headerSortHoverBg: "#416baa",
                headerSortActiveBg: "#416baa",
              },
            },
          }}
        >
          <Table
            columns={columns}
            dataSource={displaySearch ? tempTableData : filteredFunds}
            rowKey="id"
            size="small"
            pagination={tableParams.pagination}
            className="!text-center "
            // loading={loading}
            scroll={{ y: 500, x: 800 }}
            onChange={(pagination, filters, sorter) => {
              setTableParams({
                pagination,
              });
            }}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default MutualFundTable;
