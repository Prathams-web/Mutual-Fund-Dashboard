"use client";

import { useState } from "react";
import {
  Home,
  PieChart,
  RefreshCcw,
  BarChart3,
  User,
  X,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", icon: Home, href: "/dashboard" },
  { name: "Mutual Funds", icon: PieChart, href: "/dashboard/funds" },
  { name: "Transactions", icon: RefreshCcw, href: "/dashboard/transactions" },
  { name: "Reports", icon: BarChart3, href: "/dashboard/reports" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-white backdrop-blur-sm z-40 md:hidden"
        ></div>
      )}

    
      <aside
        className={`fixed top-0 left-0 min-h-screen w-full  md:w-[25%] lg:w-[18%] bg-base border-r border-stroke p-4  flex flex-col z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-[200%]"}
          md:translate-x-0 md:static md:flex`}
      >
    
        <div className="flex items-center justify-between mb-8 md:hidden">
          <h1 className="text-h3 font-semibold text-text-primary">
            Investor Hub
          </h1>
          <button
            className="cursor-pointer"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-6 w-6 text-text-primary" />
          </button>
        </div>

  
        <div className="hidden md:flex items-center mb-8">
          <h1 className="text-h3 font-semibold text-text-primary">
            Investor Hub
          </h1>
        </div>


        <nav className="flex flex-col space-y-2 flex-1">
          {navItems.map(({ name, icon: Icon, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={name}
                href={href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors
                  ${
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-text-secondary hover:bg-primary/10"
                  }`}
                onClick={() => setIsOpen(false)}
              >
                <Icon
                  className={`h-5 w-5 ${
                    isActive ? "text-primary" : "text-text-secondary"
                  }`}
                />
                <span>{name}</span>
              </Link>
            );
          })}
        </nav>

 
        <div className="mt-auto">
          <button className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors w-full">
            <User className="h-5 w-5" /> Profile
          </button>
        </div>
      </aside>

  
      {!isOpen && (
        <button
          className="bg-white fixed bottom-6 left-6 md:hidden z-50  p-3 rounded-full shadow-lg hover:bg-brand-accent transition-colors"
          onClick={() => setIsOpen(true)}
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>
      )}
    </>
  );
}
