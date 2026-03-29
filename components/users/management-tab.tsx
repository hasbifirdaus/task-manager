"use client";
import Link from "next/link";

interface ManagementContentProps {
  users: any[];
}

export default function ManagementContent({ users }: ManagementContentProps) {
  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      <header className="mb-8">
        <div className="relative inline-block">
          <h1 className="text-xl md:text-2xl font-bold">User Management</h1>
          <div className="absolute -bottom-1 left-0 w-8 h-1 bg-[#4C3575] rounded-full"></div>
        </div>
        <p className="text-xs opacity-50 mt-2">
          Manage and view all registered users in the system.
        </p>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead>
            <tr className="text-[#4C3575]/40 text-xs uppercase tracking-wider">
              <th className="px-4 py-2 font-bold">User</th>
              <th className="px-4 py-2 font-bold">Email Address</th>
              <th className="px-4 py-2 font-bold text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr
                key={user.id}
                className="bg-[#f9fbfd] hover:bg-[#4C3575]/5 transition-colors group"
              >
                <td className="px-4 py-4 rounded-l-2xl border-y border-l border-[#4C3575]/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#4C3575]/10 flex items-center justify-center font-bold text-xs uppercase">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt=""
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        user.name.charAt(0)
                      )}
                    </div>
                    <span className="font-bold text-sm">{user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4 border-y border-[#4C3575]/5 text-sm opacity-70">
                  {user.email}
                </td>
                <td className="px-4 py-4 rounded-r-2xl border-y border-r border-[#4C3575]/5 text-center">
                  <Link
                    href={`/users/${user.id}`}
                    className="text-[10px] font-bold uppercase bg-[#4C3575] text-white px-4 py-2 rounded-lg hover:shadow-md transition active:scale-95"
                  >
                    View Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
