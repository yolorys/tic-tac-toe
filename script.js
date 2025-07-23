function myGameboard(){
    let gameBoardArr = 
    [["", "", ""],
     ["", "", ""],
     ["", "", ""]];

    return {
        markSpot: function(row, col, playerMark){
            gameBoardArr[row][col] = playerMark;
        },

        getSpot: function(row, col){
            return gameBoardArr[row][col];
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
    let gameboard;
    let currentPlayerIndex = 0;
    let gameOver = false;

    const gameText = document.createElement("div");
    gameText.textContent = "Game hasn't started!";
    gameText.setAttribute("class", "gametxt")
    container.appendChild(gameText);

    let player1CurrentName = "Player 1";
    let player2CurrentName = "Player 2"; //Defaults
    
    return {

        startGame: function(player1Name, player2Name){
            player1CurrentName = player1Name;
            player2CurrentName = player2Name;

            gameboard = myGameboard();

            const allCells = document.querySelectorAll('.grid-container div');
            allCells.forEach(cell => {
                cell.textContent = '';
            });

            players = [];

            players.push(player(player1Name, 'X'));
            players.push(player(player2Name, 'O'));
            currentPlayerIndex = 0;
            gameOver = false;
            gameText.innerHTML = `Game Started! Player1: ${player1Name} vs Player2: ${player2Name}<br>${player1Name} starts.`;

        },

        playTurn: function(row, col){
            if (gameOver) {
                gameText.textContent = "Game is already over! Reset to start another game.";
                return;
            }

            if (gameboard.getSpot(row, col) !== "") {
                gameText.textContent = "That spot is already taken. Choose another.";
                return false;
            }

            const currentMark = players[currentPlayerIndex].mark;
            gameboard.markSpot(row, col, currentMark);

            if (gameboard.checkWin()){
                gameText.textContent = `${players[currentPlayerIndex].name} has won!`;
                gameOver = true;
                return true;
            }
            else if (gameboard.checkTie()){
                gameText.textContent = `The game was a tie!`;
                gameOver = true;
                return true
            }
            else{
                this.switchPlayer();
                gameText.textContent = `It's ${players[currentPlayerIndex].name}'s turn.`;
                return true
            }
        },

        switchPlayer: function(){
            currentPlayerIndex = 1 - currentPlayerIndex;
        },

        getGameBoard: function(){
            return gameboard;
        },

        isGameOver: function() {
            return gameOver;
        },
        
        resetGame: function() {
            this.startGame(player1CurrentName, player2CurrentName);
        }

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

cells.forEach(cell => {
    cell.addEventListener('click', function(event){
        const clickedCell = event.target;
        

        const cellRow = parseInt(clickedCell.dataset.row);
        const cellCol = parseInt(clickedCell.dataset.col);

        const moveSuccessful = game.playTurn(cellRow, cellCol);

        if (moveSuccessful){
            clickedCell.textContent = game.getGameBoard().getSpot(cellRow, cellCol);
        }
    })
})

const reset = document.querySelector(".reset");
reset.addEventListener('click', () => {
    game.resetGame();
});