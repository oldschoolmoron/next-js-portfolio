"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import MagicButton from "../UI/Magic-button";
import { FaLocationArrow } from "react-icons/fa6";
import { projects } from "@/Data";

interface BlogPost {
  title: string;
  slug: string;
  createdDate: string;
}

export function InfiniteBlogScroller({ posts }: { posts: BlogPost[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const items = Array.from(scrollerRef.current.children);
      items.forEach((item) => {
        const clone = item.cloneNode(true);
        scrollerRef.current?.appendChild(clone);
      });
      setStart(true);
    }
  }, []);

  return (
    <div id="blogs">
      <section className="w-full min-h-[60vh] py-8 flex flex-col justify-center items-center relative overflow-hidden">
        <h1 className="text-4xl font-bold text-white mb-10 text-center">
          TechTales <span className="text-purple">Blogs</span>
        </h1>

        {/* Scrolling Blog Cards */}
        <div
          ref={containerRef}
          className="relative w-full flex justify-center items-center overflow-hidden"
        >
          <ul ref={scrollerRef} className="flex w-max gap-8 animate-scroll">
            {[...posts.slice(0, 4), ...posts.slice(0, 4)].map((post, idx) => (
              <motion.li
                key={idx}
                className="w-[22vw] min-w-[280px] max-w-[300px] h-[300px] flex-shrink-0 border-slate-800 border border-white/30 backdrop-blur-md rounded-xl p-5 shadow-lg flex flex-col justify-between"
                whileHover={{ scale: 1.05 }}
              >
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 line-clamp-3 break-words whitespace-normal">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Published on {post.createdDate}
                  </p>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-purple hover:underline mt-auto"
                >
                  Read More →
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* View All Blogs Button */}
        <div className="mt-10">
          <Link href="/blog" legacyBehavior>
            <a href="#about">
              <MagicButton
                title="View All Blogs"
                icon={<FaLocationArrow />}
                position="right"
              />
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
