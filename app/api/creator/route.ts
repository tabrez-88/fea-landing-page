import { NextResponse } from "next/server";
import { creatorSchema } from "@/lib/schemas/creator";
import { appendCreatorSubmission } from "@/lib/google-sheets";
import { sendCreatorNotification } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Server-side validation using the same Zod schema
    const result = creatorSchema.safeParse(body);

    if (!result.success) {
      const fieldErrors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return NextResponse.json(
        { success: false, message: "Validation failed", errors: fieldErrors },
        { status: 422 }
      );
    }

    const data = result.data;

    // Run Google Sheets + Email in parallel
    const results = await Promise.allSettled([
      appendCreatorSubmission(data),
      sendCreatorNotification(data),
    ]);

    // Log failures but don't block the user response
    const sheetResult = results[0];
    const emailResult = results[1];

    if (sheetResult.status === "rejected") {
      console.error("[Creator] Google Sheets error:", sheetResult.reason);
    }

    if (emailResult.status === "rejected") {
      console.error("[Creator] Email notification error:", emailResult.reason);
    }

    // If both failed, return an error to the user
    if (
      sheetResult.status === "rejected" &&
      emailResult.status === "rejected"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "We couldn't process your submission. Please try again.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Creator inquiry received",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body" },
      { status: 400 }
    );
  }
}
