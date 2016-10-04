// This script copies src/index.html into /dist/index.html
// and adds TrackJS error tracking code for use in production
// when useTrackJs is set to true below and a trackJsToken is provided.
// This is a good example of using Node and cheerio to do a simple file transformation.
// In this case, the transformation is useful since we only want to track errors in the built production code.

// Allowing console calls below since this is a build file.
/*eslint-disable no-console */

import fs from 'fs';
import colors from 'colors';
import cheerio from 'cheerio';

fs.readFile('src/index.html', 'utf8', function (err,data) {
  if (err) return console.log(err);

  const $ = cheerio.load(data);

  //since a separate spreadsheet is only utilized for the production build, need to dynamically add this here.
  $('head').prepend('<link rel="stylesheet" href="styles.css">');

  const trackJsCode = "\n<script>window._trackJs = { token: '69ff2d61429a4c5da881a2026decd7d7' };</script><script src=https://d2zah9y47r7bi2.cloudfront.net/releases/current/tracker.js></script>";

  //add TrackJS tracking code to the top of <head> as suggested in their docs.
  $('head').prepend(trackJsCode);

  fs.writeFile('dist/index.html', $.html(), 'utf8', function (err) {
    if (err) return console.log(err);
    console.log('index.html written to /dist'.green);
  });
});
