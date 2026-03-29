import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash, genSalt } from "bcrypt-ts";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const user = await prisma.user.findUnique({
      where: { id: id },
      include: { tasks: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, image, password } = body;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (image) updateData.image = image;

    if (password && password.trim() !== "") {
      const salt = await genSalt(10);
      updateData.password = await hash(password, salt);
    }

    const user = await prisma.user.update({
      where: { id: id },
      data: updateData,
    });

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: "User updated successfully",
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error("Update Error:", err);
    return NextResponse.json({ message: "Update failed" }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const user = await prisma.user.update({
      where: { id: id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    return NextResponse.json({ message: "User soft deleted", user });
  } catch (err) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
}
