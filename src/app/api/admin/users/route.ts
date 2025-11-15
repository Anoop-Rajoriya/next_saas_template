import { isAdmin } from "@/lib/utils";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const User_Per_Page = 10;
export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json(
        { error: "User authentication required" },
        { status: 401 }
      );

    const admin = await isAdmin(userId);
    if (!admin) {
      return NextResponse.json(
        { error: "UnAuthorized access" },
        { status: 403 }
      );
    }
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const page = searchParams.get("page");

    const client = await clerkClient();

    const usersList = await client.users.getUserList({
      query: search || "",
      orderBy: "-created_at",
      limit: User_Per_Page,
      offset: (parseInt(page || "1") - 1) * User_Per_Page,
    });

    const totalUsers = await client.users.getCount();
    const totalPages = Math.ceil(totalUsers / User_Per_Page);

    return NextResponse.json({ usersList, totalUsers, totalPages });
  } catch (err: any) {
    console.error("Admin Users GET route error: ", err);
    return NextResponse.json(
      { error: err.message || "Server internal error" },
      { status: 500 }
    );
  }
}
