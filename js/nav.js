//Duy Nguyen Part 4_as3

angular.module('myApp' , []).controller('UserController', ['$scope', '$http', function ($scope, $http) {

    const config = {
        withCredentials: true,
    };
    
    // Check user login status
    $http.get('http://127.0.0.1:3000/api/check-login' , config)
        .then(function (response) {
            if (response.data.loggedin) {
                $scope.loggedin = true;
                $scope.username = response.data.username;

            }else{
                // Not login yets
                $scope.loggedin = false;
            }
        });


    $scope.logout = function() {
            
        const config = {
            withCredentials: true,
        };
    
        $http.get('http://127.0.0.1:3000/api/logout', config)
            .then(function(response) {
            if (response.data.success) {
                window.location.href = '/index.html';    
            }      
            })           
        };
}]);

