import { cookies } from "next/headers";
import { verifyToken } from "./jwt";
import { JwtPayload } from "jsonwebtoken";

interface UserPayload extends JwtPayload {
  id: string;
  email: string;
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = verifyToken(token) as UserPayload;

    if (!decoded || !decoded.id) {
      return null;
    }

    return {
      id: decoded.id,
      email: decoded.email,
    };
  } catch (error) {
    return null;
  }
}
