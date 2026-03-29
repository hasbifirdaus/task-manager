import { getCurrentUser } from "@/lib/auth";
import DashboardClient from "@/components/dashboard/dashboard-client-wrapper";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return <DashboardClient initialUser={user} />;
}
