import { clerkClient } from "@clerk/nextjs/server";

export const isAdmin = async (userId: string) => {
  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    return user.publicMetadata.role === "admin";
  } catch (error) {
    throw error;
  }
};
