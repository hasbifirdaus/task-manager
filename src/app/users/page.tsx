import { getCurrentUser } from "@/lib/auth";
import UsersClientWrapper from "@/components/users/users-client-wrapper";

export default async function UsersPage() {
  const currentUser = await getCurrentUser();

  return <UsersClientWrapper initialMe={currentUser} />;
}
