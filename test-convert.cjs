const sass = require('sass');

const colors = [
  'rgb(246, 246, 246)',
  'rgb(193, 118, 255)',
  'rgb(85, 141, 245)',
  'rgb(209, 60, 52)',
  'rgb(17, 17, 17)'
];

colors.forEach(color => {
  try {
    const source = "@use 'sass:color'; .test { color: color.to-space(" + color + ", oklch); }";
    const result = sass.compileString(source);
    const match = result.css.match(/color: (.*?);/);
    if (match) {
        console.log(color + " -> " + match[1]);
    } else {
        console.log(color + " -> No match in CSS");
    }
  } catch (e) {
    console.log(color + " -> Failed: " + e.message);
  }
});
