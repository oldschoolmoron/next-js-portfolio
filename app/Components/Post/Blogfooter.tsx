import Image from "next/image";

export function BlogFooter() {
  return (
    <div className="w-full border-t border-gray-700 mt-10 pt-6 flex justify-between items-center text-white max-w-3xl mx-auto">
      {/* Left Side - Profile Photo & Name */}
      <div className="flex items-center gap-4">
        <Image
          src="/profilephoto.jpg" // Ensure this is in /public folder
          alt="Your Name"
          width={50}
          height={50}
          className="rounded-full border border-gray-500"
        />
        <div>
          <p className="text-lg font-semibold">Ananya Pathak</p>
          <p className="text-sm text-gray-400">Writer & Developer</p>
        </div>
      </div>

      {/* Right Side - Links */}
      <div className="flex gap-6 text-sm">
        <a href="https://linkedin.com/in/askananya" className="text-gray-400 hover:text-white">
          Linkedin
        </a>
        <a
          href="mailto:anyalko043@gmail.com"
          className="text-gray-400 hover:text-white"
        >
          Contact
        </a>
      </div>
    </div>
  );
}
