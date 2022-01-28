import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/zh-tw";

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.locale("zh-tw");

export const date = (date: string) => {
  return dayjs(date).format("LLLL").slice(0, -6);
};

export const fullDate = (date: string) => {
  return dayjs(date).format("LLL");
};

export const fullDateFromNow = (date: string) => {
  return `${dayjs(date).format("LLLL")} ${dayjs(date).fromNow()}`;
};

export const createdYesterday = (date: string) => {
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return new Date(date) < yesterday;
};

export const datePlus = (days: number) => {
  let date = new Date();
  date.setDate(date.getDate() + days);
  return dayjs(new Date(date)).format("YYYY-MM-DD");
};

export const getTime = (date: string) => {
  return dayjs(date).format("LLLL").slice(-5);
};
