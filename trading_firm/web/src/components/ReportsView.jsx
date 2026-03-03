export function ReportsView({
  active,
  reports,
  selectedReport,
  reportContent,
  operationLog,
  onChangeReport,
  onReloadReport,
}) {
  return (
    <section id="view-reports" className={`view-pane ${active ? "active" : ""}`}>
      <div className="stack-grid">
        <section className="module report-module">
          <h2>일일 보고서</h2>
          <div className="row">
            <select id="reportSelector" value={selectedReport} onChange={(ev) => onChangeReport(ev.target.value)}>
              {reports.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
            <button className="btn" id="reloadReport" type="button" onClick={onReloadReport}>
              불러오기
            </button>
          </div>
          <pre id="reportViewer">{reportContent || "보고서를 불러오는 중..."}</pre>
        </section>

        <section className="module log-module">
          <h2>운영 로그</h2>
          <pre id="operationLog">{operationLog || "준비 완료."}</pre>
        </section>
      </div>
    </section>
  );
}
