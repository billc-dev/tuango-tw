import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Theme Mode
    </Button>
  );
};

export default ThemeToggle;
