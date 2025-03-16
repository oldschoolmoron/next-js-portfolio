import { Spotlight } from "./UI/Spotlight";
import React from "react";
import { TextGenerateEffect } from "./UI/TxtGenerate-effect";

import Image from "next/image";
import MagicButton from "./UI/Magic-button";
import { FaLocationArrow } from "react-icons/fa";
const Hero = () => {
  return (
    <div className="pb-[1rem] pt-[6.5rem]">
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top20 h-screen"
          fill="white"
        />
        <Spotlight
          className="top-0 left-full h-[80vh] w-[50vw]"
          fill="white"
        />
        <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="white" />
      </div>
      <div
        className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
       absolute top-0 left-0 flex items-center justify-center"
      >
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>
      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <h2 className="uppercase tracking-widest lg:max-w-[60vw] text-xs text-center text-blue-100 max-w-80 mt-[-20]">
          Crafting Scalable & Secure Digital Experiences
          </h2>
          <Image
          src="/profilephoto.jpg" // Make sure this image is inside the 'public' folder
          alt="Profile Photo"
          width={200} // Default size
          height={200}
          className="rounded-full border-4 border-purple shadow-lg w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 mt-6 transition-transform duration-300 hover:scale-105"
        />  
          <TextGenerateEffect
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
            words="Bridging Innovation Between Web & Blockchain"
          />
          <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
            Hi, I&apos;m Ananya, a Blockchain Developer based in India.
          </p>
            <a href='#about'>
              <MagicButton 
                title="Show my work"
                icon={<FaLocationArrow />}
                position="right"
              />
            </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
