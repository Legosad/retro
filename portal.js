const rows = 6;
const cols = 6;
const mazeElement = document.getElementById("maze");
// const untitledElement = document.getElementById("untitled");
const mazeStyle = document.getElementById("mazestyle");
// const mainStyle = document.getElementById("mainstyle");

document.documentElement.style.setProperty("--rows", rows);
document.documentElement.style.setProperty("--cols", cols);

class Maze {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.grid = this.createGrid();
    this.current = this.grid[0][0];
    this.stack = [];
  }

  createGrid() {
    const grid = [];
    for (let r = 0; r < this.rows; r++) {
      const row = [];
      for (let c = 0; c < this.cols; c++) {
        row.push(new Cell(r, c));
      }
      grid.push(row);
    }
    return grid;
  }

  drawGrid() {
    mazeElement.innerHTML = "";
    this.grid.forEach((row) => {
      row.forEach((cell) => {
        cell.updateElement();
        mazeElement.appendChild(cell.element);
      });
    });
  }

  getUnvisitedNeighbors(cell) {
    const { row, col } = cell;
    const neighbors = [];

    if (row > 0 && !this.grid[row - 1][col].visited)
      neighbors.push(this.grid[row - 1][col]);
    if (row < this.rows - 1 && !this.grid[row + 1][col].visited)
      neighbors.push(this.grid[row + 1][col]);
    if (col > 0 && !this.grid[row][col - 1].visited)
      neighbors.push(this.grid[row][col - 1]);
    if (col < this.cols - 1 && !this.grid[row][col + 1].visited)
      neighbors.push(this.grid[row][col + 1]);

    return neighbors;
  }

  removeWalls(a, b) {
    const x = a.col - b.col;
    if (x === 1) {
      a.walls.left = false;
      b.walls.right = false;
    } else if (x === -1) {
      a.walls.right = false;
      b.walls.left = false;
    }

    const y = a.row - b.row;
    if (y === 1) {
      a.walls.top = false;
      b.walls.bottom = false;
    } else if (y === -1) {
      a.walls.bottom = false;
      b.walls.top = false;
    }

    a.updateElement();
    b.updateElement();
  }

  async generateMaze() {
    this.current.visited = true;
    this.drawGrid();

    while (true) {
      const unvisitedNeighbors = this.getUnvisitedNeighbors(this.current);

      if (unvisitedNeighbors.length > 0) {
        const next =
          unvisitedNeighbors[
            Math.floor(Math.random() * unvisitedNeighbors.length)
          ];
        this.stack.push(this.current);
        this.removeWalls(this.current, next);
        this.current = next;
        this.current.visited = true;
      } else if (this.stack.length > 0) {
        this.current = this.stack.pop();
      } else {
        let found = false;
        for (let r = 0; r < this.rows; r++) {
          for (let c = 0; c < this.cols; c++) {
            if (!this.grid[r][c].visited) {
              const neighbors = this.getUnvisitedNeighbors(this.grid[r][c]);
              if (neighbors.length < 4) {
                this.current = this.grid[r][c];
                this.current.visited = true;
                found = true;
                break;
              }
            }
          }
          if (found) break;
        }
        if (!found) break;
      }

      this.drawGrid();
      await new Promise((r) => setTimeout(r, 10)); // Adjust speed here
    }

    // Change content and stylesheet after maze generation
    // mazeStyle.disabled = true;
    // mainStyle.disabled = false;
    mazeElement.style.display = "none";
    // untitledElement.style.display = "block";

    // Apply class to body for main page styles
    document.body.classList.add("third-page");
  }
}

class Cell {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.visited = false;
    this.walls = { top: true, right: true, bottom: true, left: true };
    this.element = document.createElement("div");
    this.element.classList.add("cell");
  }

  updateElement() {
    this.element.style.borderTop = this.walls.top ? "1px solid #444" : "none";
    this.element.style.borderRight = this.walls.right
      ? "1px solid #444"
      : "none";
    this.element.style.borderBottom = this.walls.bottom
      ? "1px solid #444"
      : "none";
    this.element.style.borderLeft = this.walls.left ? "1px solid #444" : "none";
    this.element.classList.toggle("visited", this.visited);
  }
}
function replaceState() {
  const state = { page: "untitled", showHomePage: true };
  history.replaceState(state, "", "untitled.html");
}

const mazeInstance = new Maze(rows, cols);
mazeInstance.drawGrid();
mazeInstance.generateMaze();
setTimeout(() => {
  replaceState();
  window.location.href = "untitled.html";
}, 1000);
