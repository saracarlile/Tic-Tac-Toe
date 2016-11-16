
var player;
var aiPlayerTurn = false;
var board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

function updateMove() {
  //  var winner = getWinner(board);
    $('#indicator').text(aiPlayerTurn ? "AI's Move" : "Your move");
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
        console.log(cell);
        var row = parseInt(cell[1])
        var col = parseInt(cell[2])
        if (!aiPlayerTurn) {
            if (player === true) {
                board[row][col] = true;  //set board to "X" at that location
                sh2.text('X').addClass('player');
                $(this).removeClass('rows');
                aiPlayerTurn = true;
                    updateMove();
                //    makeMove();
            }
            else {
                board[row][col] = false; //set board to "O" at that locatio
                sh2.text('O').addClass('player');
                $(this).removeClass('rows');
                aiPlayerTurn = true;
                   updateMove();
                //    makeMove();
            }
        }
    });







});