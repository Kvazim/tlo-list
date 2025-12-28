import { useEffect, useMemo, useState } from "react"

export const useMatchMedia = (brackpoints: string): boolean => {

  const mediaQuery = useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return window.matchMedia(brackpoints);
  }, [brackpoints]);

  const [matches, setMatches] = useState(() => mediaQuery?.matches ?? false);

  useEffect(() => {
    if (!mediaQuery) {
      return;
    }

    const handleChangeMedia = (e: MediaQueryListEvent) => setMatches(e.matches);

    const handleChangeMediaLegacy = () => setMatches(mediaQuery.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChangeMedia);
    } else {
      mediaQuery.addListener(handleChangeMediaLegacy);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChangeMedia);
      } else {
        mediaQuery.removeListener(handleChangeMediaLegacy);
      }
    }
  }, [mediaQuery]);

  return matches;
}
