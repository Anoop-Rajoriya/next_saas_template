import { prisma } from "./prisma";

export async function createUser({
  clerkId,
  name,
  email,
}: {
  clerkId: string;
  name: string;
  email: string;
}) {
  await prisma.user.upsert({
    where: { authId: clerkId },
    create: {
      authId: clerkId,
      name,
      email,
    },
    update: {
      name,
      email,
    },
  });
}

export async function getUser({
  clerkId,
  email,
}: {
  clerkId?: string;
  email?: string;
}) {
  if (!clerkId && !email) {
    throw new Error("Missing search criteria, clerkId or email required");
  }

  const whereCondition =
    clerkId && email
      ? { OR: [{ authId: clerkId }, { email }] }
      : clerkId
      ? { authId: clerkId }
      : { email };

  const user = await prisma.user.findFirst({
    where: whereCondition,
  });

  return user;
}
