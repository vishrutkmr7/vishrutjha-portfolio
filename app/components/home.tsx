import React from "react";
import Image from "next/image";
import profilePic from "../public/profile.jpg";

const HomePage = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen">
      <div className="md:w-1/2 flex justify-center">
        <Image
          src="/pfp.png"
          alt="Profile Picture"
          width={300}
          height={300}
          className="rounded-full"
        />
        <h1 className="text-4xl font-bold mt-4">Your Name</h1>
      </div>
      <div className="md:w-1/2 p-8">
        <h2 className="text-2xl font-bold mb-4">About Me</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor,
          magna vel bibendum bibendum, nulla nunc faucibus ex, vel faucibus
          nulla nunc et nulla.
        </p>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Social Links</h2>
          <ul>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
