import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await prisma.user.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "User permanently deleted" });
  } catch (err) {
    return NextResponse.json(
      { message: "User not found or already deleted" },
      { status: 404 },
    );
  }
}
