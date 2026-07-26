/* eslint-disable */
'use strict';

// Composite-action repo: v* tags on main, manifest:'npm' writes the version into package.json
// (the old Forgejo config listed package.json in the commit-back but nothing ever bumped it),
// dist/ ships in the release commit, and floatingMajorTag force-pushes the v1-style major tag
// this repo already carries (v1, consumed as webgrip/action-typescript-template@v1).
const { makeConfig } = require('@webgrip/semantic-release-config');

module.exports = makeConfig({
  manifest: 'npm',
  extraAssets: ['dist/**/*.js'],
  floatingMajorTag: true,
});
