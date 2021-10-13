var mineCount = 0;
var start = false
var gameOver = false;
var condition = "";
var canFlag = true; // No flag mode; function would toggle this,

var dummyArray = [
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false]
];
// if cell is a mine
var rM =  [
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false]
];
// if cell is revealed
var rR =  [
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false]
];

var adjacency = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var flagged = [
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false]
];

var checkeed = [
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false]
];

var mX = [
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false]
]

function clickIt(x) {
  if (start == false) {
    var r = parseInt((x - 1)/10);
    var c = (x - 1)%10;
    mX[r][c] = true; // OH MY GOD I LITERALLY SOLVED THE PROBLEM IN THE G DANG SHOWER AAAAAAA I JUST HAD TO MAKE IT NOT REVEAL AAAAAA
    if (r != 0) { // making the adjacent ones also revealed so they aren't mines
      if (c != 0) { rR[r - 1][c - 1] = true; } // top left
      if (c != 9) { rR[r - 1][c + 1] = true; } // top right
      rR[r - 1][c] = true; // top
    }
    if (r != 9) {
      if (c != 0) { rR[r + 1][c - 1] = true; } // bottom left
      if (c != 9) { rR[r + 1][c + 1] = true; } // bottom right
      rR[r + 1][c] = true;
    }
    if (c != 0) { rR[r][c - 1] = true; } // left
    if (c != 9) { rR[r][c + 1] = true; } // right
    begin();
    check();
  }
  reveal(x);
}

function reveal(x) { // My problem is that the 0 adjacency ones don't cause a chain reaction by giving the neighboring ones rR = true. The reveal works fully.
  var colQ = (x - 1) % 10; // Maybe ask Mr. Ringenberg for help if he's not busy
  var rowQ = (parseInt((x - 1)/10));
  // rR[rowQ][colQ]; // The coords of the clicked square: simple and easy
  if (rR[rowQ][colQ] == false & flagged[rowQ][colQ] == false & gameOver == false) {
    document.getElementById(rowQ + "-" + colQ).classList.remove("unrevealed");
    document.getElementById(rowQ + "-" + colQ).classList.add("revealed");
    rR[rowQ][colQ] = true;
    for (var i = 0; i < 10; i++) { // not great code, but it's a fine placeholder
      for (var r = 0; r < 10; r++) { // comment out after
        for (var c = 0; c < 10; c++) {
          if (rR[r][c] == true & adjacency[r][c] == 0 & rM[r][c] == false) {
            if (r != 0) {
              if (c != 0) { rR[r - 1][c - 1] = true; } // up left
              if (c != 9) { rR[r - 1][c + 1] = true; } // up right
              rR[r - 1][c] = true; // up
            }
            if (r != 9) {
              if (c != 0) { rR[r + 1][c - 1] = true; } // down left
              if (c != 9) { rR[r + 1][c + 1] = true; } // down right
              rR[r + 1][c] = true; // down
            }
            if (c != 0) { rR[r][c - 1] = true; } // left
            if (c != 9) { rR[r][c + 1] = true; } // right
          }
        }
      }
    }
  }
  check();
  runCount();
}

