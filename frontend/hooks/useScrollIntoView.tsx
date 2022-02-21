import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";

export const useScrollIntoView = (isLoading: boolean, action: string) => {
  const ref = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (router.query.action === action) setScrolled(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!ref?.current || !document || scrolled) return;

    if (!isLoading) {
      ref.current?.scrollIntoView({ behavior: "smooth" });
      setScrolled(true);
    }
  }, [scrolled, isLoading]);

  return { ref };
};
