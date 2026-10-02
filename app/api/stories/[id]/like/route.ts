import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    return NextResponse.json({
      success: true,
      liked: true,
      post_id: id,
    });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to record like" }, { status: 400 });
  }
}
