let currentPlayer = "X";
const squares = document.querySelectorAll(".square")

const possibleWinConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function changePlayer()
{
    if (currentPlayer === "X") 
    {
        currentPlayer = "O";
    }
    else
    {
        currentPlayer = "X";
    }
}

function checkWin()
{
    
}

function squareClicked(event)
{
    const square = event.target;

    fillSquare(square);
    changePlayer();
}

function fillSquare(square)
{
    square.innerHTML = currentPlayer;
}

document.querySelectorAll(".square").forEach(square => square.addEventListener("click", squareClicked));