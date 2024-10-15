const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

const engine = Engine.create();

// create a renderer
const render = Render.create({
  element: document.body,
  engine: engine
});

// Find the number of rows and columns in the grid
const dimensions = getGridDimensions();

// Fill in a random color in a random cell
for (let i = 0; i < dimensions.rows; i++) {
  for (let j = 0; j < dimensions.columns; j++) {
    const div = document.createElement('div');
    div.className = 'grid-item';
    div.style.backgroundColor = colorsLight[Math.floor(Math.random() * colorsLight.length)].hex;
    document.body.appendChild(div);
  }
}

// Define the logo placement
const maxX = Math.max(...logo.map(coord => coord.x));
const maxY = Math.max(...logo.map(coord => coord.y));
const origoX = Math.floor(dimensions.columns / 2) - Math.floor(maxX / 2);
const origoY = Math.floor((dimensions.rows - maxY) / 2);

const grid = document.body;
logo.forEach(coord => {
  const div = document.createElement('div');
  div.className = 'grid-item logo-item';
  div.style.backgroundColor = colorsDark[Math.floor(Math.random() * colorsLight.length)].hex;
  div.style.gridRow = `${origoY + coord.y} / ${origoY + coord.y + 1}`;
  div.style.gridColumn = `${origoX + coord.x} / ${origoX + coord.x + 1}`;
  grid.appendChild(div);
});

// Define the contact icon
const maxEnvX = Math.max(...envelope.map(coord => coord.x));
const maxEnvY = Math.max(...envelope.map(coord => coord.y));
const origoEnvX = dimensions.columns - maxEnvX - 14;
const origoEnvY = dimensions.rows - maxEnvY - 4;

// Make the full envelope clickable by adding classes to the elements
for (let i = 0; i < maxEnvY; i++) {
  for (let j = 0; j < maxEnvX; j++) {
    const div = document.createElement('div');
    div.className = 'contact-item';
    div.style.gridRow = `${origoEnvY + i} / ${origoEnvY + i + 1}`;
    div.style.gridColumn = `${origoEnvX + 10 + j} / ${origoEnvX + 10 + j + 1}`;
    grid.appendChild(div);
  }
}

envelope.forEach(coord => {
  const div = document.createElement('div');
  div.className = 'grid-item contact-item';
  div.style.gridRow = `${origoEnvY + coord.y} / ${origoEnvY + coord.y + 1}`;
  div.style.gridColumn = `${origoEnvX + coord.x + 10} / ${origoEnvX + coord.x + 11}`;
  grid.appendChild(div);
});

// Wait for ten secons before startging the animation
setTimeout(() => {
  animateElements();
}, 1000);

function animateElements() {
  const items = document.querySelectorAll('.logo-item');
  // Get a random item
  const randomIndex = Math.floor(Math.random() * items.length);
  const randomItem = items[randomIndex];
  randomItem.style.backgroundColor = 'black';
  // Wait for 50 before calling the function again
  setTimeout(() => {
    animateElements();
  }, 50);
}

function getGridDimensions() {
  // Assuming each grid cell is 10px by 10px
  const gridSize = 5;

  // Get the width and height of the viewport
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Calculate the number of columns and rows
  const columns = Math.floor(viewportWidth / gridSize);
  const rows = Math.floor(viewportHeight / gridSize);

  return { rows, columns };
}

// Select all elements with the class 'contact-item'
const contactItems = document.querySelectorAll('.contact-item');

// Loop through each element and add the event listener
contactItems.forEach(contactItem => {
  contactItem.addEventListener('click', () => {
    window.location.href = 'mailto:post@eftf.no';
  });
});
