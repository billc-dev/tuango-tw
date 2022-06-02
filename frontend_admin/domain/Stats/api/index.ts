import axios from "axios";

import { IDeliver } from "domain/Deliver/types";

import { IStatsQuery } from "../types";

export const fetchStats = async (query: IStatsQuery) => {
  const res = await axios.get<{ delivers: IDeliver[] }>(
    `/delivers/stats/${query.startDate}/${query.endDate}`
  );
  return res.data.delivers;
};
