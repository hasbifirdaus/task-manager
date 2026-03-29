import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt-ts";
import { signToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { message: "Enter the correct email" },
        { status: 401 },
      );
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        {
          message: "Wrong password",
        },
        { status: 401 },
      );
    }

    const token = signToken({ id: user.id, email: user.email });
    const res = NextResponse.json({ message: "Login success" });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return res;
  } catch (error) {
    return NextResponse.json({ message: "Error login" }, { status: 500 });
  }
}
