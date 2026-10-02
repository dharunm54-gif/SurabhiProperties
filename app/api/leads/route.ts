import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/validations/lead";
import { createLead } from "@/lib/services/leads";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const validatedData = leadSchema.parse(json);

    const result = await createLead(validatedData);
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Your requirement has been recorded. Our consultant will contact you shortly.",
      data: result.data,
    });
  } catch (error: unknown) {
    console.error("[POST /api/leads] Error:", error);
    const message = error instanceof Error ? error.message : "Validation or submission failed";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
