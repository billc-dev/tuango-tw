import { useEffect, useRef, useState } from "react";

export const useScrollIntoView = (
  data: any,
  isLoading: boolean,
  hash: string
) => {
  const ref = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(true);

  useEffect(() => {
    if (window.location.hash === hash) setScrolled(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!ref?.current || !document || scrolled) return;

    if (data && !isLoading) {
      ref.current?.scrollIntoView({ behavior: "smooth" });
      setScrolled(true);
    }
  }, [scrolled, isLoading, data]);

  return { ref };
};
