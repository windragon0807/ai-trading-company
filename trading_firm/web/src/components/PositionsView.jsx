import { StockInline } from "./StockInline";
import {
  STRATEGY_AGENT_PROFILE,
  currencyByMarket,
  fmtMoney,
  fmtSignedMoney,
  formatQty,
  formatTs,
  marketLabel,
  numberClass,
  sideLabel,
  symbolDisplay,
} from "../lib/dashboardUtils";

export function PositionsView({ active, positions, recentFills, agentExposure, onClickPositionSymbol }) {
  return (
    <section id="view-positions" className={`view-pane ${active ? "active" : ""}`}>
      <div className="stack-grid">
        <section className="module position-module">
          <h2>보유 포지션</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>종목</th>
                  <th>수량</th>
                  <th>노출금액</th>
                  <th>평가손익</th>
                </tr>
              </thead>
              <tbody id="openPositionRows">
                {!positions?.length ? (
                  <tr>
                    <td colSpan={4}>보유 포지션 없음</td>
                  </tr>
                ) : (
                  positions.slice(0, 80).map((row, index) => {
                    const label = symbolDisplay(row.market, row.symbol);
                    const currency = currencyByMarket(row.market);
                    return (
                      <tr key={`${row.market}-${row.symbol}-${index}`}>
                        <td>
                          <button
                            type="button"
                            className="symbol-link"
                            title={label}
                            onClick={() => onClickPositionSymbol(row)}
                          >
                            <StockInline market={row.market} symbol={row.symbol} label={label} />
                          </button>
                        </td>
                        <td>{formatQty(row.qty)}</td>
                        <td>{fmtMoney(row.notional, currency)}</td>
                        <td className={numberClass(row.unrealized_pnl)}>{fmtSignedMoney(row.unrealized_pnl, currency)}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="module fill-module">
          <h2>투자 내역</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>시간</th>
                  <th>종목</th>
                  <th>방향</th>
                  <th>수량</th>
                  <th>가격</th>
                </tr>
              </thead>
              <tbody id="recentFillRows">
                {!recentFills?.length ? (
                  <tr>
                    <td colSpan={5}>체결 내역 없음</td>
                  </tr>
                ) : (
                  recentFills.slice(0, 100).map((row, index) => {
                    const currency = currencyByMarket(row.market);
                    const label = symbolDisplay(row.market, row.symbol);
                    const ts = formatTs(row.ts);
                    return (
                      <tr key={`${row.market}-${row.symbol}-${row.ts || index}`}>
                        <td title={ts}>{ts}</td>
                        <td title={label}>
                          <StockInline market={row.market} symbol={row.symbol} label={label} />
                        </td>
                        <td>{sideLabel(row.side)}</td>
                        <td>{formatQty(row.qty)}</td>
                        <td>{fmtMoney(row.price, currency)}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="module agent-module">
          <h2>직원별 투자 현황</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>직원</th>
                  <th>시장</th>
                  <th>노출금액</th>
                  <th>손익</th>
                  <th>투자 성향</th>
                </tr>
              </thead>
              <tbody id="agentExposureRows">
                {!agentExposure?.length ? (
                  <tr>
                    <td colSpan={5}>데이터 없음</td>
                  </tr>
                ) : (
                  agentExposure.slice(0, 40).map((row, index) => {
                    const profile = STRATEGY_AGENT_PROFILE[row.strategy] || STRATEGY_AGENT_PROFILE.unassigned;
                    const currency = currencyByMarket(row.market);
                    return (
                      <tr key={`${row.strategy}-${row.market}-${index}`}>
                        <td>{profile.name}</td>
                        <td>{marketLabel(row.market)}</td>
                        <td>{fmtMoney(row.notional, currency)}</td>
                        <td className={numberClass(row.pnl)}>{fmtSignedMoney(row.pnl, currency)}</td>
                        <td>{profile.style}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </section>
  );
}
