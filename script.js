function myGameboard(){
    let gameBoardArr = 
    [["", "", ""],
     ["", "", ""],
     ["", "", ""]];

    return {
        markSpot: function(row, col, playerMark){
            gameBoardArr[row][col] = playerMark;
        },

        printBoard: function(){
            for (const row of gameBoardArr){
                console.log(row);
            }
            console.log();
        },
        checkWin: function(){
            for (let i = 0; i < 3; i++){
                j = 0;
                if ((gameBoardArr[i][j] == "X" && gameBoardArr[i][j+1] == "X" && gameBoardArr[i][j+2] == "X")
                    || (gameBoardArr[i][j] == "O" && gameBoardArr[i][j+1] == "O" && gameBoardArr[i][j+2] == "O"
                )){
                    return true;
                }
            }

            for (let j = 0; j < 3; j++){
                i = 0;
                if ((gameBoardArr[i][j] == "X" && gameBoardArr[i+1][j] == "X" && gameBoardArr[i+2][j] == "X")
                    || (gameBoardArr[i][j] == "O" && gameBoardArr[i+1][j] == "O" && gameBoardArr[i+2][j] == "O"
                )){
                    return true;
                }
            }


            if ((gameBoardArr[0][0] == "X" && gameBoardArr[1][1] == "X" && gameBoardArr[2][2] == "X")
                || (gameBoardArr[0][0] == "O" && gameBoardArr[1][1] == "O" && gameBoardArr[2][2] == "O")
                || (gameBoardArr[0][2] == "X" && gameBoardArr[1][1] == "X" && gameBoardArr[2][0] == "X")
                || (gameBoardArr[0][2] == "O" && gameBoardArr[1][1] == "O" && gameBoardArr[2][0] == "O")
            ){
                return true;
            }

        },

        checkTie: function(){
            let empty = false;
            for (const cells of gameBoardArr){
                for (const cell of cells){
                    if (cell == ""){
                        empty = true;
                    }
                }
            }

            if (empty == false && !this.checkWin()){
                return true;
            }
        }
        //to be continued
    }
}

function player(name, mark){
    
    return {
        name: name,
        mark: mark,
    }
}

function gameControl(){
    let players = [];
    let gameboard = myGameboard();
    let currentPlayerIndex = 0;
    let gameOver = false;

    const gameText = document.createElement("div");
    gameText.textContent = "Game hasn't started!";
    gameText.setAttribute("class", "gametxt")
    container.appendChild(gameText);
    
    return {

        startGame: function(player1Name, player2Name){
            players.push(player(player1Name, 'X'));
            players.push(player(player2Name, 'O'));
            currentPlayerIndex = 0;
            gameOver = false;
            console.log(`Game Started! Player1: ${player1Name} vs Player2: ${player2Name}`);
            gameboard.printBoard();
            console.log(`${player1Name} starts.`);
        },

        playTurn: function(row, col){
            if (gameOver) {
                gameText.content = "Game is already over!";
                console.log("Game is already over!");
                return;
            }

            gameboard.markSpot(row, col, players[currentPlayerIndex].mark);
            gameboard.printBoard();

            if (gameboard.checkWin()){
                gameText.textContent = `${players[currentPlayerIndex].name} has won!`;
                console.log(`${players[currentPlayerIndex].name} has won!`);
                gameOver = true;
            }
            else if (gameboard.checkTie()){
                gameText.textContent = `The game was a tie!`;
                console.log("The game was a tie!");
                gameOver = true;
            }
            else{
                this.switchPlayer();
                console.log(`It's ${players[currentPlayerIndex].name}'s turn.`);
            }
        },

        switchPlayer: function(){
            currentPlayerIndex = 1 - currentPlayerIndex;
        },

        currentMark: function(){
            return players[currentPlayerIndex].mark;
        }

        //to be continued
    }
}
const container = document.querySelector(".container");

const game = gameControl();

const myForm = document.querySelector('form');

myForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const player1Name_input = document.getElementById('player1-name');
    const player2Name_input = document.getElementById('player2-name');


    const player1Name = player1Name_input.value;
    const player2Name = player2Name_input.value;

    game.startGame(player1Name, player2Name);

    myForm.reset();
});

const gridContainer = document.querySelector('.grid-container');
const cells = gridContainer.querySelectorAll('div');

const cellOne = document.querySelector('.one');
const cellTwo = document.querySelector('.two');
const cellThree = document.querySelector('.three');
const cellFour = document.querySelector('.four');
const cellFive = document.querySelector('.five');
const cellSix = document.querySelector('.six');
const cellSeven = document.querySelector('.seven');
const cellEight = document.querySelector('.eight');
const cellNine = document.querySelector('.nine');



cells.forEach(cell => {
    let cellRow = 0;
    let cellCol = 0;
    cell.addEventListener('click', function(event){
        function currentCellMark (){
            if (game.currentMark() == "X"){
                event.target.textContent = "X";
            }
            else {
                event.target.textContent = "O";
            }
        }

        if (event.target.getAttribute("class") == "one"){
            cellRow = 0;
            cellCol = 0;
            currentCellMark();
        }
        else if (event.target.getAttribute("class") == "two"){
            cellRow = 0;
            cellCol = 1;
            currentCellMark();
        }
        else if (event.target.getAttribute("class") == "three"){
            cellRow = 0;
            cellCol = 2;
            currentCellMark();
        }
        else if (event.target.getAttribute("class") == "four"){
            cellRow = 1;
            cellCol = 0;
            currentCellMark();
        }
        else if (event.target.getAttribute("class") == "five"){
            cellRow = 1;
            cellCol = 1;
            currentCellMark();
        }
        else if (event.target.getAttribute("class") == "six"){
            cellRow = 1;
            cellCol = 2;
            currentCellMark();
        }
        else if (event.target.getAttribute("class") == "seven"){
            cellRow = 2;
            cellCol = 0;
            currentCellMark();
        }
        else if (event.target.getAttribute("class") == "eight"){
            cellRow = 2;
            cellCol = 1;
            currentCellMark();
        }
        else {
            cellRow = 2;
            cellCol = 2;
            currentCellMark();
        }

        game.playTurn(cellRow, cellCol);
        
    })
})
