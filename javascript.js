let currentColor = "#000000";
let paintChosen = true;

// Create a grid square
function createGridSquare() {
    const gridSquare = document.createElement("div");
    gridSquare.classList.add("gridSquare");
    return gridSquare;
}

// Create the initial grid
function initialGrid() {
    const container = document.querySelector("#container");
    container.style.width = `750px`;

    // Create 225 squares
    for (let i = 0; i < 225; i++) {
        const square = createGridSquare();
        container.appendChild(square);
    }
}

// Initialize the grid
initialGrid();

const gridSizeButton = document.querySelector("#grid-size");
gridSizeButton.addEventListener("click", deleteGridSquares);
gridSizeButton.addEventListener("click", setGridSize);

function deleteGridSquares() {
    document
        .querySelectorAll(".gridSquare")
        .forEach((square) => square.remove());
}

function setGridSize() {
    let gridSize = prompt(
        "How many squares per side would you like the grid to have? (Max 100x100)"
    );

    // Validate input
    gridSize = parseInt(gridSize);
    if (isNaN(gridSize) || gridSize > 100 || gridSize < 1) {
        alert("Please enter a number between 1 and 100");
        return;
    }

    const container = document.querySelector("#container");

    // Set the container width to force wrapping at the right point
    // 50px per square × number of squares per side
    container.style.width = `${gridSize * 50}px`;

    // Create the grid squares
    const totalSquares = gridSize * gridSize;
    for (let i = 0; i < totalSquares; i++) {
        const square = createGridSquare();
        container.appendChild(square);
    }

    initializeTracking();
}

// Mouse Tracking Section
// Enables detection of the mouse entering and exiting the grid
// and its squares, and "painting" them.

// Get all grid squares
const allGridSquares = document.querySelectorAll(".gridSquare");

// Grid detects mouse entry, initializes tracking
const gridContainer = document.querySelector("#container");
gridContainer.addEventListener("mouseenter", initializeTracking);

// Add event listeners to all squares to set the paint mode
function initializeTracking() {
    updatePaintMode();
}

// ===================================

// Paint Modes: user-chosen or random

// Paints squares the specified color
function paintChosenColor(event) {
    event.target.style.backgroundColor = currentColor;
}

// Paints squares a random color
function paintRandomColors(event) {
    event.target.style.backgroundColor = getRandomColor();
}

function getRandomColor() {
    const hexColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${hexColor}`;
}

// Color Style Toggle
const toggleRandom = document.getElementById("toggleRandom");

function updatePaintMode() {
    const allGridSquares = document.querySelectorAll(".gridSquare");

    // First remove both types of event listeners to start fresh
    allGridSquares.forEach((square) => {
        square.removeEventListener("mouseenter", paintChosenColor);
        square.removeEventListener("mouseenter", paintRandomColors);
    });

    // Add the appropriate event listener based on current mode
    allGridSquares.forEach((square) => {
        if (paintChosen) {
            square.addEventListener("mouseenter", paintChosenColor);
            toggleRandom.textContent = "Switch to Random Colors";
        } else {
            square.addEventListener("mouseenter", paintRandomColors);
            toggleRandom.textContent = "Switch to Chosen Color";
        }
    });
}

toggleRandom.addEventListener("click", () => {
    paintChosen = !paintChosen; // Toggle the mode
    updatePaintMode(); // Update event listeners
});

// Color Picker
const colorPicker = document.getElementById("colorPicker");

function getContrastColor(hexcolor) {
    const r = parseInt(hexcolor.slice(1, 3), 16);
    const g = parseInt(hexcolor.slice(3, 5), 16);
    const b = parseInt(hexcolor.slice(5, 7), 16);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#000000" : "#ffffff";
}

function handleColorChange(event) {
    const newColor = event.target.value;
    console.log("Color picker value:", newColor);
    currentColor = newColor;

    // Add your custom color handling function here
    onColorChange(newColor);
}

function onColorChange(color) {
    currentColor = color;
    console.log("Selected color:", color);
}

colorPicker.addEventListener("input", handleColorChange);

// =======================

// Toggle the grid lines
const gridLinesButton = document.getElementById("toggleGrid");
gridLinesButton.addEventListener("click", () => {
    const allGridSquares = document.querySelectorAll(".gridSquare");
    allGridSquares.forEach((square) => {
        square.classList.toggle("gridLines");
    });
});

// ========================================================
