import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isAdmin } from "@/lib/utils";

// delete todos
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const todo = await prisma.todo.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!todo)
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });

    await prisma.todo.delete({
      where: { id: params.id },
    });

    return NextResponse.json("Todo deleted successfully");
  } catch (err: any) {
    console.error("Admin Todos DELETE route error: ", err);
    return NextResponse.json(
      { error: err.message || "Server internal error" },
      { status: 500 }
    );
  }
}

// mark Todo completed
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const todo = await prisma.todo.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!todo)
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });

    const { completed } = await req.json();

    if (typeof completed !== "boolean")
      return NextResponse.json(
        { error: "Expacted completed value to boolean" },
        { status: 400 }
      );

    const updatedTodo = await prisma.todo.update({
      where: { id: params.id },
      data: { completed },
    });

    return NextResponse.json({ updatedTodo });
  } catch (err: any) {
    console.error("Admin Todos PATCH route error: ", err);
    return NextResponse.json(
      { error: err.message || "Server internal error" },
      { status: 500 }
    );
  }
}

// update todo
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const todo = await prisma.todo.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!todo)
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });

    const { title, completed = false } = await req.json();

    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: "Title, is required" },
        { status: 400 }
      );
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: params.id },
      data: { title, completed },
    });

    return NextResponse.json(updatedTodo);
  } catch (err: any) {
    console.error("Admin Todos PUT route error: ", err);
    return NextResponse.json(
      { error: err.message || "Server internal error" },
      { status: 500 }
    );
  }
}
