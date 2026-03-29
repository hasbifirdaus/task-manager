"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import SideBarUsers from "@/components/users/sidebar-users";
import SettingsContent from "@/components/users/settings-tab";
import ManagementContent from "@/components/users/management-tab";

export default function UsersClientWrapper({ initialMe }: { initialMe: any }) {
  const [activeTab, setActiveTab] = useState("settings");
  const [users, setUsers] = useState<any[]>([]);

  const [userData, setUserData] = useState<any>(initialMe);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const usersRes = await axios.get("/api/users");
        setUsers(usersRes.data);

        if (initialMe?.id) {
          const profileRes = await axios.get(`/api/users/${initialMe.id}`);
          setUserData(profileRes.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [initialMe?.id]);

  return (
    <section className="dashboard flex flex-col lg:flex-row min-h-screen bg-[#f9fbfd] text-[#4C3575] p-4 md:p-6 gap-4 md:gap-6 font-sans">
      <SideBarUsers
        activeFilter={activeTab}
        setActiveFilter={setActiveTab}
        userData={userData}
      />

      <div className="main flex-1 bg-white rounded-3xl border border-[#4C3575]/10 shadow-sm p-6 md:p-8 relative overflow-hidden flex flex-col">
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-[#4C3575]/10 border-t-[#4C3575] rounded-full animate-spin"></div>
            <p className="animate-pulse font-medium opacity-50">
              Loading Content...
            </p>
          </div>
        ) : (
          <>
            {activeTab === "settings" && userData && (
              <SettingsContent userId={userData.id} />
            )}

            {activeTab === "management" && <ManagementContent users={users} />}
          </>
        )}
      </div>
    </section>
  );
}
