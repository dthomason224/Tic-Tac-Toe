let currentPlayer = "X";
let gameWon = false;
let xRecord = 0;
let oRecord = 0;

const squares = document.querySelectorAll(".square");
const turnDisplay = document.querySelector("#current");
const xWinDisplay = document.querySelector("#winsX");
const oWinDisplay = document.querySelector("#winsO");

const currentPlayerMessage = () => `Current Turn: ${currentPlayer}`;
const winMessage = () => `${currentPlayer} Won!`;
const drawMessage = () => "Draw!";
const xWinsMessage = () => `X Wins: ${xRecord}`;
const oWinsMessage = () => `O Wins: ${oRecord}`;

turnDisplay.innerHTML = currentPlayerMessage();
xWinDisplay.innerHTML = xWinsMessage();
oWinDisplay.innerHTML = oWinsMessage();

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
        turnDisplay.innerHTML = currentPlayerMessage();
    }
    else
    {
        currentPlayer = "X";
        turnDisplay.innerHTML = currentPlayerMessage();
    }
}

function checkWin(array, player)
{
    array.forEach(function(subArray)
    {
        let counter = 0;
        subArray.forEach(function(element)
        {
            if (squares[element].innerHTML === player) 
            {
                counter++;
                if (counter === 3) 
                {
                    gameWon = true;
                    alert("winner is " + player);
                }
            }
        });
    });
    if (gameWon === false) 
    {
        checkTie(squares);
    }
}

function checkTie(array)
{
    let drawCounter = 0;
    array.forEach(function(element)
    {
        if(element.innerHTML !== "")
        {
            drawCounter++;
            if (drawCounter === 9) 
            {
                alert("draw");    
            }
        }
    });
}

function squareClicked(event)
{
    const square = event.target;

    fillSquare(square);
}

function fillSquare(square)
{
    if(square.innerHTML !== "")
    {
        return;
    }
    square.innerHTML = currentPlayer;

    if (currentPlayer === "X") 
    {
        square.style.backgroundColor = "#993399";
    }
    else
    {
        square.style.backgroundColor = "#00A36C";
    }

    checkWin(possibleWinConditions, currentPlayer);
    changePlayer();
}

function restartGame()
{
    currentPlayer = "X";
    squares.forEach(square => square.innerHTML = "");
}

document.querySelectorAll(".square").forEach(square => square.addEventListener("click", squareClicked));
document.querySelector("#restart").addEventListener("click", restartGame);