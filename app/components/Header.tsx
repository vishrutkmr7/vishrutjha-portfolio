"use client";

import React from "react";
import Link from "next/link";

const Header = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (index: number): void => {
    setValue(index);
  };

  return (
    <header className="bg-gray-200 dark:bg-gray-800 py-4">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-white text-xl font-bold">Vishrut Jha</div>
        <nav className="flex space-x-4">
          <Link href="/" legacyBehavior={true}>
            <a
              className={`text-white px-3 py-2 rounded ${
                value === 0 ? "bg-blue-700" : "hover:bg-blue-500"
              }`}
              onClick={() => handleChange(0)}
            >
              About Me
            </a>
          </Link>
          <Link href="/journey" legacyBehavior={true}>
            <a
              className={`text-white px-3 py-2 rounded ${
                value === 1 ? "bg-blue-700" : "hover:bg-blue-500"
              }`}
              onClick={() => handleChange(1)}
            >
              My Journey
            </a>
          </Link>
          <Link href="/projects" legacyBehavior={true}>
            <a
              className={`text-white px-3 py-2 rounded ${
                value === 2 ? "bg-blue-700" : "hover:bg-blue-500"
              }`}
              onClick={() => handleChange(2)}
            >
              Projects
            </a>
          </Link>
          <Link href="/achievements" legacyBehavior={true}>
            <a
              className={`text-white px-3 py-2 rounded ${
                value === 3 ? "bg-blue-700" : "hover:bg-blue-500"
              }`}
              onClick={() => handleChange(3)}
            >
              Achievements
            </a>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;