import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

if (!SECRET) {
  throw new Error("The secret key JWT_SECRET was not found in the .env file!");
}

export function signToken(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch (e) {
    return null;
  }
}
