const fs = require('node:fs');

// Parse the logo svg file
const logo = fs.readFileSync('logo.json', 'utf8');
const data = JSON.parse(logo);
console.log(data);
const gs = data.svg.g;

const out = [];

gs.forEach(g => {
  //console.log(g);
  g.g.forEach(gg => {
    console.log(gg);
    const {x ,y} = getXYFromMatrix(gg._transform);
    const pixel = {
      x: parseInt(gg.rect._x) + x,
      y: parseInt(gg.rect._y) + y,
    }
    console.log(pixel);
    out.push(pixel);
  });
});

// Write the output to a file
fs.writeFileSync('logo_converted.json', JSON.stringify(out, null, 2));


function getXYFromMatrix(matrixString) {
  // Use a regular expression to extract the numbers in the matrix
  const match = matrixString.match(/matrix\(([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^\)]+)\)/);

  if (match) {
      const x = parseInt(match[5]);
      const y = parseInt(match[6]);
      return { x, y };
  } else {
      return null; // Return null if the string doesn't match the expected format
  }
}
