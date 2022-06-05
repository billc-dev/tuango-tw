import { useQuery } from "react-query";

import { fetchStats } from "../api";
import { IStatsQuery } from "../types";

export const useStats = (query: IStatsQuery) => {
  const isEnabled = () => {
    if (query.startDate && query.endDate) return true;
    return false;
  };
  return useQuery([query], () => fetchStats(query), { enabled: isEnabled() });
};
