from __future__ import annotations

import json
import shutil
import socket
import subprocess
import threading
import urllib.request
from pathlib import Path

import pytest
from werkzeug.serving import make_server

from trading_firm.dashboard_server import create_app


@pytest.mark.skipif(shutil.which("npx") is None, reason="npx가 없어 Playwright 스모크를 실행할 수 없습니다.")
def test_web_navigation_and_responsive_smoke(tmp_path: Path) -> None:
    db_path = tmp_path / "dash.db"
    report_dir = tmp_path / "reports"
    chart_dir = tmp_path / "charts"
    report_dir.mkdir(parents=True, exist_ok=True)
    chart_dir.mkdir(parents=True, exist_ok=True)

    cfg = {
        "timezone": "Asia/Seoul",
        "db_path": str(db_path),
        "accounts": {
            "us": {"account_id": "us-paper", "currency": "USD", "initial_equity": 100000.0},
            "kr": {"account_id": "kr-paper", "currency": "KRW", "initial_equity": 100000000.0},
        },
        "reporting": {"daily_report_dir": str(report_dir), "chart_dir": str(chart_dir)},
        "control": {"allowed_actors": ["local-ui"]},
    }
    cfg_path = tmp_path / "firm.json"
    cfg_path.write_text(json.dumps(cfg), encoding="utf-8")

    app = create_app(str(cfg_path))

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(("127.0.0.1", 0))
        port = int(s.getsockname()[1])

    server = make_server("127.0.0.1", port, app)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()

    try:
        base_url = f"http://127.0.0.1:{port}"
        with urllib.request.urlopen(base_url, timeout=5) as resp:
            assert resp.status == 200
            html = resp.read().decode("utf-8")
            assert 'id="sidebarNav"' in html
            assert 'id="mobileTabBar"' in html
            assert 'id="view-workspace"' in html
            assert 'id="view-positions"' in html
            assert 'id="view-reports"' in html

        targets = [
            ("workspace", "1440,900"),
            ("positions", "390,844"),
            ("reports", "390,844"),
        ]

        for nav, viewport in targets:
            out = tmp_path / f"smoke-{nav}-{viewport.replace(',', 'x')}.png"
            cmd = [
                "npx",
                "playwright",
                "screenshot",
                f"--viewport-size={viewport}",
                "--full-page",
                f"{base_url}/#{nav}",
                str(out),
            ]
            proc = subprocess.run(cmd, capture_output=True, text=True, timeout=90)
            assert proc.returncode == 0, proc.stderr or proc.stdout
            assert out.exists()
            assert out.stat().st_size > 0
    finally:
        server.shutdown()
        thread.join(timeout=5)
