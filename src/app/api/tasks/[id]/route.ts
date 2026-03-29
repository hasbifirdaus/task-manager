import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

type Params = Promise<{ id: string }>;

export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = await params;

    const taskId = parseInt(id);

    if (isNaN(taskId)) {
      return NextResponse.json(
        { message: "Invalid ID format. ID must be a number." },
        { status: 400 },
      );
    }

    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task || task.isDeleted) {
      return NextResponse.json(
        { message: "Task not found or has been deleted" },
        { status: 404 },
      );
    }

    return NextResponse.json(task);
  } catch (err) {
    console.error("GET Task Error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const { title, description, completed } = body;

  try {
    const task = await prisma.task.update({
      where: {
        id: parseInt(id),
        userId: user.id,
      },
      data: {
        title,
        description,
        completed,
      },
    });
    return NextResponse.json(task);
  } catch (err) {
    return NextResponse.json(
      { message: "Update failed or not found" },
      { status: 400 },
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    await prisma.task.update({
      where: { id: parseInt(id), userId: user.id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
    return NextResponse.json({ message: "Task deleted" });
  } catch (err) {
    return NextResponse.json({ message: "Delete failed" }, { status: 400 });
  }
}
