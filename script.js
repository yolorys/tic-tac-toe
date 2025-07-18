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
            console.log(gameBoardArr);
        },
        checkWin: function(){
            for (let i = 0; i < 3; i++){
                if (gameBoardArr[i] == ["X", "X", "X"] || gameBoardArr[i] == ["O", "O", "O"]){
                    return true;
                }
            }

            i = 0;
            for (let j = 0; j < 3; j++){
                if ((gameBoardArr[i][j] == "X" && gameBoardArr[i+1][j] == "X" && gameBoardArr[i+2][j] == "X")
                    || (gameBoardArr[i][j] == "O" && gameBoardArr[i+1][j] == "O" && gameBoardArr[i+2][j] == "O"
                )){
                    return true;
                }
            }
        },

        checkTie: function(){

        }
        //to be continued
    }
}

function player(name, mark){
    
    return {
        name: name,
        mark: mark,
        //to be continued
    }
}

function gameControl(){
    let players = [];
    let gameboard = myGameboard();
    let currentPlayerIndex = 0;
    let gameOver = false;

    return {
        startGame: function(player1Name, player2Name){
            players.push(player(player1Name, 'O'));
            players.push(player(player2Name, 'X'));
            currentPlayerIndex = 0;
            gameOver = false;
            console.log("Game Started!");
            gameboard.printBoard();
        },

        playTurn: function(row, col){
            if (gameOver) {
                console.log("Game is already over!");
                return;
            }
            
            gameboard.markSpot(row, col, players[currentPlayerIndex].mark);
            gameboard.printBoard();

            if (gameboard.checkWin()){
                console.log(`Player${currentPlayerIndex} has won!`);
                gameOver = true;
            }
            else if (gameboard.checkTie()){
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

        //to be continued
    }
}

const game = gameControl();
game.startGame("Yelarys", "Sindhuja");