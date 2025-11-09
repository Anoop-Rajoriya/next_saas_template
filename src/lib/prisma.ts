import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => new PrismaClient();

type prismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalToPrisma = globalThis as unknown as {
  prisma: prismaClientSingleton | undefined;
};

const prisma = globalToPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalToPrisma.prisma = prisma;
