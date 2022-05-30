import { useEffect, useState } from "react";

interface WindowSize {
  width: undefined | number;
  height: undefined | number;
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint | undefined>(
    undefined
  );
  const getBreakPoint = () => {
    const { innerWidth } = window;

    if (innerWidth <= 640) return "sm";
    if (innerWidth <= 768) return "md";
    if (innerWidth <= 1024) return "lg";
    if (innerWidth <= 1280) return "xl";
    if (innerWidth > 1280) return "2xl";
  };
  useEffect(() => {
    function handleResize() {
      setBreakpoint(getBreakPoint());
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return breakpoint;
}

export function useIsSmallScreen() {
  const breakpoint = useBreakpoint();
  return breakpoint === "sm" || breakpoint === "md";
}
