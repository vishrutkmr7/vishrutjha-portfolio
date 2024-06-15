import React from "react";
import JourneyTimeline from "../components/Timeline";

const JourneyPage: React.FC = () => {
  return (
    <div className="container mx-auto p-20">
      <h1 className="text-3xl font-bold mb-4">How did I get here?</h1>
      <br />
      <JourneyTimeline />
    </div>
  );
};

export default JourneyPage;
