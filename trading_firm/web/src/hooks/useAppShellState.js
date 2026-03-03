import { useEffect, useState } from "react";

import {
  STORAGE_NAV_ACTIVE,
  STORAGE_SIDEBAR_COLLAPSED,
  STORAGE_THEME,
  normalizeNav,
  normalizeTheme,
  storageGet,
  storageSet,
} from "../lib/dashboardUtils";

export function useAppShellState() {
  const [theme, setTheme] = useState(() => normalizeTheme(storageGet(STORAGE_THEME, "light")));
  const [activeNav, setActiveNav] = useState(() => {
    const stored = normalizeNav(storageGet(STORAGE_NAV_ACTIVE, "workspace"));
    return normalizeNav(window.location.hash || stored);
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => storageGet(STORAGE_SIDEBAR_COLLAPSED, "0") === "1");
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("theme-dark", theme === "dark");
    storageSet(STORAGE_THEME, theme);
  }, [theme]);

  useEffect(() => {
    storageSet(STORAGE_NAV_ACTIVE, activeNav);
    const nextHash = `#${activeNav}`;
    if (window.location.hash !== nextHash) {
      window.location.hash = activeNav;
    }
  }, [activeNav]);

  useEffect(() => {
    storageSet(STORAGE_SIDEBAR_COLLAPSED, sidebarCollapsed ? "1" : "0");
  }, [sidebarCollapsed]);

  useEffect(() => {
    const onHashChange = () => {
      setActiveNav((prev) => {
        const next = normalizeNav(window.location.hash);
        return prev === next ? prev : next;
      });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const sync = () => setMobile(media.matches);
    sync();
    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", sync);
      return () => media.removeEventListener("change", sync);
    }
    media.addListener(sync);
    return () => media.removeListener(sync);
  }, []);

  return {
    theme,
    setTheme,
    activeNav,
    setActiveNav,
    sidebarCollapsed,
    setSidebarCollapsed,
    mobile,
  };
}
