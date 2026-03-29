import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const taskId = parseInt(id);

    const restoredTask = await prisma.task.update({
      where: {
        id: taskId,
        userId: user.id,
      },
      data: {
        isDeleted: false,
        deletedAt: null,
      },
    });

    return NextResponse.json({
      message: "Task restored successfully",
      task: restoredTask,
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Restore failed. Task might not exist." },
      { status: 400 },
    );
  }
}
