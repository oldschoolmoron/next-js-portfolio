import React from "react";
import MagicButton from "./UI/Magic-button";
import { FaLocationArrow } from "react-icons/fa";
import { socialMedia } from "@/Data";

const Footer = () => {
  return (
    <footer className="w-full pb-10 mb-[100px] md:mb-5" id="contact">
      <div className="flex flex-col items-center text-center">
        <h1 className="heading lg:max-w-[45vw]">
          Ready to add a results-driven developer to your team?
          <span className="text-purple"> Let's make it happen.</span>
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Let's connect and discuss how I can contribute to your team.
        </p>
        <a href="mailto:anyalko043@gmail.com">
          <MagicButton
            title="Get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © 2025 Ananya
        </p>
        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((profile) => (
            <a
              key={profile.id}
              href={profile.link}
              target="_blank" // Opens in a new tab
              rel="noopener noreferrer" // Security best practice
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <img src={profile.img} alt="Social Icon" width={20} height={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
