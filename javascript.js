// Create the grid squares and assign them to columns
function addGridSquare() {
    const gridSquare = document.createElement("div");
    gridSquare.textContent = "Grid Square";
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
    for (let i = 0; i < 16; i++) {
        addGridSquare();
    }
}

function handleMouseEnter(event) {
    console.log("Mouse entered square");
}

function handleMouseMove(event) {
    console.log("Mouse moving in square");
}

function handleMouseLeave(event) {
    console.log("Mouse left square");
}

// Initialize the grid
initialGrid();

// Add event listeners to all squares
const allGridSquares = document.querySelectorAll(".gridSquare");
allGridSquares.forEach((square) => {
    square.addEventListener("mouseenter", handleMouseEnter);
    square.addEventListener("mousemove", handleMouseMove);
    square.addEventListener("mouseleave", handleMouseLeave);
});
