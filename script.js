//add variables for later use
let currentPlayer = "X";
let gameWon = false;
let xRecord = 0;
let oRecord = 0;

//used query selectors to obtain elements needed
const squares = document.querySelectorAll(".square");
const turnDisplay = document.querySelector("#current");
const xWinDisplay = document.querySelector("#winsX");
const oWinDisplay = document.querySelector("#winsO");

//wrote messages for certain conditions and reuse
const currentPlayerMessage = () => `Current Turn: ${currentPlayer}`;
const winMessage = () => `${currentPlayer} Won!`;
const drawMessage = () => "Draw!";
const xWinsMessage = () => `X ${xRecord}`;
const oWinsMessage = () => `O ${oRecord}`;

//initial values for displayed elements
turnDisplay.innerHTML = currentPlayerMessage();
xWinDisplay.innerHTML = xWinsMessage();
oWinDisplay.innerHTML = oWinsMessage();

//all possible win conditions
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

const restart = function() {setTimeout(restartGame, 2000)};

//changes player to opposite side and replaces hover class for color changes
function changePlayer()
{
    if (currentPlayer === "X") 
    {
        currentPlayer = "O";
        turnDisplay.innerHTML = currentPlayerMessage();
        squares.forEach(square => square.classList.replace("color", "color2"));
    }
    else
    {
        currentPlayer = "X";
        turnDisplay.innerHTML = currentPlayerMessage();
        squares.forEach(square => square.classList.replace("color2", "color"));
    }
}

//checks wins by looping through the arrays of squares and win conditions
function checkWin(array, player)
{
    array.forEach(function(subArray)
    {
        let counter = 0;
        subArray.forEach(function(element)
        {
            //compares array elements to current player's letter
            if (squares[element].innerHTML === player) 
            {
                //adds to counter when they are equal
                counter++;
                //when counter hits three that means the sub array is a win condition on the board
                if (counter === 3) 
                {
                    //sets gameWon variable to true so the board isn't checked for a tie
                    gameWon = true;
                    alert("winner is " + player);
                    //shows winner, increase players score, and restarts board after 2 seconds
                    if (player === "X") 
                    {
                        xRecord++;
                        xWinDisplay.innerHTML = xWinsMessage();
                        restart();
                    }
                    else
                    {
                        oRecord++;
                        oWinDisplay.innerHTML = oWinsMessage();
                        restart();
                    }
                }
            }
        });
    });
    //if a win is not found function is called to check for a tie
    if (gameWon === false) 
    {
        checkTie(squares);
    }
}

function checkTie(array)
{
    let drawCounter = 0;
    //loops through board
    array.forEach(function(element)
    {
        if(element.innerHTML !== "")
        {
            //adds to counter if element is not blank
            drawCounter++;
            //when all nine squares are blank draw is confirmed
            if (drawCounter === 9) 
            {
                alert("draw"); 
                restart();   
            }
        }
    });
}

function squareClicked(event)
{
    const square = event.target;

    //calls functiion to fill square with current player color
    fillSquare(square);
}

function fillSquare(square)
{
    //used to stop the players from overwriting a square that is filled
    if(square.innerHTML !== "")
    {
        return;
    }
    square.innerHTML = currentPlayer;

    if (currentPlayer === "X") 
    {
        square.style.backgroundColor = "#993399";
        square.classList.add("animate");
    }
    else
    {
        square.style.backgroundColor = "#00A36C";
        square.classList.add("animate");
    }

    checkWin(possibleWinConditions, currentPlayer);
    changePlayer();
}

function restartGame()
{
    //puts values back to their inital values
    currentPlayer = "X";
    squares.forEach(function(square) {
        square.innerHTML = "";
        square.style.backgroundColor = "";
        square.classList.replace("color2", "color");
        square.classList.remove("animate");
    });
    gameWon = false;
}

function resetScore()
{
    //resets score for players to zero
    xRecord = 0;
    xWinDisplay.innerHTML = xWinsMessage();
    oRecord = 0;
    oWinDisplay.innerHTML = oWinsMessage();
}

document.querySelectorAll(".square").forEach(square => square.addEventListener("click", squareClicked));
document.querySelector("#restart").addEventListener("click", restartGame);
document.querySelector("#reset").addEventListener("click", resetScore);