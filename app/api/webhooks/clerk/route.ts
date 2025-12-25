import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";
import { userQuery } from "@/services/prisma";

export async function POST(request: NextRequest) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) throw new Error("Webhook secret not found.");
  try {
    const { type, data } = await verifyWebhook(request, {
      signingSecret: WEBHOOK_SECRET,
    });

    if (type === "user.created") {
      const { id, email_addresses, primary_email_address_id, first_name } =
        data;
      const primary_email = email_addresses.find(
        (email) => email.id === primary_email_address_id
      );

      if (!id || !primary_email) {
        return new Response("Invalid webhook request", { status: 400 });
      }

      await userQuery.createUser({
        clerkId: id,
        email: primary_email.email_address,
        name: first_name || "",
      });
      return NextResponse.json("Webhook received", { status: 200 });
    }
  } catch (error) {
    console.error("Error verifying webhook:", error);
    return NextResponse.json("Error verifying webhook", { status: 400 });
  }
}
