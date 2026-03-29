"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  CheckCheck,
  LayoutList,
  Settings,
  LogOut,
  ClipboardList,
} from "lucide-react";

interface ISideBarProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  userData?: any;
}

export default function SideBar({
  activeFilter,
  setActiveFilter,
  userData,
}: ISideBarProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const userName = userData?.name || "UserName";
  const userImage = userData?.image || "/dashboard/user.png";

  const menuItems = [
    { id: "all", label: "All Tasks", icon: <ClipboardList size={18} /> },
    { id: "todo", label: "To Do", icon: <LayoutList size={18} /> },
    {
      id: "completed",
      label: "Completed",
      icon: <CheckCheck size={18} />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={18} />,
      path: "/users",
    },
  ];

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/users/logout", {
        method: "POST",
      });

      if (res.ok) {
        router.push("/login");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      {/* MOBILE HEADER */}
      <div className="lg:hidden flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-[#4C3575]/10">
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
          className="p-2 bg-[#4C3575]/5 rounded-lg"
        >
          <div className="w-6 h-0.5 bg-[#4C3575] mb-1"></div>
          <div className="w-6 h-0.5 bg-[#4C3575] mb-1"></div>
          <div className="w-6 h-0.5 bg-[#4C3575]"></div>
        </button>
      </div>

      {/* SIDEBAR */}
      <div
        className={`sidebar w-full lg:w-64 bg-white rounded-3xl border border-[#4C3575]/10 shadow-sm flex flex-col justify-between p-4 transition-all ${
          isSidebarOpen ? "block" : "hidden lg:flex"
        }`}
      >
        <div>
          <div className="sidebar__user hidden lg:flex items-center gap-3 p-2 mb-10">
            <img
              className="sidebar__user-image w-12 h-12 rounded-full object-cover border-2 border-[#4C3575]/20"
              src={userImage}
              alt="user"
            />
            <div className="flex-1">
              <p className="sidebar__user-name text-sm font-bold text-[#4C3575] leading-none">
                {userName}
              </p>
              <p className="text-[10px] text-[#4C3575]/60 mt-1">User</p>
            </div>
          </div>

          <nav className="sidebar__nav">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isLink = !!item.path;

                const content = (
                  <>
                    {item.icon}
                    <span className="text-sm font-semibold">{item.label}</span>
                  </>
                );

                const commonClasses = `w-full flex items-center gap-4 px-4 py-3 rounded-xl transition ${
                  activeFilter === item.id
                    ? "bg-[#4C3575] text-white shadow-md shadow-[#4C3575]/20"
                    : "text-[#4C3575]/60 hover:bg-[#4C3575]/5 hover:text-[#4C3575]"
                }`;

                return (
                  <li key={item.id} className="relative">
                    {isLink ? (
                      <Link
                        href={item.path!}
                        className={commonClasses}
                        onClick={() => setSidebarOpen(false)}
                      >
                        {content}
                      </Link>
                    ) : (
                      <button
                        onClick={() => {
                          setActiveFilter(item.id);
                          setSidebarOpen(false);
                        }}
                        className={commonClasses}
                      >
                        {content}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="sidebar__footer mt-6 lg:mt-0 border-t border-[#4C3575]/5 pt-4">
          <button
            className="w-full flex items-center gap-4 px-4 py-3 text-[#4C3575]/60 hover:text-red-500 transition font-semibold"
            onClick={handleSignOut}
          >
            <LogOut size={18} />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
}