function begin() {
  var minesLeft = 10; // Use when placing the mines, ie put it on repeat, with each spot having like a 10.1% chance of placing
  /* Original Choice while (minesLeft > 0), choose a random mine. if it's revealed (ie the first mine chosen) or already a mine, don't do anything, but if it is, subtract minesLeft by 1
  */
  while (minesLeft > 0) {
    var chance = Math.floor(Math.random() * 100);
    var chancD = parseInt(chance/10);
    if (rR[chancD][chance % 10] == false & rM[chancD][chance % 10] == false & mX[chancD][chance % 10] == false) {
      rM[chancD][chance % 10] = true;
      minesLeft--;
    }
  } //
  start = true;
  // if (surrounding tile is a mine, add one to display number)
  for (var r = 0; r < 10; r++) { // Row or column, checking for adjacency; row one (0) and ten (9) will do a different check, since they have less adjacency
    if (r != 0) { // maybe if r != 0, and then another if r != 9 that each have the excluded values that the thing can't have, same for the columns
      for (var c = 0; c < 10; c++) {
        if (c != 0) {
          if (rM[r - 1][c - 1]) { adjacency[r][c]++; } // up and left one
        }
        if (c != 9) {
          if (rM[r - 1][c + 1]) { adjacency[r][c]++; } // up and right one
        }
        if (rM[r - 1][c]) { adjacency[r][c]++; } // up one
      }
    }
    if (r != 9) {
    for (var c = 0; c < 10; c++) {
      if (c != 0) { // farthest left
        if (rM[r + 1][c - 1]) { adjacency[r][c]++; } // down and left one
      }
      if (c != 9) { // farthest right
        if (rM[r + 1][c + 1]) { adjacency[r][c]++; } // down and right one
      }
        if (rM[r + 1][c]) { adjacency[r][c]++; } // down one
      }
    }
    for (var c = 0; c < 10; c++) {
      if (c != 0) {
        if (rM[r][c - 1]) { adjacency[r][c]++; } // left one
      }
      if (c != 9) {
        if (rM[r][c + 1]) { adjacency[r][c]++; } // right one
      }
    }
  }
  for (var r = 0; r < 10; r++) { // Checking the distribution of the mines and numbers and adding the classes
    for (var c = 0; c < 10; c++) {
      console.log(adjacency[r][c]);
      // document.getElementById(r + "-" + c).innerHTML = adjacency[r][c];
      document.getElementById(r + "-" + c).classList.add("a" + adjacency[r][c]);
      if (rM[r][c] == true) {
        // document.getElementById(r + "-" + c).innerHTML = "M";
        document.getElementById(r + "-" + c).classList.add("mine");
      }
    }
  }
}

function flag(x) {
  var colQ = (x - 1) % 10;
  var rowQ = parseInt((x - 1) / 10);
  if (rR[rowQ][colQ] == false & gameOver == false & canFlag) {
    if (flagged[rowQ][colQ] == false) {
      document.getElementById(rowQ + "-" + colQ).classList.add("flagged");
      flagged[rowQ][colQ] = true;
    } else if (flagged[rowQ][colQ] == true) {
      document.getElementById(rowQ + "-" + colQ).classList.remove("flagged");
      flagged[rowQ][colQ] = false;
    }
  }
}

function revealM() {
  for (var r = 0; r < 10; r++) {
    for (var c = 0; c < 10; c++) {
      if (rM[r][c]) {
        if (condition == "won") {
          document.getElementById(r + "-" + c).classList.add("cleared")
        } else if (flagged[r][c] == false) {
          document.getElementById(r + "-" + c).innerHTML = "⦻";
        } else if (flagged[r][c]) {
          document.getElementById(r + "-" + c).classList.add("Tcleared");
        }
      } else if (flagged[r][c]) {
        document.getElementById(r + "-" + c).classList.add("wrong");
      }
    }
  }
}

function checkAll() {
  for (var r = 0; r < 10; r++) { // Checking the distribution of the mines and numbers and adding the classes
    for (var c = 0; c < 10; c++) {
      document.getElementById(r + "-" + c).innerHTML = adjacency[r][c];
      if (rM[r][c] == true) {
        document.getElementById(r + "-" + c).innerHTML = "M";
      }
    }
  }
}

function check() {
  var checkd = true;
  while (checkd) {
    checkd = false;
    for (var r = 0; r < 10; r++) { // Checking the distribution of the mines and numbers and adding the classes
      for (var c = 0; c < 10; c++) {
        if (rR[r][c] & checkeed[r][c] == false) {
          if (adjacency[r][c] != 0) {
            document.getElementById(r + "-" + c).innerHTML = adjacency[r][c];
          } else {
            document.getElementById(r + "-" + c).innerHTML = "";
          }
          checkeed[r][c] = true
          checkd = true;
          if (rM[r][c]) {
            condition = "lost";
            endGame();
          }
        }
      }
    }
  }
}

function endGame() {
  revealM();
  gameOver = true;
}

function runCount() {
  var count = 0;
  for (var r1 = 0; r1 < 10; r1++) {
    for (var c1 = 0; c1 < 10; c1++) {
      if (rR[r1][c1] == false) {
        count++;
      }
    }
  }
  if (count == 10 & condition != "lost") {
    condition = "won";
    endGame();
  }
  // Check every tile, if there's exactly 10 tiles left, trigger endGame(), and a variable "won"
  // Increment for every tile that's unrevealed, if there's more than 10, continue, if not, endGame
}

