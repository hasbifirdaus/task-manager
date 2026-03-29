"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import SideBarUsers from "@/components/users/sidebar-users";

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const res = await axios.get(`/api/users/${params.id}`);
        setUser(res.data);
      } catch (error) {
        console.error("Error", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (params.id) fetchUserDetail();
  }, [params.id]);

  if (isLoading)
    return <div className="p-10 text-center">Loading Detail...</div>;

  return (
    <section className="dashboard flex flex-col lg:flex-row min-h-screen bg-[#f9fbfd] text-[#4C3575] p-4 md:p-6 gap-4 md:gap-6 font-sans">
      <SideBarUsers activeFilter="users" setActiveFilter={() => {}} />

      <div className="main flex-1 bg-white rounded-3xl border border-[#4C3575]/10 shadow-sm p-6 md:p-8 relative">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-sm font-bold opacity-50 hover:opacity-100 transition"
        >
          ← Back to List
        </button>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-80 bg-[#f9fbfd] rounded-3xl p-8 border border-[#4C3575]/5 flex flex-col items-center text-center shadow-sm">
            <img
              src={user?.image || "/dashboard/user.png"}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-4 object-cover"
            />
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-sm opacity-60 mb-6">{user?.email}</p>

            <div className="w-full pt-6 border-t border-[#4C3575]/10 grid grid-cols-1 gap-4">
              <div className="p-4 bg-white rounded-2xl border border-[#4C3575]/5">
                <p className="text-[10px] uppercase font-bold opacity-40 mb-1">
                  Total Tasks Created
                </p>
                <p className="text-2xl font-black">
                  {user?.tasks?.length || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-6 w-full">
            <div className="bg-white rounded-2xl border border-[#4C3575]/10 p-6">
              <h3 className="font-bold mb-4">User Information</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm opacity-50">Member Since</span>
                  <span className="text-sm font-medium">
                    {new Date(user?.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#4C3575]/5 rounded-2xl border border-dashed border-[#4C3575]/20">
              <p className="text-xs italic opacity-60">
                You are viewing this user in read-only mode. To modify
                permissions or roles, please use the system administrator panel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
