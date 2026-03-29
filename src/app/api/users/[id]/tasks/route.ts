import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const tasks = await prisma.task.findMany({
    where: {
      userId: id,
      isDeleted: false,
    },
  });

  return NextResponse.json(tasks);
}
