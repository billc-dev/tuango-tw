import React from "react";

import StatsQuery from "./StatsQuery";
import StatsSummary from "./StatsSummary";

const Stats = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mx-2">
        <StatsQuery />
        <StatsSummary />
      </div>
    </div>
  );
};

export default Stats;
