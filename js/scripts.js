
var player;
var aiPlayerTurn = false;
var board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

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

function showFirtGrid() {  // show first grid after reset
    $('.first-grid').show();
    $('#indicator').text("It's your turn!");
    $('h2').text(' ');
    $("h2").removeClass("player");
}

function resetBoard() {
    aiPlayerTurn = false;

    board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    $('button').remove();
    $('.second-grid').hide('drop', { direction: 'left' }, 1000, showFirtGrid);

}

function displayWinner(winner) {
    if (winner === 0) {
        if (player === false) {
            $('#indicator').text("You won playing O's!");
        }
        else {
            $('#indicator').text("AI won playing O's.");
            aiPlayerTurn = true;  //make it so player can't add more to board
        }
    }
    if (winner === 1) {
        if (player === true) {  // player is X 
            $('#indicator').text("You won playing X's!");
        }
        else {
            $('#indicator').text("AI won playing X's.");
            aiPlayerTurn = true;  //make it so player can't add more to board
        }
    }
    if (winner === -1) {
        $('#indicator').text("It's a tie.");
    }
    var b = $('<button>Reset Game</button>');
    $(".second-grid").append(b);
    var el = document.querySelector('button');
    el.addEventListener("click", resetBoard, false);

}


function getEmptySpaces() {
    var availableSpaces = [];
    for (var b = 0; b < 3; b++) {
        for (var c = 0; c < 3; c++) {
            if (board[b][c] === null) {
                availableSpaces.push([b, c])
            }
        }
    }
    return availableSpaces;
}



function makeMove() {
    aiPlayerTurn = false;
    var state = getEmptySpaces();
    var choice = Math.floor(Math.random() * state.length); //choose random empty square on board array for AI move
    var move = state[choice].join('');
    var aIboardMove = document.getElementById('c' + move); // find ID of emptry square (h2)
    var char = player ? "O" : "X";  // if player is true AI is 'O' if player is false AI is 'X'
    aIboardMove.textContent = char;
    var idUse = '#c' + move;
    var updateBoard = player ? false : true; // if player is true AI is false if player is false AI is true
    aIboardMove.parentElement.className = "";
    var updateBoard = player ? false : true; // if player is true AI is false if player is false AI is true
    var r = state[choice][0];  //row ai move
    var c = state[choice][1];   //colum,n ai move
    board[r][c] = updateBoard;
    var winner = getWinner(board);
    if (winner !== null) {
        displayWinner(winner);

    }
}



function updateMove() {
    var winner = getWinner(board);
    if (winner !== null) {
        displayWinner(winner);
    }
    else {
        $('#indicator').text(' ');
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
        $('.first-grid').hide('drop', { direction: 'left' }, 1000, showSecondGrid);
    });


    $('.rows').click(function () {
        var sh2 = $(this).find("h2");
        var cell = sh2.attr("id");
        var row = parseInt(cell[1])
        var col = parseInt(cell[2])
        if (!aiPlayerTurn) {
            if (board[row][col] === null) {
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
        }
    });





});

// credits - this blog post was helpful in setting up the tic tac toe board logic
// although I didn't end up using the minmax search for the algorithm
//https://blog.vivekpanyam.com/how-to-build-an-ai-that-wins-the-basics-of-minimax-search