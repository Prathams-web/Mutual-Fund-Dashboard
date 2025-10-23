"use client";

import { Card, Switch, Typography, Segmented, Space, Tooltip } from "antd";
import {
  FundOutlined,
  LineChartOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full"
    >
      <Card
        className="shadow-md border border-gray-200/60 rounded-2xl bg-gradient-to-r from-white/80 to-blue-50/50 backdrop-blur-md"
        style={{
          // padding: "20px 24px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <div className="flex flex-col gap-6 md:gap-4 lg:flex-row lg:items-center lg:justify-between w-full">
        
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <Text strong className="text-gray-700 text-base">
              View:
            </Text>
            <Tooltip title="Toggle between your portfolio and all market funds">
              <Switch
                checked={showHoldings}
                onChange={setShowHoldings}
                size="default"
                checkedChildren={
                  <span className="flex items-center gap-1 text-xs sm:text-sm">
                    <FundOutlined /> My Holdings
                  </span>
                }
                unCheckedChildren={
                  <span className="flex items-center gap-1 text-xs sm:text-sm">
                    <LineChartOutlined /> All Funds
                  </span>
                }
                className="shadow-sm"
              />
            </Tooltip>
          </div>

      
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-2">
              <FilterOutlined className="text-blue-500 text-lg" />
              <Text strong className="text-gray-700 text-base">
                Filter by Scheme:
              </Text>
            </div>

            <div className="w-full sm:w-auto">
              <Segmented
                options={schemeTypes}
                value={schemeType}
                onChange={(val) => setSchemeType(val as string)}
                block
                className="bg-white/80 shadow-sm border border-gray-200 rounded-lg hover:shadow-md transition-all w-full sm:w-auto"
              />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
