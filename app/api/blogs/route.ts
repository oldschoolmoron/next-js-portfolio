import { NextResponse } from "next/server";
import { getBlogPosts } from "@/app/lib/notion"; // Ensure the path is correct

export async function GET() {
  try {
    const blogPosts = await getBlogPosts();
    return NextResponse.json(blogPosts, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}
