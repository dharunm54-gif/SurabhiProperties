import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { createLead } from "@/lib/services/leads";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const validated = contactSchema.parse(json);

    // Record contact inquiry as a lead in CRM
    const result = await createLead({
      name: validated.name,
      phone: validated.phone || "Not Provided",
      email: validated.email || "",
      intent: "consultation",
      message: `${validated.subject ? `[${validated.subject}] ` : ""}${validated.message}`,
      source: "contact_page",
    });

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been received. Our consultant will be in touch with you.",
    });
  } catch (error: unknown) {
    console.error("[POST /api/contact] Error:", error);
    const message = error instanceof Error ? error.message : "Failed to process message";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
