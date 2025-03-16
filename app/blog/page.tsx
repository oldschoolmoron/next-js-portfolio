"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  createdDate: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filter, setFilter] = useState<"latest" | "oldest">("latest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/blogs");
        if (!response.ok) throw new Error("Failed to fetch blog posts");
        const blogPosts = await response.json();
        setPosts(blogPosts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setPosts([]); // Ensure state is reset on failure
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Sorted posts are derived from the state
  const sortedPosts = [...posts].sort((a, b) =>
    filter === "latest"
      ? new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
      : new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
  );

  return (
    <main className="max-w-7xl mx-auto py-12 px-6">
      {/* Hero Image */}
      <div className="w-full h-[300px]">
        <Image
          src="/bannerimg.jpeg"
          alt="TechTales Hero"
          width={4800}
          height={300}
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Title and Banner */}
      <div className="text-center mt-8">
        <h1 className="text-5xl font-bold text-white">🚀 TechTales</h1>
        <p className="text-xl text-gray-400 mt-4">
          Every tech stack has a story. At TechTales, we decode the latest
          trends in programming, Web3, and beyond—one blog at a time.
        </p>
        <div className="my-6 border-t border-gray-700"></div>
      </div>

      {/* Filter */}
      <div className="mb-8 text-center">
        <label htmlFor="dateFilter" className="text-white text-lg mr-4">
          Filter by Date:
        </label>
        <select
          id="dateFilter"
          value={filter}
          onChange={(e) => setFilter(e.target.value as "latest" | "oldest")}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg"
        >
          <option key="latest" value="latest">Latest</option>
          <option key="oldest" value="oldest">Oldest</option>
        </select>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center my-8 text-white">
          Loading...
        </div>
      )}

      {/* Display filtered posts */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPosts.length > 0 ? (
            sortedPosts.map((post) => (
              <div
                key={post.slug}
                className="rounded-lg overflow-hidden shadow-lg bg-gray-900 bg-opacity-50 p-4 backdrop-blur-md"
              >
                <h3 className="text-xl font-semibold text-white mt-4">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm mt-2">
                  {post.description || "No description available"}
                </p>
                <p className="text-gray-400 text-sm mt-2">{post.createdDate}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-400 hover:underline mt-4 block"
                >
                  Read More →
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-3">
              No blog posts available.
            </p>
          )}
        </div>
      )}
    </main>
  );
}
