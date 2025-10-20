// MutualFundTable.tsx
"use client";

import React, {  useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import {  Table } from "antd";
import FundsFilter from "./FundsFilter";
import { ColumnsType } from "antd/es/table";
import FundsActions from "./FundsActions";
import { Fund } from "@/app/api/funds/fundsData";

const MutualFundTable = () => {
  const { data, loading } = useFetchData<Fund[]>({
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

  const filteredFunds = data?.filter((f) => {
    const schemeMatch =
      schemeType === "All" ? true : f.schemeType.includes(schemeType);
    const holdingsMatch = showHoldings ? f?.isHolding : true;
    return schemeMatch && holdingsMatch;
  });

  const columns: ColumnsType<Fund> = [
    {
      title: "Fund Name",
      dataIndex: "fundName",
      key: "fundName",
      render: (text) => (
        <span className="text-blue-600 underline cursor-pointer">{text}</span>
      ),
    },
    { title: "Scheme Type", dataIndex: "schemeType", key: "schemeType" },
    {
      title: "Expense Ratio (%)",
      dataIndex: "expenseRatio",
      key: "expenseRatio",
    },
    {
      title: "AUM",
      dataIndex: "aum",
      key: "aum",
      sorter: (a, b) =>
        parseFloat(a.aum.replace(/[^0-9.]/g, "")) -
        parseFloat(b.aum.replace(/[^0-9.]/g, "")),
    },
    {
      title: "1Y Return (%)",
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
      key: "actions",
      render: (_, record) => (
        <FundsActions  fundName={record.fundName} />
      ),
    },
  ];

  return (
    <div>
      <FundsFilter
        schemeType={schemeType}
        setSchemeType={setSchemeType}
        showHoldings={showHoldings}
        setShowHoldings={setShowHoldings}
      />

      {/* <div className="w-full flex flex-col h-[calc(100vh-180px)]"> */}
      <Table
        columns={columns}
        dataSource={filteredFunds}
        rowKey="id"
        pagination={{
          current: 1,
          showSizeChanger: true,
        }}
        loading={loading}
        scroll={{ y: "200", x: "100%" }}
        sticky
      />
      {/* </div> */}
    </div>
  );
};

export default MutualFundTable;
