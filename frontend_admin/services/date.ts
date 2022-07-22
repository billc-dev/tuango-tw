import dayjs from "dayjs";
import "dayjs/locale/zh-tw";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.locale("zh-tw");

export const getMonthAndDate = (date: string) => {
  return dayjs(date).format("MM-DD");
};

export const getFullDate = (date: string) => {
  return dayjs(date).format("LL");
};

export const getFullDateWithWeek = (date: string) => {
  return dayjs(date).format("M月D日dddd");
};

export const getFullLengthDate = (date: string) => {
  return dayjs(date).format("LLLL");
};

export const getFullDateFromNow = (date: string) => {
  return `${dayjs(date).format("LLLL")} ${dayjs(date).fromNow()}`;
};

export const createdYesterday = (date: string) => {
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return new Date(date) < yesterday;
};

export const getFormattedDate = (days?: number) => {
  let date = new Date();
  if (days) date.setDate(date.getDate() + days);
  return dayjs(new Date(date)).format("YYYY-MM-DD");
};

export const getTime = (date: string) => {
  return dayjs(date).format("LLLL").slice(-5);
};

export const getMessageDate = (date: string) => {
  if (dayjs().diff(date, "d") > 1) {
    return dayjs(date).format("M/D HH:MM");
  }
  return dayjs(date).format("HH:MM");
};

export const getYesterday = () => {
  return dayjs(new Date()).subtract(1, "day").endOf("day").toISOString();
};
