var angular = require('angular');
var myApp =  angular.module('myApp',[]);

myApp.controller('myAppController',['$scope', '$http', function ($scope, $http, myAppService) {

    $scope.people = [];

    $scope.init = function() {

        $http.get('http://localhost:3000/person/hektor').then(function(result) { $scope.people = result.data; });
    }

    $scope.init();

}]);
