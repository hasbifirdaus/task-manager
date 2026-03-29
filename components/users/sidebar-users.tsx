"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutDashboard, Users, Settings, Menu } from "lucide-react";

interface ISideBarProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  userData?: any;
}

const SideBarUsers = ({
  activeFilter,
  setActiveFilter,
  userData,
}: ISideBarProps) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const userName = userData?.name || "UserName";
  const userImage = userData?.image || "/dashboard/user.png";

  const menuItems = [
    { id: "settings", label: "Setting", icon: <Settings size={18} /> },
    { id: "management", label: "User Management", icon: <Users size={18} /> },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      path: "/dashboard",
    },
  ];

  return (
    <>
      {/* MOBILE HEADER */}
      <div className="lg:hidden flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-[#4C3575]/10 mb-4">
        <div className="flex items-center gap-3">
          <img
            className="w-10 h-10 rounded-full object-cover border border-[#4C3575]/20"
            src={userImage}
            alt="user"
          />
          <span className="font-bold text-sm text-[#4C3575]">{userName}</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-[#4C3575]/5 rounded-lg text-[#4C3575]"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* SIDEBAR */}
      <aside
        className={`w-full lg:w-64 bg-white rounded-3xl border border-[#4C3575]/10 shadow-sm p-6 flex flex-col justify-between transition-all duration-300 
        ${isSidebarOpen ? "block" : "hidden lg:flex"}`}
      >
        <div>
          <div className="hidden lg:flex items-center gap-3 mb-10 px-2">
            <img
              className="sidebar__user-image w-12 h-12 rounded-full object-cover border-2 border-[#4C3575]/20"
              src={userImage}
              alt="user"
            />
            <div>
              <h2 className="text-sm font-bold text-[#4C3575]">{userName}</h2>
              <p className="text-[10px] opacity-50 uppercase font-bold tracking-wider">
                User
              </p>
            </div>
          </div>

          {/* Navigation*/}
          <nav className="space-y-2">
            {menuItems.map((item) =>
              item.path ? (
                <Link
                  key={item.id}
                  href={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all hover:bg-[#4C3575]/5 text-[#4C3575] opacity-60 hover:opacity-100"
                >
                  {item.icon}
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveFilter(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                    activeFilter === item.id
                      ? "bg-[#4C3575] text-white shadow-lg shadow-[#4C3575]/20"
                      : "text-[#4C3575] opacity-60 hover:bg-[#4C3575]/5 hover:opacity-100"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ),
            )}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default SideBarUsers;
