import { useCallback, useState } from "react";

import { api } from "../lib/dashboardUtils";

export function useReportsState() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState("");
  const [reportContent, setReportContent] = useState("불러오는 중...");

  const loadReport = useCallback(async (date) => {
    if (!date) {
      setReportContent("보고서가 아직 없습니다.");
      return;
    }
    const data = await api(`/api/report/${date}`);
    setReportContent(data.content);
  }, []);

  const loadReports = useCallback(async () => {
    const data = await api("/api/reports");
    const nextReports = Array.isArray(data.reports) ? data.reports : [];
    setReports(nextReports);

    if (!nextReports.length) {
      setSelectedReport("");
      setReportContent("보고서가 아직 없습니다.");
      return;
    }

    const selected = selectedReport && nextReports.includes(selectedReport) ? selectedReport : nextReports[0];
    setSelectedReport(selected);
    await loadReport(selected);
  }, [selectedReport, loadReport]);

  const changeReport = useCallback(async (date) => {
    setSelectedReport(date);
    await loadReport(date);
  }, [loadReport]);

  return {
    reports,
    selectedReport,
    reportContent,
    loadReport,
    loadReports,
    changeReport,
  };
}
