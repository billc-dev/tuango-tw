import { isClient } from "utils";

export const getViewMode = () => {
  const viewMode = isClient ? localStorage.getItem("viewMode") : "server";
  if (viewMode) return viewMode;
  localStorage.setItem("viewMode", "cards");
  return "cards";
};

export const setStorageViewMode = (viewMode: string) => {
  localStorage.setItem("viewMode", viewMode);
};
