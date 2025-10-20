import Header from "./components/Header";
import Sidebar from "./components/Sidebar";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-base-secondary text-text-secondary">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-base">
          {children}
        </main>
      </div>
    </div>
  );
}
