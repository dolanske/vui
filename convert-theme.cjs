const sass = require('sass');
const fs = require('fs');

const content = fs.readFileSync('src/style/theme.scss', 'utf8');
const lines = content.split('\n');

const tokens = [];
lines.forEach(line => {
  const match = line.match(/^\s+(--[\w-]+):\s+(rgb\(\d+,\s*\d+,\s*\d+\));/);
  if (match) {
    tokens.push({ name: match[1], value: match[2] });
  }
});

tokens.forEach(token => {
  try {
    const source = "@use 'sass:color'; .test { color: color.to-space(" + token.value + ", oklch); }";
    const result = sass.compileString(source);
    const match = result.css.match(/color: (.*?);/);
    if (match) {
        let oklch = match[1];
        // Check for 0 chroma
        const chromaMatch = oklch.match(/oklch\(\d+(\.\d+)?%?\s+([\d\.]+)/);
        let note = "";
        if (chromaMatch && parseFloat(chromaMatch[2]) === 0) {
            note = " [Neutral]";
        }
        console.log(token.name + ": " + oklch + note);
    }
  } catch (e) {
    console.log(token.name + ": Failed - " + e.message);
  }
});
