#!/usr/bin/env python3
"""Mulai milestone Jules berikutnya setelah PR milestone di-merge ke main.

Dipanggil oleh .github/workflows/jules-chain.yml pada setiap push ke main.
PR dianggap milestone hanya jika baris pertama deskripsinya:
CHAIN-MILESTONE: Mx
"""
import json
import os
import re
import subprocess
import sys
import urllib.error
import urllib.request

ORDER = ["M0", "M1", "M2", "M3", "M4", "M5", "M6"]
ACTIVE_STATES = {"QUEUED", "PLANNING", "AWAITING_USER_FEEDBACK", "IN_PROGRESS", "PAUSED"}
JULES_BASE = os.environ.get("JULES_BASE", "https://jules.googleapis.com/v1alpha")


def gh_api(path):
    res = subprocess.run(["gh", "api", path], capture_output=True, text=True)
    if res.returncode != 0:
        sys.exit(f"gh api {path} gagal: {res.stderr.strip()}")
    return json.loads(res.stdout)


def jules(method, path, body=None):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(
        JULES_BASE + path,
        data=data,
        method=method,
        headers={"Content-Type": "application/json", "X-Goog-Api-Key": os.environ["JULES_API_KEY"]},
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            return json.loads(resp.read() or b"{}")
    except urllib.error.HTTPError as e:
        sys.exit(f"Jules API {method} {path} gagal {e.code}: {e.read().decode()[:400]}")


def main():
    if not os.environ.get("JULES_API_KEY"):
        sys.exit("Secret JULES_API_KEY belum diisi. Isi di Settings > Secrets and variables > Actions.")

    repo = os.environ["GITHUB_REPOSITORY"]
    prs = gh_api(f"repos/{repo}/commits/{os.environ['GITHUB_SHA']}/pulls")
    if not prs:
        print("Commit ini bukan hasil merge PR. Selesai.")
        return
    pr = prs[0]
    if not pr.get("merged_at"):
        print(f"PR #{pr['number']} belum di-merge. Selesai.")
        return
    match = re.search(r"^CHAIN-MILESTONE:\s*(M[0-6])\s*$", pr.get("body") or "", re.MULTILINE)
    if not match:
        print(f"PR #{pr['number']} tidak punya baris CHAIN-MILESTONE. Selesai.")
        return

    done = match.group(1)
    if ORDER.index(done) == len(ORDER) - 1:
        print("Semua milestone sudah selesai.")
        return
    nxt = ORDER[ORDER.index(done) + 1]

    for s in jules("GET", "/sessions?pageSize=100").get("sessions", []):
        if f"milestone {nxt} saja" in s.get("prompt", "") and s.get("state") in ACTIVE_STATES:
            print(f"Sesi untuk {nxt} sudah aktif ({s.get('name')}). Selesai.")
            return

    sources = jules("GET", "/sources").get("sources", [])
    source = next((s["name"] for s in sources if s.get("name", "").endswith("/" + repo)), None)
    if not source:
        sys.exit(f"Repo {repo} belum terhubung ke Jules. Install Jules GitHub app dulu.")

    body = {
        "prompt": (
            f"Kerjakan milestone {nxt} saja, sesuai docs/SPEC.md bagian 9 dan AGENTS.md. "
            "Jangan kerjakan milestone lain. Baris pertama deskripsi PR wajib: "
            f"CHAIN-MILESTONE: {nxt}. Berhenti setelah PR dibuat."
        ),
        "title": f"CHAIN {nxt}",
        "sourceContext": {"source": source, "githubRepoContext": {"startingBranch": "main"}},
        "automationMode": "AUTO_CREATE_PR",
        "requirePlanApproval": False,
    }
    created = jules("POST", "/sessions", body)
    print(f"Sesi CHAIN {nxt} dibuat: {created.get('name')} {created.get('url', '')}")


if __name__ == "__main__":
    main()
