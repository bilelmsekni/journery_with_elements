const concat = require('concat');

(async function build() {
  const files = [
    './dist/elements/styles.js',
    './dist/elements/runtime.js',
    './dist/elements/polyfills.js',
    './dist/elements/scripts.js',
    './dist/elements/main.js'
  ];
  await concat(files, './dist/elements/reservation-form.bundle.js');
})();
