"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Accordion, Card, Spinner } from "flowbite-react";

interface Achievement {
  title: string;
  description: string;
  date: string;
  image: string;
  link?: {
    text: string;
    url: string;
  };
}

interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
}

const AchievementList: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [leetCodeStats, setLeetCodeStats] = useState<LeetCodeStats | null>(
    null
  );
  const leetCodeAPIEndpoint =
    "https://leetcode-stats-api.herokuapp.com/vishrutjha";

  useEffect(() => {
    fetch("/data/mediaData.json")
      .then((response) => response.json())
      .then((data) => setAchievements(data));
  }, []);

  useEffect(() => {
    fetch(leetCodeAPIEndpoint)
      .then((response) => response.json())
      .then((data) => setLeetCodeStats(data));
  }, []);

  return (
    <div className="container mx-auto p-4 my-8">
      <h1 className="text-4xl sm:text-5xl font-bold mb-8 mt-4">
        Where have you seen me?
      </h1>
      <Accordion>
        {achievements.map((achievement, index) => (
          <Accordion.Panel key={index}>
            <Accordion.Title>{achievement.title}</Accordion.Title>
            <Accordion.Content>
              <div className="flex flex-col sm:flex-row items-center">
                <Image
                  src={`/${achievement.image}`}
                  alt={achievement.title}
                  width={200}
                  height={200}
                  className="w-32 h-32 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4"
                />
                <div>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    {achievement.description}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    {achievement.date}
                  </p>
                  {achievement.link && (
                    <a
                      href={achievement.link.url}
                      className="text-cyan-600 hover:underline dark:text-cyan-500"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {achievement.link.text}
                    </a>
                  )}
                </div>
              </div>
            </Accordion.Content>
          </Accordion.Panel>
        ))}
      </Accordion>
    </div>
  );
};

export default AchievementList;
