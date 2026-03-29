import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const tasks = await prisma.task.findMany({
    where: {
      userId: user.id,
      isDeleted: false,
    },
  });
  return NextResponse.json(tasks);
}
