/*
You come across an experimental new kind of memory stored on an infinite two-dimensional grid.

Each square on the grid is allocated in a spiral pattern starting at a location marked 1 and then counting up while spiraling outward. For example, the first few squares are allocated like this:

17  16  15  14  13
18   5   4   3  12
19   6   1   2  11
20   7   8   9  10
21  22  23---> ...
While this is very space-efficient (no squares are skipped), requested data must be carried back to square 1 (the location of the only access port for this memory system) by programs that can only move up, down, left, or right. They always take the shortest path: the Manhattan Distance between the location of the data and square 1.

For example:

Data from square 1 is carried 0 steps, since it's at the access port.
Data from square 12 is carried 3 steps, such as: down, left, left.
Data from square 23 is carried only 2 steps: up twice.
Data from square 1024 must be carried 31 steps.
How many steps are required to carry the data from the square identified in your puzzle input all the way to the access port?
*/

function* gridLayout() {
  let x = 0,
    y = 0;
  while (true) {
    const highest = x;
    while (y < highest) {
      //Walk up
      yield [x, y];
      y++;
    }
    while (x > -highest) {
      //Walk left

      yield [x, y];
      x--;
    }
    while (y > -highest) {
      //Walk down
      yield [x, y];
      y--;
    }
    while (x < highest) {
      // Walk right
      yield [x, y];
      x++;
    }
      //step to next square
    yield [x, y];
    x++;
  }
}

grid = gridLayout();
let input = 265149;
let value = 1;
while (value < input) {
  grid.next();
  value++;
}
const coord = grid.next().value;
// Distance is manhattan distance
const distance = Math.abs(coord[0]) + Math.abs(coord[1]);
console.log("Part 1: ", value, coord, distance);

closestNeighbour = gridLayout();
grid = {};
let count = 0;
let newValue = 1;
while (newValue < input) {
  const coord = closestNeighbour.next().value;
  newValue = neighborsSum(coord) || 1;
  // Put the value on the grid
  grid[coord[0]] = grid[coord[0]] || {};
  grid[coord[0]][coord[1]] = newValue;
}
console.log("Part 2: ", newValue);

function neighborsSum([x, y]) {
  // List all neighbour values, filter undefined and sum.
  const gridVal = (x, y) => (grid[x] || [])[y] || undefined;
  return [
    gridVal(x - 1, y + 1),
    gridVal(x - 1, y),
    gridVal(x - 1, y - 1),
    gridVal(x, y + 1),
    gridVal(x, y - 1),
    gridVal(x + 1, y + 1),
    gridVal(x + 1, y),
    gridVal(x + 1, y - 1)
  ]
    .filter(v => v)
    .reduce((a, b) => a + b, 0);
}
