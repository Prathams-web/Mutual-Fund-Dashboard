"use client";

import { Switch, Tag, Space, Typography, Card } from "antd";
import { FundOutlined, LineChartOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface FundsFilterProps {
  schemeType: string;
  setSchemeType: (type: string) => void;
  showHoldings: boolean;
  setShowHoldings: (val: boolean) => void;
}

const schemeTypes = ["All", "Equity", "Hybrid", "ELSS", "Index", "Flexi Cap"];

export default function FundsFilter({
  schemeType,
  setSchemeType,
  showHoldings,
  setShowHoldings,
}: FundsFilterProps) {
  return (
    <Card
      className="mb-5 shadow-sm border border-gray-200 rounded-xl bg-white"
      bodyStyle={{ padding: "16px 20px" }}
    >
      {/* Top Section — Toggle for All Funds / Holdings */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Text strong className="text-lg">
            View:
          </Text>
          <Space align="center" size="large">
            <Switch
              checked={showHoldings}
              onChange={setShowHoldings}
              checkedChildren={
                <span className="flex items-center gap-1">
                  <FundOutlined /> My Holdings
                </span>
              }
              unCheckedChildren={
                <span className="flex items-center gap-1">
                  <LineChartOutlined /> All Funds
                </span>
              }
            />
          </Space>
        </div>

        {/* Bottom Section — Filter by Scheme */}
        <div className="flex flex-wrap items-center gap-2">
          <Text strong className="text-lg">
            Filter by Scheme:
          </Text>
          <Space size={[8, 8]} wrap>
            {schemeTypes.map((type) => (
              <Tag
                key={type}
                color={schemeType === type ? "blue-inverse" : "default"}
                className="cursor-pointer text-base px-3 py-1 hover:scale-105 transition-all"
                onClick={() => setSchemeType(type)}
              >
                {type}
              </Tag>
            ))}
          </Space>
        </div>
      </div>
    </Card>
  );
}
