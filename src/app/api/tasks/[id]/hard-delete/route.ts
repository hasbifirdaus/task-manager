import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const taskId = parseInt(id);

    await prisma.task.delete({
      where: {
        id: taskId,
        userId: user.id,
      },
    });

    return NextResponse.json({ message: "Task permanently deleted" });
  } catch (err) {
    return NextResponse.json(
      { message: "Delete failed. Task might not exist." },
      { status: 400 },
    );
  }
}
