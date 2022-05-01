import React, { useEffect, useState } from "react";

import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import { useTheme } from "next-themes";

import IconButton from "./IconButton";

const ThemeButton = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <IconButton onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </IconButton>
  );
};

export default ThemeButton;
