import { NextResponse } from "next/server";
import { propertySchema } from "@/lib/validations/property";
import { createProperty, getProperties } from "@/lib/services/properties";

export async function GET() {
  try {
    const properties = await getProperties();
    return NextResponse.json({ success: true, data: properties });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch properties";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const validatedData = propertySchema.parse(json);

    const result = await createProperty(validatedData);
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Property listing created successfully",
      data: result.data,
    });
  } catch (error: unknown) {
    console.error("[POST /api/properties] Error:", error);
    const message = error instanceof Error ? error.message : "Validation or creation failed";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
