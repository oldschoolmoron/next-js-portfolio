import Hero from "./Components/Hero";
import Grid from "./Components/Grid";
import RecentProjects from "./Components/RecentProject";
import { FloatingNav } from "./Components/UI/Navbar";
import { navItems } from "@/Data";
import Feedback from "./Components/FeedbackButton";
import Link from "next/link";
import { getBlogPosts } from "@/app/lib/notion";
import { InfiniteBlogScroller } from "@/app/Components/Post/Bloglist";
import Experience from "./Components/Experience";
import Approach from "./Components/Approach";
import Footer from "./Components/Footer";

export default async function Home() {
  const posts = await getBlogPosts(); // ✅ Now includes author & createdDate

  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-clip">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Feedback />
        <Hero />
        <Grid />
        <RecentProjects />

        {/* ✅ Blog Section (Uses BlogList Component Now) */}
        <section className="w-full">
          <h2 className="text-3xl font-bold text-center text-white mb-8" />
          <InfiniteBlogScroller posts={posts} /> {/* ✅ No more TypeScript error */}
        </section>
        <Experience />
        <Approach />
        <Footer />
      </div>
    </main>
  );
}
