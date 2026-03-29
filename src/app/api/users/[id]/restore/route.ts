import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const restoredUser = await prisma.user.update({
      where: { id: id },
      data: {
        isDeleted: false,
        deletedAt: null,
      },
    });

    return NextResponse.json({
      message: "User restored successfully",
      user: restoredUser,
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to restore user" },
      { status: 400 },
    );
  }
}
