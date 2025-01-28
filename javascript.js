// Create the grid squares and assign them to columns
function addGridSquare() {
    const gridSquare = document.createElement("div");
    // gridSquare.textContent = "Grid Square";
    gridSquare.classList.add("gridSquare");

    // Find all columns
    const columns = document.querySelectorAll(".col");

    // Distribute to the column with the fewest children
    let targetColumn = columns[0];
    for (let col of columns) {
        if (col.children.length < targetColumn.children.length) {
            targetColumn = col;
        }
    }

    // Append the new square to the target column
    targetColumn.appendChild(gridSquare);
}

// Add the initial grid squares
function initialGrid() {
    for (let i = 0; i < 256; i++) {
        addGridSquare();
    }
}

// Initialize the grid
initialGrid();

// NodeList for grid squares
const allGridSquares = document.querySelectorAll(".gridSquare");

// Grid detects mouse entry, initializes tracking
const gridContainer = document.querySelector("#container");
gridContainer.addEventListener("mouseenter", initializeTracking);

// Add event listeners to all squares
function initializeTracking() {
    allGridSquares.forEach((square) => {
        square.addEventListener("mouseenter", handleMouseEnter);
        square.addEventListener("mousemove", handleMouseMove);
        square.addEventListener("mouseleave", handleMouseLeave);
    });
}

// Grid detects mouse exit, deactivates tracking
gridContainer.addEventListener("mouseleave", deactivateTracking);
function deactivateTracking() {
    allGridSquares.forEach((square) => {
        square.removeEventListener("mouseenter", handleMouseEnter);
        square.removeEventListener("mousemove", handleMouseMove);
        square.removeEventListener("mouseleave", handleMouseLeave);
    });
}

// Tracks the mouse through the grid, turning them random colors as it enters
function handleMouseEnter(event) {
    event.target.style.backgroundColor = getRandomColor();
    console.log("Mouse entered square");
}

function handleMouseMove(event) {
    console.log("Mouse moving in square");
}

function handleMouseLeave(event) {
    console.log("Mouse left square");
}

// Function to get a random color
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}
