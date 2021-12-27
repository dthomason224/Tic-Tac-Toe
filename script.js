let currentPlayer = "X";
const squares = document.querySelectorAll(".square")
console.log(squares);

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

function checkWin(array, player)
{
    array.forEach(function(subArray)
    {
        let counter = 0;
        subArray.forEach(function(element)
        {
            console.log(element);
            if (squares[element].innerHTML === player) 
            {
                counter++;
                if (counter === 3) 
                {
                    alert("winner is " + player);
                }
            }
        });
    });
}

function checkTie(array)
{
    let drawCounter = 0;
    array.forEach(function(element)
    {
        console.log(element);
        if(element.innerHTML !== "")
        {
            drawCounter++;
            console.log(drawCounter);
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
    
    checkWin(possibleWinConditions, currentPlayer);
    checkTie(squares);
    changePlayer();
}

document.querySelectorAll(".square").forEach(square => square.addEventListener("click", squareClicked));