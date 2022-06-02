import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import dayjs, { OpUnitType } from "dayjs";
import { shallowPush } from "utils";

import Button from "components/Button";
import TextField from "components/TextField";
import { getFormattedDate } from "services/date";

import { useStats } from "./hooks";

const StatsQuery = () => {
  const router = useRouter();
  const [dates, setDates] = useState({
    startDate: getFormattedDate(-6),
    endDate: getFormattedDate(),
  });
  const statsQuery = useStats({
    startDate: router.query.startDate as string,
    endDate: router.query.endDate as string,
  });
  const { startDate, endDate } = dates;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDates({ ...dates, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    shallowPush(router, { ...router.query, startDate, endDate });
  };
  const handleShortcutDate = (unit: OpUnitType, num: number) => {
    const startDate = dayjs()
      .subtract(num, unit)
      .startOf(unit)
      .format("YYYY-MM-DD");
    const endDate = dayjs()
      .subtract(num, unit)
      .endOf(unit)
      .format("YYYY-MM-DD");
    setDates({ startDate, endDate });
    shallowPush(router, { ...router.query, startDate, endDate });
  };
  useEffect(() => {
    if (!router.isReady) return;
    const { startDate, endDate } = router.query;
    if (typeof startDate === "string" && typeof endDate === "string") {
      setDates({ startDate, endDate });
    } else {
      shallowPush(router, {
        ...router.query,
        startDate: getFormattedDate(-6),
        endDate: getFormattedDate(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return (
    <div className="my-2">
      <form className="flex" onSubmit={handleSubmit}>
        <TextField
          variant="standard"
          type="date"
          name="startDate"
          value={startDate}
          onChange={handleChange}
        />
        <TextField
          variant="standard"
          type="date"
          name="endDate"
          value={endDate}
          onChange={handleChange}
        />
        <Button type="submit" variant="primary" loading={statsQuery.isLoading}>
          搜尋
        </Button>
      </form>
      <div className="flex my-2">
        <Button onClick={() => handleShortcutDate("week", 0)}>本週</Button>
        <Button onClick={() => handleShortcutDate("week", 1)}>上週</Button>
        <Button onClick={() => handleShortcutDate("month", 0)}>本月</Button>
        <Button onClick={() => handleShortcutDate("month", 1)}>上月</Button>
      </div>
    </div>
  );
};

export default StatsQuery;
