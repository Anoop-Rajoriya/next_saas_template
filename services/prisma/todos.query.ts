import { prisma } from "./prisma";

export async function createTask({
  title,
  completed,
  authorId,
}: {
  title: string;
  completed: boolean;
  authorId: string;
}) {
  const createdTask = await prisma.todo.create({
    data: { title, completed, authorId },
  });
  return createdTask;
}

export async function listTask(id: string, email: string) {
  const tasks = await prisma.todo.findMany({
    where: { author: { id, email } },
    orderBy: { createdAt: "desc" },
  });

  return tasks;
}

export async function updateTask({
  id,
  authorId,
  completed,
}: {
  id: string;
  authorId: string;
  completed: boolean;
}) {
  const updatedTask = await prisma.todo.update({
    where: { id, authorId },
    data: { completed },
  });

  return updatedTask;
}

export async function deleteTask(authorId: string, id: string) {
  const deletedTask = await prisma.todo.delete({
    where: { id, authorId },
  });
}
