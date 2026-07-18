// Release config for webgrip/action-typescript-template.
//
// Forge-agnostic: ONE config, correct on both Forgejo (leading) and GitHub (mirror). The publish
// plugin and the version commit-back are gated on GITEA_ACTIONS — an intrinsic Forgejo-runner env
// var (=true on Forgejo, unset on GitHub; GITHUB_ACTIONS is set on BOTH so it can't discriminate).
// See the `forgejo-port-workflows` skill in the homelab-cluster repo.
//
// Forgejo plugin constraint: the shared semantic-release composite action installs a FIXED plugin
// set (`npm install --no-save semantic-release @semantic-release/{changelog,commit-analyzer,exec,
// git} @saithodev/semantic-release-gitea semantic-release-helm3 …`). @semantic-release/npm and
// semantic-release-github-actions-tags are NOT in that set, so the Forgejo branch must not
// reference them (semantic-release loads every configured plugin at startup, releasable commit or
// not — a missing module fails the whole run).
const onForgejo = !!process.env.GITEA_ACTIONS;

const commitAnalyzer = ['@semantic-release/commit-analyzer'];
const releaseNotes = ['@semantic-release/release-notes-generator'];
const changelog = ['@semantic-release/changelog', { changelogFile: 'CHANGELOG.md' }];

// Version/changelog commit-back ONLY on Forgejo (the sole release authority). The GitHub mirror
// must never re-version. `[skip ci]` is honoured by both forges. Unchanged assets are skipped, so
// listing dist/package.json is harmless when nothing rebuilt them.
const commitBack = [
    '@semantic-release/git',
    {
        assets: ['dist/**/*.js', 'package.json', 'package-lock.json', 'CHANGELOG.md'],
        message: 'chore(release): ${nextRelease.version} [skip ci]',
    },
];

const exec = [
    '@semantic-release/exec',
    { successCmd: 'echo "version=${nextRelease.version}" >> $GITHUB_OUTPUT' },
];

// GitHub-only plugins (composite doesn't install them on Forgejo; actions-tags is GitHub-specific).
const npmNoPublish = ['@semantic-release/npm', { npmPublish: false }];
const actionsTags = 'semantic-release-github-actions-tags';

const giteaPublish = ['@saithodev/semantic-release-gitea', {}];
const githubPublish = ['@semantic-release/github', {}];

module.exports = {
    branches: ['main'],
    tagFormat: 'v${version}',
    plugins: onForgejo
        ? [commitAnalyzer, releaseNotes, changelog, commitBack, exec, giteaPublish]
        : [commitAnalyzer, releaseNotes, changelog, commitBack, exec, npmNoPublish, actionsTags, githubPublish],
};
