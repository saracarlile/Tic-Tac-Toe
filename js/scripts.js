var app = angular.module('ticTacToe', []);

app.controller('ticTacToeController', function ($scope) {
    $scope.state = ['X', ' ', 'O', 'X'];
    $scope.moves = 0;   //how many moves AI player has made till this state
    $scope.player = 'X'; // is AI X or O

    $scope.applyNew = function () {
        console.log('click');
        $scope.state = ['X', ' ', 'O', 'X', 'X', 'X', 'X', 'X', ' '];
    };


});