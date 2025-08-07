#!/usr/bin/env node
const { execSync } = require('node:child_process');
const { readFileSync } = require('node:fs');

function getStdout(cmd) {
  return execSync(cmd, { stdio: ['ignore', 'pipe', 'inherit'] }).toString().trim();
}

function parseOrigin(url) {
  try {
    if (url.startsWith('http')) {
      const u = new URL(url);
      const pathname = u.pathname.replace(/^\/+/, '');
      const [owner, repoWithGit] = pathname.split('/');
      const repo = repoWithGit.replace(/\.git$/, '');
      const token = u.password || '';
      return { owner, repo, token };
    }
  } catch {}
  // git@github.com:owner/repo.git
  const m = url.match(/github\.com[:/](.+?)\/(.+?)(?:\.git)?$/);
  if (!m) throw new Error('Cannot parse origin: ' + url);
  return { owner: m[1], repo: m[2].replace(/\.git$/, ''), token: '' };
}

(async () => {
  try {
    const origin = getStdout('git remote get-url origin');
    const branch = getStdout('git rev-parse --abbrev-ref HEAD');
    const { owner, repo, token } = parseOrigin(origin);
    if (!token) throw new Error('No token found in origin URL to authenticate API request');

    const bodyJson = readFileSync('.github/pr-body-update.json', 'utf8');

    const pullsUrl = `https://api.github.com/repos/${owner}/${repo}/pulls?head=${owner}:${branch}&state=open`;
    const pullsResp = await fetch(pullsUrl, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github+json',
        'User-Agent': 'cursor-agent',
      },
    });
    if (!pullsResp.ok) throw new Error(`Failed to list PRs: ${pullsResp.status}`);
    const pulls = await pullsResp.json();
    if (!Array.isArray(pulls) || pulls.length === 0) throw new Error(`Open PR not found for branch ${branch}`);

    const prNumber = pulls[0].number;
    const patchUrl = `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`;
    const patchResp = await fetch(patchUrl, {
      method: 'PATCH',
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'User-Agent': 'cursor-agent',
      },
      body: bodyJson,
    });
    if (!patchResp.ok) throw new Error(`Failed to update PR #${prNumber}: ${patchResp.status}`);
    console.log(`Updated PR #${prNumber}`);
  } catch (err) {
    console.error(String(err && err.message || err));
    process.exit(1);
  }
})();