import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isAdmin } from "@/lib/utils";

const TODO_PER_PAGE = 10;
export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json(
        { error: "User authentication required" },
        { status: 401 }
      );

    const admin = isAdmin(userId);
    if (!admin) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const search = searchParams.get("search") || "";

    const todos = await prisma.todo.findMany({
      where: {
        title: {
          contains: search,
          mode: "insensitive",
        },
        orderBy: { createAt: "desc" },
        take: TODO_PER_PAGE,
        skip: (page - 1) * TODO_PER_PAGE,
      },
    });

    const totalTodos = await prisma.todo.count({
      where: {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
    });

    const totalPages = Math.ceil(totalTodos / TODO_PER_PAGE);

    return NextResponse.json({
      todos,
      totalTodos,
      totalPages,
    });
  } catch (err: any) {
    console.error("Todos GET route error: ", err);
    return NextResponse.json(
      { error: err.message || "Server internal error" },
      { status: 500 }
    );
  }
}
