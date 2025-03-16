import "server-only";

import { Client } from "@notionhq/client";
import {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { cache } from "react";

export const notionClient = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getBlogPosts = cache(async () => {
  const response = await notionClient.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: "Status",
      status: { equals: "Live" },
    },
  });

  console.log("📝 Raw Blog Posts Data:", JSON.stringify(response.results, null, 2));

  return response.results
    .filter((post) => "properties" in post)
    .map((post) => {
      const page = post as PageObjectResponse;

      console.log("🔎 Available Properties:", Object.keys(page.properties));

      const slugProp = page.properties.slug as any;
      const titleProp = page.properties.Title as any;
      const descriptionProp = page.properties.Description as any;
      const createdProp = page.properties.Created as any;

      console.log("🔎 Property Details:", page.properties);

      const slug = slugProp?.rich_text?.[0]?.plain_text || "";
      const title = titleProp?.title?.[0]?.plain_text || "Untitled";
      const description = descriptionProp?.rich_text?.[0]?.plain_text || "";
      const createdDate = createdProp?.created_time
        ? new Date(createdProp.created_time).toDateString()
        : "Date not available";

      console.log(`✅ Extracted Post: ${title} (Slug: ${slug})`);

      // ❌ DO NOT return author field
      return { id: page.id, title, slug, description, createdDate };
    });
});

// ✅ Fetch content of a specific page by ID
export const getPageContent = cache((pageId: string) => {
  return notionClient.blocks.children
    .list({ block_id: pageId })
    .then((res) => res.results as BlockObjectResponse[]);
});

// ✅ Fetch a specific page by its slug
export const getPageBySlug = cache(async (slug: string) => {
  console.log("🔍 Searching for post with slug:", slug);

  const res = await notionClient.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: "slug", // 🔥 Change to lowercase
      rich_text: { equals: slug },
    },
  });

  if (res.results.length === 0) {
    console.error(`❌ No post found for slug: ${slug}`);
    return undefined;
  }

  console.log(`✅ Found post for slug: ${slug}`);
  return res.results[0] as PageObjectResponse;
});

// ✅ Fetch all slugs from the blog posts (for static params generation)
export const getAllSlugs = cache(async () => {
  // Get all blog posts
  const blogPosts = await getBlogPosts();

  // Return only the slugs
  return blogPosts.map((post) => post.slug);
});
