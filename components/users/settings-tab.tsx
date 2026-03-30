"use client";
import { useState, useEffect } from "react";
import axios from "axios";

interface UserData {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  password?: string;
}

interface SettingsContentProps {
  userId: string;
}

export default function SettingsContent({ userId }: SettingsContentProps) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Ambil data user
  useEffect(() => {
    const fetchUser = async () => {
      console.log("Fetching data for ID:", userId);

      if (!userId || userId === "undefined") {
        console.error("ID is missing!");
        return;
      }

      try {
        setIsLoading(true);
        const res = await axios.get(`/api/users/${userId}`);
        setUserData(res.data);
      } catch (error: any) {
        console.error("Failed to fetch user", error.response?.data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData) return;

    setIsSaving(true);
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userData.name,
          image: userData.image,
          password: newPassword || undefined,
        }),
      });

      if (res.ok) {
        alert("Success! Profile updated.");
        setNewPassword("");
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Failed to update profile");
      }
    } catch (error) {
      alert("An network error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = confirm(
      "Are you sure? This action is permanent and will delete your account.",
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/users/${userId}/hard-delete`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Account has been deleted.");
        window.location.href = "/register";
      } else {
        alert("Failed to delete account.");
      }
    } catch (error) {
      alert("Delete failed due to a server error.");
    }
  };

  if (isLoading)
    return (
      <div className="p-20 text-center animate-pulse text-[#4C3575] font-medium">
        Loading your settings...
      </div>
    );

  if (!userData)
    return (
      <div className="p-20 text-center text-red-500">
        User data could not be loaded.
      </div>
    );

  return (
    <div className="flex flex-col h-full  p-4 md:p-8">
      <header className="mb-10">
        <div className="relative inline-block">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Account Settings
          </h1>
          <div className="absolute -bottom-2 left-0 w-12 h-1.5 bg-[#4C3575] rounded-full"></div>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Manage your profile information and account security.
        </p>
      </header>

      <form
        onSubmit={handleUpdateProfile}
        className="max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-10"
      >
        {/* Avatar Section */}
        <div className="lg:col-span-1 flex flex-col items-center gap-6 bg-white p-8 rounded-4xl shadow-sm border border-gray-100 h-fit">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-linear-to-tr from-[#4C3575] to-[#7858A6] flex items-center justify-center text-white text-4xl font-bold shadow-2xl overflow-hidden border-4 border-white">
              {userData.image ? (
                <img
                  src={userData.image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                userData.name.charAt(0).toUpperCase()
              )}
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full bg-white border border-gray-200 p-4 rounded-2xl outline-none text-sm focus:ring-2 focus:ring-[#4C3575]/20 focus:border-[#4C3575] transition-all"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">
                Email Address
              </label>
              <input
                type="email"
                disabled
                className="w-full bg-gray-100 border border-gray-200 p-4 rounded-2xl text-gray-500 text-sm cursor-not-allowed"
                value={userData.email}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">
              Update Password
            </label>
            <input
              type="password"
              placeholder="Enter new password (leave blank to keep current)"
              className="w-full bg-white border border-gray-200 p-4 rounded-2xl outline-none text-sm focus:ring-2 focus:ring-[#4C3575]/20 focus:border-[#4C3575] transition-all"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <button
              type="submit"
              disabled={isSaving}
              className="w-full md:w-auto bg-[#4C3575] text-white px-10 py-4 rounded-2xl font-bold text-sm shadow-lg shadow-[#4C3575]/20 hover:bg-[#3b295a] active:scale-95 disabled:opacity-50 transition-all"
            >
              {isSaving ? "Saving Changes..." : "Save All Changes"}
            </button>

            <button
              type="button"
              onClick={handleDeleteAccount}
              className="text-sm font-semibold text-red-500 hover:text-red-700 hover:bg-red-50 px-6 py-3 rounded-xl transition-colors"
            >
              Delete Account
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
