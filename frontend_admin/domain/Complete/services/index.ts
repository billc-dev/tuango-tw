export const shorternAdminName = (name: string) => {
  if (name.includes("May")) return "林美玲May";
  else if (name.includes("Andy")) return "鄭朝元Andy";
  else return name;
};
