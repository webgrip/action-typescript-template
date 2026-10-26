/* eslint-disable */
'use strict';

// Composite-action repo: v* tags on main, consumed as webgrip/action-typescript-template@v1.
// The tag's tree must carry the built dist/ and the stamped package.json, so taggedFiles puts them
// on a commit that sits on no branch and the tag (and the floating v1) points there. main itself
// never receives a release commit.
const { makeConfig } = require('@webgrip/semantic-release-config');

module.exports = makeConfig({
  manifest: 'npm',
  taggedFiles: ['dist', 'package.json', 'package-lock.json'],
  floatingMajorTag: true,
});
