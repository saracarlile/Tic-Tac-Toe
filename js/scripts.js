$(document).ready(function () {
    var player;
    function showSecondGrid() {
        $(".second-grid").show(); 
    }
    $("a").click(function () {
        var id = this.id;
        player = id === 'X' ? true : false; // player is true if "X" and false if "O"
        $(".first-grid").hide("drop", { direction: "left" }, 2000, showSecondGrid);
    });





});