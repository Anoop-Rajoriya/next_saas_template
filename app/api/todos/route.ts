import { NextRequest, NextResponse } from "next/server";
import {
  createTask,
  deleteTask,
  getUser,
  listTask,
  updateTask,
} from "@/services/prisma";
import { auth } from "@clerk/nextjs/server";

export const GET = async (req: NextRequest) => {
  const { userId: clerkId } = await auth();
  try {
    if (!clerkId)
      return NextResponse.json("Listing todos required authentication", {
        status: 401,
      });
    const user = await getUser({ clerkId });
    if (!user) return NextResponse.json("User not found", { status: 404 });

    const todosList = await listTask(user.id, user.email);

    return NextResponse.json(todosList);
  } catch (error) {
    console.log(`Todos Get route error: ${error}`);
    return NextResponse.json("Internal server error", { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  const { userId: clerkId } = await auth();
  try {
    if (!clerkId)
      return NextResponse.json("Todo creation required authentication", {
        status: 401,
      });
    const user = await getUser({ clerkId });
    if (!user) return NextResponse.json("User not found", { status: 404 });

    const { title, completed = false } = await req.json();
    if (!title) return NextResponse.json("Title required", { status: 400 });

    const createdTodo = await createTask({
      title,
      completed,
      authorId: user.id,
    });

    return NextResponse.json(createdTodo);
  } catch (error) {
    console.log(`Todos Post route error: ${error}`);
    return NextResponse.json("Internal server error", { status: 500 });
  }
};

export const PATCH = async (req: NextRequest) => {
  const { userId: clerkId } = await auth();
  try {
    if (!clerkId)
      return NextResponse.json("Todo toggle required authentication", {
        status: 401,
      });
    const user = await getUser({ clerkId });
    if (!user) return NextResponse.json("User not found", { status: 404 });

    const { todoId, completed } = await req.json();
    if (!todoId)
      return NextResponse.json("TodoId requried for toggle operation", {
        status: 401,
      });

    const updatedTodo = await updateTask({
      authorId: user.id,
      id: todoId,
      completed,
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.log(`Todos Patch route error: ${error}`);
    return NextResponse.json("Internal server error", { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  const { userId: clerkId } = await auth();
  try {
    if (!clerkId)
      return NextResponse.json("Todo deletion required authentication", {
        status: 401,
      });
    const user = await getUser({ clerkId });
    if (!user) return NextResponse.json("User not found", { status: 404 });

    const { todoId } = await req.json();
    if (!todoId)
      return NextResponse.json("TodoId requried for delete operation", {
        status: 401,
      });

    await deleteTask(user.id, todoId);

    return NextResponse.json("Todo deleted successfully");
  } catch (error) {
    console.log(`Todos Delete route error: ${error}`);
    return NextResponse.json("Internal server error", { status: 500 });
  }
};
