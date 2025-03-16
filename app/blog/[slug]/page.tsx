// pages/blog/[slug]/page.js

import { getAllSlugs } from "@/app/lib/notion"; // Make sure you have this function to fetch all slugs
import { getPageBySlug, getPageContent, notionClient } from "@/app/lib/notion";
import { NotionRenderer } from "@notion-render/client";
import hljsPlugin from "@notion-render/hljs-plugin";
import bookmarkPlugin from "@notion-render/bookmark-plugin";
import { Post } from "@/app/Components/Post";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  // Fetch all slugs of blog posts (you should adjust this to match how your slugs are stored)
  const slugs = await getAllSlugs(); // Ensure this function returns an array of slugs

  // Map over slugs and return the params for each
  return slugs.map(slug => ({
    slug, // dynamic part of the URL
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  console.log("🔍 Slug received:", params.slug);

  const post = await getPageBySlug(params.slug.toLowerCase());
  if (!post) {
    console.error("❌ Post not found for slug:", params.slug);
    return notFound();
  }

  console.log("🛠 Available Properties:", Object.keys(post.properties));

  const content = await getPageContent(post.id);
  const notionRenderer = new NotionRenderer({ client: notionClient });
  notionRenderer.use(hljsPlugin({}));
  notionRenderer.use(bookmarkPlugin(undefined));

  const html = await notionRenderer.render(...content);

  const title = (post.properties.Title as any)?.title?.[0]?.plain_text ?? "Untitled";
  const bannerImage = (post.properties.BannerImage as any)?.url ?? "";
  const bannerImageWidth = (post.properties.BannerImageWidth as any)?.number ?? 800;
  const bannerImageHeight = (post.properties.BannerImageHeight as any)?.number ?? 500;

  let coverImage = "";
  if (post.cover?.type === "external") coverImage = post.cover.external.url;
  else if (post.cover?.type === "file") coverImage = post.cover.file.url;

  console.log("📅 Raw Created Property:", post.properties.Created);
  const createdProperty = post.properties.Created;
  const createdDate =
    createdProperty?.type === "created_time" ? createdProperty.created_time : null;

  console.log("📅 Extracted Created Date:", createdDate);

  return (
    <Post
      title={title}
      bannerImage={bannerImage}
      bannerImageWidth={bannerImageWidth}
      bannerImageHeight={bannerImageHeight}
      coverImage={coverImage}
      createdDate={createdDate ? new Date(createdDate).toDateString() : "Date not available"}
      content={html}
    />
  );
}
