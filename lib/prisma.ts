import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/app/generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

// Global variable, hold prisma instance during hot reloads
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Setup function
const createPrismaClient = () => {
  if (!connectionString) {
    throw new Error("DATABASE_URL is not defined in .env");
  }
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
