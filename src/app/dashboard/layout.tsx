import Header from "./components/Header";
import Sidebar from "./components/Sidebar";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex min-h-screen bg-base-secondary text-text-secondary">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="w-[75%] lg:w-[80%] flex flex-1 flex-col">
      
        <Header />

        {/* Page Content */}
        <main className="w-full h-[calc(100vh-75px)] p-2 md:p-4 lg:p-6 overflow-y-auto bg-base">
          {children}
        </main>
      </div>
    </div>
  );
}