function redundancy() {
  for (var r = 0; r < 10; r++) {
    for (var c = 0; c < 10; c++) {
      if (adjacency[r][c] == 0 & rM[r][c] == false) {
        rR[r][c] = true;
      }
    }
  }
  check();
}

function diff(x, y, z) { // Mines, width, height
  var emptyArray = [];
  for (var i = 0; i < y; i++) {
    emptyArray.push(false);
  }
  // adjacency = Number(emptyArray); // Number method converts non-numbers to numbers, if possible (otherwise to NaN, which is still a number)
  mineCount = x;
  // Create array with width y and height z
  // Set all arrays to that same height and width; rR, rM, adjacency (different because of number values), flagged, and checkeed
  var yummyArray = [];
  for (var i = 0; i < z; i++) {
    yummyArray.push(emptyArray);

  }
  alert(yummyArray);
}

function flagMode() {
  if (start == false) {
    canFlag = !canFlag;
    if (canFlag == false) {
      document.getElementById("flagDiv").innerHTML = "Flags Disabled";
    } else {
      document.getElementById("flagDiv").innerHTML = "Flags Enabled";
    }
  }
}

/* Could also use mods to determine a given cell's column by making the x an int instead of a string
*  ie using 44. if (x > 10, 20, 30, 40) { row = 4; } if (x % 10 == 4) { col = 4; }
*  although really I don't need that since I know 44 will be adjacent to 33, 34, 35, 43, 45, 53, 54, and 55.
*
*/

/* I can use this function to determine if a tile needs to be revealed each time. Check if a tile is adjacent to both an unrevealed and 0 adjacency tile (adjacent tile has to be both, not one of each).

Or, basically run the double for loop that checks every tile every time a new one is clicked. Something like that. If adjacent to a revealed 0 adjacent title, reveal it

1. Check if it's adjacent to the two qualities (a tile that's adjacent AND revealed)
2. Make it revealed
3. Loop step 2 until everything is done (maybe like a counter of some sorts each time, every time a reveal happens set didReveal to true, then when it's false, end the function)
4. Actually reveal all tiles with the revealed class/rR var (class or adjacency variable to show)
Okay this freezes the site so instead:

1. Check each thing, and if it's revealed and adjacency 0, reveal the tiles next to it
2. Loop until it's done
3. Actually reveal all tiles

for (var r = 0; r < 10; r++) { // Row or column, checking for adjacency; row one (0) and ten (9) will do a different check, since they have less adjacency
  if (r != 0) { // maybe if r != 0, and then another if r != 9 that each have the excluded values that the thing can't have, same for the columns
    for (var c = 0; c < 10; c++) {
      if (c != 0) {
        if (adjacency[r - 1][c - 1] == 0) { adjacency[r][c]++; } // up and left one
      }
      if (c != 9) {
        if (adjacency[r - 1][c + 1] == 0) { adjacency[r][c]++; } // up and right one
      }
      if (adjacency[r - 1][c]) { adjacency[r][c]++; } // up one
    }
  }
  if (r != 9) {
  for (var c = 0; c < 10; c++) {
    if (c != 0) { // farthest left
      if (adjacency[r + 1][c - 1]) { adjacency[r][c]++; } // down and left one
    }
    if (c != 9) { // farthest right
      if (adjacency[r + 1][c + 1]) { adjacency[r][c]++; } // down and right one
    }
      if (adjacency[r + 1][c]) { adjacency[r][c]++; } // down one
    }
  }
  for (var c = 0; c < 10; c++) {
    if (c != 0) {
      if (adjacency[r][c - 1] == 0) { adjacency[r][c]++; } // left one
    }
    if (c != 9) {
      if (adjacency[r][c + 1]) { adjacency[r][c]++; } // right one
    }
  }
}

*/
/* Better version of the freezer

for (var r = 0; r < 10; r++) { // comment out later
  for (var c = 0; c < 10; c++) {
    if (rR[r][c] == true & adjacency[r][c] == 0) {
      if (r != 0) {
        if (c != 0) {
          rR[r - 1][c - 1] = true; // up left
        }
        if (c != 9) {
          rR[r - 1][c + 1] = true; // up right
        }
        rR[r - 1][c] = true; // up
      }
      if (r != 9) {
        if (c != 0) {
          rR[r + 1][c - 1] = true; // down left
        }
        if (c != 9) {
          rR[r + 1][c + 1] = true; // down right
        }
        rR[r + 1][c] = true; // down
      }
      if (c != 0) {
        rR[r][c - 1] = true; // left
      }
      if (c != 9) {
        rR[r][c + 1] = true; // right
      }
    }
    if (rR[r][c]) {
      document.getElementById(r + "-" + c).classList.add("revealed");
      document.getElementById(r + "-" + c).classList.remove("unrevealed");
      checkR = true;
    }
  }
}
*/

