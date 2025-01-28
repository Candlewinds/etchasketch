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

const gridSizeButton = document.querySelector("#grid-size")
gridSizeButton.addEventListener('click', deleteGridSquares);
gridSizeButton.addEventListener('click', setGridSize);

function deleteGridSquares() {
    document.querySelectorAll(".gridSquare").forEach(square => square.remove());
}

function setGridSize() {
    let gridSize = prompt("How many squares per side would you like the grid to have? (Max 100x100)");
    
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

// Add event listeners to all squares
function initializeTracking() {
    const allGridSquares = document.querySelectorAll(".gridSquare");

    allGridSquares.forEach((square) => {
        square.addEventListener("mouseenter", paintSquares);
    });
}

// Grid detects mouse exit, deactivates tracking
function deactivateTracking() {
    allGridSquares.forEach((square) => {
        square.removeEventListener("mouseenter", paintSquares);
    });
}
gridContainer.addEventListener("mouseleave", deactivateTracking);


// Paints squares a random color
function paintSquares(event) {
    event.target.style.backgroundColor = getRandomColor();
}

function getRandomColor() {
    const hexColor = Math.floor(Math.random()*16777215).toString(16);
    return `#${hexColor}`;
}

// Toggle the grid lines
const gridLinesButton = document.getElementById("toggleGrid");
gridLinesButton.addEventListener("click", () => {
    const allGridSquares = document.querySelectorAll(".gridSquare");
    allGridSquares.forEach(square => {
        square.classList.toggle('gridLines');
    });
});
