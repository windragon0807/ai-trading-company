export function TopBar({
  globalSearchInput,
  onGlobalSearchInputChange,
  onGlobalSearchKeyDown,
  theme,
  onToggleTheme,
  paused,
  onRefreshAll,
  sidebarCollapsed,
  onToggleSidebar,
}) {
  const dark = theme === "dark";

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
          ☰
        </button>
        <img className="brand-mark" src="/static/favicon.svg?v=20260302b" alt="Ryong Investment logo" />
        <strong className="brand-title">Ryong Investment</strong>
      </div>
      <div className="status-wrap">
        <div className="search-shell">
          <span className="search-icon" aria-hidden="true">
            ⌕
          </span>
          <input
            id="globalSearchInput"
            className="search-input"
            type="text"
            placeholder="종목/뉴스/이슈 검색"
            value={globalSearchInput}
            onChange={(ev) => onGlobalSearchInputChange(ev.target.value)}
            onKeyDown={onGlobalSearchKeyDown}
          />
        </div>
        <button
          className={`btn theme-btn ${dark ? "active" : ""}`}
          id="themeToggle"
          type="button"
          aria-pressed={dark ? "true" : "false"}
          onClick={onToggleTheme}
        >
          {dark ? "라이트 모드" : "다크 모드"}
        </button>
        <span className={`pill ${paused ? "paused" : ""}`} id="runState">
          {paused ? "중지" : "운영중"}
        </span>
        <button className="btn accent" id="refreshAll" type="button" onClick={onRefreshAll}>
          새로고침
        </button>
      </div>
    </header>
  );
}
