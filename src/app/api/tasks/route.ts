import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const { title, description } = await req.json();
    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId: user.id,
      },
    });
    return NextResponse.json(task, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to create task" },
      { status: 400 },
    );
  }
}

export async function GET() {
  const tasks = await prisma.task.findMany({
    where: { isDeleted: false },
    include: { user: { select: { name: true } } },
  });
  return NextResponse.json(tasks);
}
