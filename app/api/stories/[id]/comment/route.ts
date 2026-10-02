import { NextResponse } from "next/server";
import { commentSchema } from "@/lib/validations/comment";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const json = await request.json();
    const validated = commentSchema.parse({ ...json, post_id: id });

    return NextResponse.json({
      success: true,
      message: "Your comment has been submitted and is pending review by our administrator.",
      data: validated,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to post comment";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
