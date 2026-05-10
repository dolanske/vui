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
    const result = sass.compileString(`
      @use 'sass:color';
      .test {
        color: color.to-space(${color}, oklch);
      }
    `);
    console.log(\`\${color} -> \${result.css.match(/color: (.*?);/)[1]}\`);
  } catch (e) {
    console.log(\`\${color} -> Failed: \${e.message}\`);
  }
});
