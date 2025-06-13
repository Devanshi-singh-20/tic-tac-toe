let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new");
let winnerDiv = document.querySelector(".winner");
let msg = document.querySelector("#msg");

let turnO = true;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Function to reset the game state
const resetGame = () => {
  turnO = true;
  enableBoxes();
  winnerDiv.classList.add("hide");
  msg.innerText = "";
};

// Disable all boxes (used after win)
const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

// Enable all boxes and clear text
const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

// Show winner message and disable game
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}!`;
  winnerDiv.classList.remove("hide");
  disableBoxes();
};

// Check if someone won after each move
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
      showWinner(pos1Val);
      return true;
    }
  }
  return false;
};

// Add event listeners for all boxes
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "" && winnerDiv.classList.contains("hide")) {
      box.innerText = turnO ? "O" : "X";
      box.disabled = true;
      if (!checkWinner()) {
        turnO = !turnO;
      }
    }
  });
});

// Event listeners for reset buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

// Initial setup
resetGame();
