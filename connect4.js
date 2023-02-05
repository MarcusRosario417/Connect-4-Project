/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6; // change both to CONST for strict dimensions

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x]) change both to let

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) { // for loop to create row of y axis up to value of 6
    board.push(Array.from({ length: WIDTH })); // pushing said array of created row to the length of the board (WIDTH)
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const board = document.getElementById('board'); // variable is accessed by it's HTML ID

  // Making columns for the board, clickable area at the top to drop pieces
  const top = document.createElement("tr"); // change VAR to CONST, top row is generated with createElement
  top.setAttribute("id", "column-top"); //setting an ID on that value "column-top"
  top.addEventListener("click", handleClick); // add an eventListener for that responds to a click

  for (let x = 0; x < WIDTH; x++) { // change VAR to LET, creating a for loop to create the x axis up to the value of 7
    const headCell = document.createElement("td"); // a varialbe created that represents a table-data element being created, which will hold our Connect 4 piece
    headCell.setAttribute("id", x); // add an ID of 'x' to headCell
    top.append(headCell); // APPENED the headCell to the top of the board
  }
  
  board.append(top); // APPEND the board and top variable, change htmlBoard to board

  // Making the main board, height width and coordinates with table-row and table-data attributes
  for (let y = 0; y < HEIGHT; y++) { // for loop to create the height of the board up to the value of 6
    const row = document.createElement("tr"); // CONST variable to create a table-row element

    for (let x = 0; x < WIDTH; x++) { // for loop to create the width of the board up to the value of 7
      const cell = document.createElement("td"); // cell variable to create a table-data element, where our data will be stored
      cell.setAttribute("id", `${y}-${x}`); // setting the attribute on the X and Y coordinate of the table for an EXACT box
      row.append(cell); // appending that cell with a coordinate to the row
    }
    board.append(row); // append the row with all of it's data to the board
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for(let y = HEIGHT - 1; y>= 0; y--){ // for loop to drop the piece down one spot at a time until it cannot drop anymore
    if(!board[y][x]){ // if it cannot drop in the coordinate,
      return y; // ... return to the spot above
    }
  }
  return null; // otherwise, return null
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement('div'); // creating the div
  piece.classList.add('piece'); // creating a piece in the div
  piece.classList.add(`p${currPlayer}`); // adding the piece by the current player's turn
  piece.style.top = -50 * (y + 2); // ???

  const spot = document.getElementById(`${y}-${x}`); // variable created for spot with an exact X and Y coordinate
  spot.append(piece); // APPENDING the PIECE to the SPOT

}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id; // change VAR to CONST

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x); // change VAR to CONST
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer; 
  placeInTable(y, x); // piece being placed in table

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`); // if a win is detected, return this
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  
  if (board.every(row => row.every(cell => cell))) {
    return endGame("It's a tie!");
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1; 
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer // ???
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; // a horizontal win scanning from left to right
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; //a vertical win scanning from bottom to top
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; // a diagonal win scanning from left to right
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; // a diagonal win scanning from right to left

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) { // find the winner by searching for any of these
        return true; 
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
