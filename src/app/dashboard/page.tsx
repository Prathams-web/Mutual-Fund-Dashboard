import MutualFundTable from "./components/MutualFundTable";
import PerformanceChart from "./components/PerformanceChart";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <MutualFundTable />
      <PerformanceChart />
    </div>
  );
}
