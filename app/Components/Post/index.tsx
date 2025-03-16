import Image from "next/image";
import { BlogFooter } from "./Blogfooter";

interface PostProps {
  title: string;
  bannerImage: string;
  bannerImageWidth: number;
  bannerImageHeight: number;
  coverImage?: string;
  createdDate?: string;
  content: string;
}

export function Post(props: PostProps) {
  const { title, content, bannerImage, bannerImageWidth, bannerImageHeight, coverImage, createdDate } = props;

  return (
    <article className="w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-12 xl:px-20">
      {/* ✅ Cover Image (Wider Aspect Ratio for a Classy Look) */}
      {coverImage && coverImage.trim() !== "" && (
        <div className="w-full mb-8 rounded-lg overflow-hidden shadow-lg">
          <Image 
            alt="Cover Image" 
            src={coverImage} 
            width={1200} 
            height={500} 
            className="object-cover w-full h-[300px] md:h-[400px] lg:h-[450px]" 
          />
        </div>
      )}

      {/* ✅ Created Date - Minimal Style */}
      {createdDate && createdDate.trim() !== "" && (
        <p className="text-gray-500 text-sm text-center mb-2">{createdDate}</p>
      )}

      {/* ✅ Heading - More Professional & Less Bulky */}
      <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-6 leading-tight">
        {title}
      </h1>

      {/* ✅ Blog Banner Image (Smaller & More Compact) */}
      {bannerImage && bannerImage.trim() !== "" && (
        <div className="w-full flex justify-center mb-6">
          <Image
            alt="Blog Image"
            src={bannerImage}
            width={bannerImageWidth}
            height={bannerImageHeight}
            className="rounded-md shadow-md max-w-full h-auto"
          />
        </div>
      )}

      {/* ✅ Content with Professional Styling */}
      <div className="text-lg leading-relaxed prose prose-invert prose-p:text-gray-300 prose-headings:text-gray-100 prose-li:text-gray-300">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      <BlogFooter />
    </article>
  );
}
