import { NAV_SECTIONS } from "../lib/dashboardUtils";

const NAV_LABEL = {
  workspace: "워크스페이스",
  positions: "포지션",
  reports: "리포트",
};

export function SidebarNav({ activeNav, onChangeNav }) {
  return (
    <aside id="sidebarNav" className="sidebar-nav">
      <p className="sidebar-title">메뉴</p>
      <nav className="sidebar-menu" aria-label="주요 메뉴">
        {NAV_SECTIONS.map((nav) => (
          <button
            key={`sidebar-${nav}`}
            type="button"
            data-nav={nav}
            className={`nav-link ${activeNav === nav ? "active" : ""}`}
            onClick={() => onChangeNav(nav)}
          >
            {NAV_LABEL[nav]}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export function MobileTabBar({ activeNav, onChangeNav }) {
  return (
    <nav id="mobileTabBar" className="mobile-tabbar" aria-label="하단 탭 메뉴">
      {NAV_SECTIONS.map((nav) => (
        <button
          key={`mobile-${nav}`}
          type="button"
          data-nav={nav}
          className={activeNav === nav ? "active" : ""}
          onClick={() => onChangeNav(nav)}
        >
          {NAV_LABEL[nav]}
        </button>
      ))}
    </nav>
  );
}
