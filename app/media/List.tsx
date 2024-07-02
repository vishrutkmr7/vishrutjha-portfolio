"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Card, Button, Spinner } from "flowbite-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {
  FaAppStoreIos,
  FaCode,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaPodcast,
  FaTwitter,
} from "react-icons/fa";

import { Achievement, LeetCodeStats } from "@/app/types";

ChartJS.register(ArcElement, Tooltip, Legend);

// Constants
const LEETCODE_API_ENDPOINT =
  "https://leetcode-stats-api.herokuapp.com/vishrutjha";

// Helper Functions
const getLeetCodeChartData = (stats: LeetCodeStats | null) => ({
  labels: ["Easy", "Medium", "Hard"],
  datasets: [
    {
      data: [
        stats?.easySolved || 0,
        stats?.mediumSolved || 0,
        stats?.hardSolved || 0,
      ],
      backgroundColor: ["#00b8a3", "#ffc01e", "#ff375f"],
      borderColor: ["#000000", "#000000", "#000000"],
      borderWidth: 2,
      hoverBorderColor: ["#00b8a3", "#ffc01e", "#ff375f"],
    },
  ],
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "70%",
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          const label = context.label || "";
          const value = context.parsed || 0;
          const total = context.dataset.data.reduce(
            (a: number, b: number) => a + b,
            0
          );
          const percentage = ((value / total) * 100).toFixed(1);
          return `${label}: ${value} (${percentage}%)`;
        },
      },
    },
  },
};

// Components
const LeetCodeCard: React.FC<{ stats: LeetCodeStats | null }> = ({ stats }) => (
  <Card
    title="Not that it matters..."
    className="bg-gray-800 text-gray-300 border border-gray-700 flex flex-col h-full"
  >
    <h2 className="text-xl font-bold mb-4 text-gray-200">LeetCode Stats</h2>
    <div className="flex items-center justify-between mb-4">
      <div className="space-y-2 flex-grow">
        <p>
          <span className="font-semibold">Total Solved:</span>{" "}
          {stats?.totalSolved}/{stats?.totalQuestions}
        </p>
        <p>
          <span className="font-semibold">Acceptance Rate:</span>{" "}
          {stats?.acceptanceRate.toFixed(2)}%
        </p>
        <p>
          <span className="font-semibold">Ranking:</span>{" "}
          {stats?.ranking.toLocaleString()}
        </p>
        <p>
          <span className="font-semibold">E:</span> {stats?.easySolved}/
          {stats?.totalEasy} <span className="font-semibold">M:</span>{" "}
          {stats?.mediumSolved}/{stats?.totalMedium}{" "}
          <span className="font-semibold">H:</span> {stats?.hardSolved}/
          {stats?.totalHard}
        </p>
      </div>
      <div className="w-28 h-28 flex-shrink-0">
        <Doughnut data={getLeetCodeChartData(stats)} options={chartOptions} />
      </div>
    </div>
    <Button
      href="https://leetcode.com/vishrutjha/"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-blue-600 hover:bg-blue-700 text-white w-full mt-auto flex items-center justify-center"
    >
      <FaCode className="mr-2 h-5 w-5" />
      View LeetCode Profile
    </Button>
  </Card>
);

const AchievementCard: React.FC<{ achievement: Achievement }> = ({
  achievement,
}) => (
  <Card
    className="bg-gray-800 text-gray-300 border border-gray-700 flex flex-col h-full"
    id={achievement.title}
  >
    <div className="relative w-full h-48 mb-4">
      <Image
        src={`/${achievement.image}`}
        alt={achievement.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        loading="lazy"
        style={{
          objectFit: "cover",
        }}
        className="rounded-t-lg"
      />
    </div>
    <h2 className="text-xl font-bold mb-2 text-gray-200">
      {achievement.title}
    </h2>
    <p className="mb-4 flex-grow text-gray-300">{achievement.description}</p>
    <div className="mt-auto">
      <p className="text-gray-400 mb-4">{achievement.date}</p>
      {achievement.link && (
        <Button
          href={achievement.link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white w-full flex items-center justify-center"
        >
          {achievement.link.text === "Source Code" && (
            <FaGithub className="mr-2 h-5 w-5" />
          )}
          {achievement.link.text === "App Store" && (
            <FaAppStoreIos className="mr-2 h-5 w-5" />
          )}
          {achievement.link.text === "Listen on Apple Podcasts" && (
            <FaPodcast className="mr-2 h-5 w-5" />
          )}
          {achievement.link.text}
        </Button>
      )}
    </div>
  </Card>
);

const ContactCard: React.FC = () => (
  <Card className="bg-gray-800 text-gray-300 border border-gray-700 col-span-full">
    <h2 className="text-2xl font-bold mb-4 text-gray-200">Reach Out To Me</h2>
    <div className="flex flex-wrap justify-center gap-4">
      <Button
        href="#"
        onClick={() => {
          window.location.href =
            "mailto:" + "me" + "@" + "vishrutjha" + "." + "com";
        }}
        rel="noopener noreferrer"
        className="bg-blue-600 hover:bg-blue-700 text-white flex items-center"
      >
        <FaEnvelope className="mr-2 h-5 w-5" />
        Email
      </Button>

      <Button
        href="https://www.x.com/vishrutkmr7"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-400 hover:bg-blue-500 text-white flex items-center"
      >
        <FaTwitter className="mr-2 h-5 w-5" />
        Twitter
      </Button>
      <Button
        href="https://www.github.com/vishrutkmr7"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gray-700 hover:bg-gray-600 text-white flex items-center"
      >
        <FaGithub className="mr-2 h-5 w-5" />
        GitHub
      </Button>
      <Button
        href="https://www.linkedin.com/in/vishrutkmr7/"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-700 hover:bg-blue-800 text-white flex items-center"
      >
        <FaLinkedin className="mr-2 h-5 w-5" />
        LinkedIn
      </Button>
    </div>
  </Card>
);

// Main Component
const AchievementList: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [leetCodeStats, setLeetCodeStats] = useState<LeetCodeStats | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/data/mediaData.json").then((response) => response.json()),
      fetch(LEETCODE_API_ENDPOINT).then((response) => response.json()),
    ])
      .then(([achievementsData, leetCodeData]) => {
        setAchievements(achievementsData);
        setLeetCodeStats(leetCodeData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto p-4 my-8">
      <h1 className="text-4xl sm:text-5xl font-bold mb-8 mt-4 text-gray-200">
        Where have you seen me?
      </h1>
      {loading ? (
        <div className="text-center">
          <Spinner aria-label="Loading achievements" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <AchievementCard key={index} achievement={achievement} />
          ))}

          <LeetCodeCard stats={leetCodeStats} />
          <ContactCard />
        </div>
      )}
    </div>
  );
};

export default AchievementList;
