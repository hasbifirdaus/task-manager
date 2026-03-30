import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt-ts";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name) {
      return NextResponse.json(
        { message: "name is required" },
        { status: 400 },
      );
    }
    if (!email) {
      return NextResponse.json(
        { message: "email is required" },
        { status: 400 },
      );
    }
    if (!password) {
      return NextResponse.json(
        { message: "password is required" },
        { status: 400 },
      );
    }

    const userExist = await prisma.user.findUnique({ where: { email } });
    if (userExist)
      return NextResponse.json(
        { message: "Email already used" },
        { status: 409 },
      );

    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: "User Created",
      user: userWithoutPassword,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Error register",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  const users = await prisma.user.findMany({
    where: {
      isDeleted: false,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      isDeleted: true,
    },
  });
  return NextResponse.json(users);
}
