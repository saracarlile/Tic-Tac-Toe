
var player;
var aiPlayerTurn = false;
var board = [
    [null, null, null],
    [true, false, null],
    [null, null, false]
]

function getWinner(board) {
    vals = [true, false];  // check to see "X" true won or "O" false won
    var allNotNull = true; // if no squares are null it's a tie
    for (var v = 0; v < vals.length; v++) {
        var value = vals[v] // check true then false
        // Check rows, columns, and diagonals
        var diagonalComplete1 = true;
        var diagonalComplete2 = true;
        for (var i = 0; i < 3; i++) {
            if (board[i][i] != value) {
                diagonalComplete1 = false;
            }
            if (board[2 - i][i] != value) {
                diagonalComplete2 = false;
            }
            var rowComplete = true;
            var colComplete = true;
            for (var j = 0; j < 3; j++) {
                if (board[i][j] != value) {
                    rowComplete = false;
                }
                if (board[j][i] != value) {
                    colComplete = false;
                }
                if (board[i][j] == null) {
                    allNotNull = false;
                }
            }
            if (rowComplete || colComplete) {
                return value ? 1 : 0; // return 1 means X won and return 0 means O won
            }
        }
        if (diagonalComplete1 || diagonalComplete2) {
            return value ? 1 : 0;   // return 1 means X won and return 0 means O won
        }
    }
    if (allNotNull) {
        return -1;  // return tie
    }
    return null;  // return null if no winner yet
}



function getEmptySpaces() {
    console.log(board);
    var availableSpaces = [];
   for(var b = 0; b < 3; b++){
       for(var c = 0; c < 3; c++){
           if(board[b][c] === null){
               availableSpaces.push([b, c])
           }
       }
   }
   return  availableSpaces;
}



function makeMove() {
    aiPlayerTurn = false;
    var state = getEmptySpaces();
    console.log(state.length);
    var choice = Math.floor(Math.random() * state.length);
    console.log(choice);
    console.log(state[choice]);
}



function updateMove() {
    var winner = getWinner(board);
    if (winner !== null) {
        $('#indicator').text(' ');
        if (winner === 0) {
            if (player === false) {
                $('#winner').text("You won playing O's!");
            }
            else {
                $('#winner').text("AI won playing O's.");
            }
        }
        if (winner === 1) {
            if (player === true) {  // player is X 
                $('#winner').text("You won playing X's!");
            }
            else {
                $('#winner').text("AI won playing X's.");
            }
        }
        if (winner === -1) {
            $('#winner').text("It's a tie.");
        }
    }
    else {
        $('#indicator').text(aiPlayerTurn ? "AI's Turn" : "Your Turn");
        makeMove();
    }
}








$(document).ready(function () {

    function showSecondGrid() {
        $('.second-grid').show();
    }
    $('a').click(function () {
        var id = this.id;
        player = id === 'X' ? true : false; // player is true if "X" and false if "O"
        $('.first-grid').hide('drop', { direction: 'left' }, 2000, showSecondGrid);
    });


    $('.rows').click(function () {
        var sh2 = $(this).find("h2");
        var cell = sh2.attr("id");
        var row = parseInt(cell[1])
        var col = parseInt(cell[2])
        if (!aiPlayerTurn) {
            if (player === true) {
                board[row][col] = true;  //set board to "X" at that location
                sh2.text('X').addClass('player');
                $(this).removeClass('rows');
                aiPlayerTurn = true;
                updateMove();
            }
            else {
                board[row][col] = false; //set board to "O" at that locatio
                sh2.text('O').addClass('player');
                $(this).removeClass('rows');
                aiPlayerTurn = true;
                updateMove();
            }
        }
    });





});

// thanks to this blog post for helping me to understand
//minmax search https://blog.vivekpanyam.com/how-to-build-an-ai-that-wins-the-basics-of-minimax-search