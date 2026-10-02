import { NextResponse } from "next/server";
import { storySchema } from "@/lib/validations/story";
import { createStory, getStories } from "@/lib/services/stories";

export async function GET() {
  try {
    const stories = await getStories();
    return NextResponse.json({ success: true, data: stories });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch stories";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const validatedData = storySchema.parse(json);

    const result = await createStory(validatedData);
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Story post published successfully",
      data: result.data,
    });
  } catch (error: unknown) {
    console.error("[POST /api/stories] Error:", error);
    const message = error instanceof Error ? error.message : "Validation or publication failed";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
