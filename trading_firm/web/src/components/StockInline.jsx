import { useMemo, useState } from "react";

import { stockFallbackGlyph, stockLogoUrl } from "../lib/dashboardUtils";

export function StockIcon({ market, symbol, seedLabel }) {
  const [broken, setBroken] = useState(false);
  const logoUrl = useMemo(() => stockLogoUrl(market, symbol), [market, symbol]);
  const fallback = useMemo(() => stockFallbackGlyph(seedLabel, symbol), [seedLabel, symbol]);

  if (!logoUrl || broken) {
    return (
      <span className="stock-icon fallback">
        {fallback}
      </span>
    );
  }

  return (
    <span className="stock-icon">
      <img
        src={logoUrl}
        alt={`${seedLabel || symbol || "종목"} 로고`}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setBroken(true)}
      />
    </span>
  );
}

export function StockInline({ market, symbol, label, iconSeedLabel }) {
  return (
    <span className="stock-inline">
      <StockIcon market={market} symbol={symbol} seedLabel={iconSeedLabel || label} />
      <span className="stock-name">{label}</span>
    </span>
  );
}
