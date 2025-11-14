import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// create user subscription
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json(
        { error: "User authentication required" },
        { status: 401 }
      );

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const subscriptionEnds = new Date();
    subscriptionEnds.setMonth(subscriptionEnds.getMonth() + 1);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        subscribed: true,
        subscriptionDate: subscriptionEnds,
      },
    });

    return NextResponse.json({
      message: "Subscription successfully",
      subscriptionEnds: updatedUser.subscriptionDate,
    });
  } catch (err: any) {
    console.error("Subscription POST route error: ", err);
    return NextResponse.json(
      { error: err.message || "Server internal error" },
      { status: 500 }
    );
  }
}

// get user subscription
export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json(
        { error: "User authentication required" },
        { status: 401 }
      );

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        subscribed: true,
        subscriptionDate: true,
      },
    });

    if (!user)
      return NextResponse.json(
        { error: "User with active subscription not found" },
        { status: 404 }
      );

    const now = new Date();

    if (user.subscribed && user.subscriptionDate < now) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          subscribed: false,
          subscriptionDate: null,
        },
      });

      return NextResponse.json({ subscribed: false, subscriptionDate: null });
    }
    const { subscribed, subscriptionDate } = user;
    return NextResponse.json({ subscribed, subscriptionDate });
  } catch (err: any) {
    console.error("Subscription GET route error: ", err);
    return NextResponse.json(
      { error: err.message || "Server internal error" },
      { status: 500 }
    );
  }
}