/*

if (document.getElementById(r + "-" + c).classList.contains("revealed")) {
  document.getElementById(r "-" c).innerHTML = adjacency[r][c];
}

var prev = checked;
if (prev != checked) { // if the 2nd previous iteration equals the 1st previous iteration, then end the function, since there was no change in between
  prev = checked;
  ... (do stuff with checked)
}

*/

// New reveal function: I'm gonna try to rework the actual reveal part of the reveal system and see if it'll work
for (var i = 0; i < 10; i++) { // not great code, but it's a fine placeholder
  for (var r = 0; r < 10; r++) { // comment out after
    for (var c = 0; c < 10; c++) {
      if (rR[r][c] == true & adjacency[r][c] == 0) {
        if (r != 0) {
          if (c != 0) { rR[r - 1][c - 1] = true; } // up left
          if (c != 9) { rR[r - 1][c + 1] = true; } // up right
          rR[r - 1][c] = true; // up
        }
        if (r != 9) {
          if (c != 0) { rR[r + 1][c - 1] = true; } // down left
          if (c != 9) { rR[r + 1][c + 1] = true; } // down right
          rR[r + 1][c] = true; // down
        }
        if (c != 0) { rR[r][c - 1] = true; } // left
        if (c != 9) { rR[r][c + 1] = true; } // right
      }
    }
  }
}

/* Old code for reveal()

while (checkR == true) { // this'll just run forever because it re-reveals each tile over and over and doesn't ever stop
  checkR = false;
  for (var r = 0; r < 10; r++) { // comment out later
    for (var c = 0; c < 10; c++) {
      var prev = dummyArray;
      prev[9][9] = true;
      while (checked != prev) { // if previous iteration equals 2nd previous iteration
        prev = checked; // set at the beginning, so if no changes occur, end the cycle as above shown
        if (rR[r][c] == true & adjacency[r][c] == 0) {
          if (r != 0) {
            if (c != 0) {
              rR[r - 1][c - 1] = true; // up left
              checked[r - 1][c - 1] = true;
            }
            if (c != 9) {
              rR[r - 1][c + 1] = true; // up right
              checked[r - 1][c + 1] = true;
            }
            rR[r - 1][c] = true; // up
            checked[r - 1][c] = true;
          }
          if (r != 9) {
            if (c != 0) {
              rR[r + 1][c - 1] = true; // down left
              checked[r + 1][c - 1] = true;
            }
            if (c != 9) {
              rR[r + 1][c + 1] = true; // down right
              checked[r + 1][c + 1] = true;
            }
            rR[r + 1][c] = true; // down
            checked[r + 1][c] = true;
          }
          if (c != 0) {
            rR[r][c - 1] = true; // left
            checked[r][c - 1] = true;
          }
          if (c != 9) {
            rR[r][c + 1] = true; // right
            checked[r][c + 1] = true;
          }
          checkR = true;
        }
      }
      if (rR[r][c] == true & checked[r][c] == false) {
        document.getElementById(r + "-" + c).classList.add("revealed");
        document.getElementById(r + "-" + c).classList.remove("unrevealed");
        checked[r][c] = true;
      }
    }
  }
}
}
for (var r = 0; r > 10; r++) {
for (var c = 0; c > 10; c++) {
  if (rR[r][c]) {
    document.getElementById(r + "-" + c).innerHTML = adjacency[r][c]; // Why won't it !!!! It's supposed to reveal the identities of the revealed elements, but it won't
  }
}

*/
