import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Log to server console for testing
    console.log("=== Partner Form Submission ===");
    console.log(JSON.stringify(body, null, 2));
    console.log("==============================");

    // TODO: integrate with database / email service
    return NextResponse.json({ success: true, message: "Partner inquiry received" });
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body" },
      { status: 400 }
    );
  }
}
