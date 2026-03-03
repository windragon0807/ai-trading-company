import { useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Clock3, LoaderCircle, Menu, Moon, RefreshCw, Sun } from "lucide-react";

export function TopBar({
  theme,
  onToggleTheme,
  onRefreshAll,
  sidebarCollapsed,
  onToggleSidebar,
}) {
  const dark = theme === "dark";
  const [localNow, setLocalNow] = useState(() => new Date());
  const [refreshBusy, setRefreshBusy] = useState(false);
  const [refreshNotice, setRefreshNotice] = useState({ type: "idle", text: "" });
  const refreshNoticeTimerRef = useRef(null);
  const timeZone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone || "", []);
  const clockZone = timeZone === "Asia/Seoul" ? "KST" : "LOCAL";
  const clockValue = useMemo(() => localNow.toLocaleString("ko-KR"), [localNow]);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setLocalNow(new Date());
    }, 1000);
    return () => window.clearInterval(timerId);
  }, []);

  useEffect(() => {
    return () => {
      if (refreshNoticeTimerRef.current) {
        window.clearTimeout(refreshNoticeTimerRef.current);
      }
    };
  }, []);

  const showRefreshNotice = (type, text, ttlMs = 1500) => {
    if (refreshNoticeTimerRef.current) {
      window.clearTimeout(refreshNoticeTimerRef.current);
      refreshNoticeTimerRef.current = null;
    }
    setRefreshNotice({ type, text });
    if (ttlMs > 0) {
      refreshNoticeTimerRef.current = window.setTimeout(() => {
        refreshNoticeTimerRef.current = null;
        setRefreshNotice({ type: "idle", text: "" });
      }, ttlMs);
    }
  };

  const handleClickRefresh = async () => {
    if (refreshBusy) return;
    setRefreshBusy(true);
    showRefreshNotice("loading", "동기화 중...", 0);
    try {
      await Promise.resolve(onRefreshAll?.());
      showRefreshNotice("success", "동기화 완료", 1600);
    } catch (_) {
      showRefreshNotice("error", "새로고침 실패", 2400);
    } finally {
      setRefreshBusy(false);
    }
  };

  return (
    <header className="topbar">
      <div className="brand-wrap">
        <button
          id="sidebarToggle"
          className={`sidebar-toggle ${sidebarCollapsed ? "active" : ""}`}
          type="button"
          aria-label={sidebarCollapsed ? "사이드바 펼치기" : "사이드바 접기"}
          onClick={onToggleSidebar}
        >
          <Menu className="topbar-btn-icon" aria-hidden="true" />
        </button>
        <img className="brand-mark" src="/static/favicon.svg?v=20260302b" alt="Ryong Investment logo" />
        <strong className="brand-title">Ryong Investment</strong>
      </div>
      <div className="status-wrap">
        <button
          className={`btn theme-icon-btn ${dark ? "active" : ""}`}
          id="themeToggle"
          type="button"
          aria-label={dark ? "라이트 모드로 전환" : "다크 모드로 전환"}
          aria-pressed={dark ? "true" : "false"}
          onClick={onToggleTheme}
        >
          {dark ? <Sun className="topbar-btn-icon" aria-hidden="true" /> : <Moon className="topbar-btn-icon" aria-hidden="true" />}
        </button>
        <div className="refresh-action">
          <button
            className="btn refresh-icon-btn"
            id="refreshAll"
            type="button"
            aria-label="데이터 새로고침"
            onClick={handleClickRefresh}
            disabled={refreshBusy}
          >
            <RefreshCw className={`topbar-btn-icon ${refreshBusy ? "is-spinning" : ""}`} aria-hidden="true" />
          </button>
          <div
            className={`topbar-feedback ${refreshNotice.type !== "idle" ? "show" : ""} ${refreshNotice.type}`}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {refreshNotice.type === "loading" ? <LoaderCircle className="topbar-feedback-icon is-spinning" aria-hidden="true" /> : null}
            {refreshNotice.type === "success" ? <CheckCircle2 className="topbar-feedback-icon" aria-hidden="true" /> : null}
            {refreshNotice.type === "error" ? <AlertCircle className="topbar-feedback-icon" aria-hidden="true" /> : null}
            <span>{refreshNotice.text}</span>
          </div>
        </div>
        <div className="topbar-clock" id="localClock" title={clockValue}>
          <span className="topbar-clock-icon" aria-hidden="true">
            <Clock3 className="topbar-btn-icon" aria-hidden="true" />
          </span>
          <span className="topbar-clock-main">
            <span className="topbar-clock-zone">{clockZone}</span>
            <span className="topbar-clock-text">{clockValue}</span>
          </span>
        </div>
      </div>
    </header>
  );
}
