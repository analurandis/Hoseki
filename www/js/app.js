
var IP = 'localhost:56747';
var URL_Fatura = 'http://' + ip + '/Inicial/FaturaMobile';


var app = angular.module('App', []);

app.controller('Fatura', function ($scope, $http) {
    $scope.Fatura = function (data) {
        alert(data);
        $http({
            url: URL_Fatura,
            method: "POST",
            headers: {
                "Content-Type": "text/plain"
            },
            data: {
                id: 10038
            }
        }).success(function (data) {
            alert("sucess" + data);
            $scope.result = data;
        }).error(function (data) {
            alert("error " + data);
            $scope.result = data;
        });

    };
 });