angular.module('myApp', [])
  .controller('RegisterController', ['$scope', '$http', function($scope, $http) {
    $scope.register = function() {
    
        if($scope.checkbox){    
            if($scope.password == $scope.cpass ){
                const userData = {
                    Email: ($scope.email).toLowerCase(),
                    Password: $scope.password , 
                    Full_Name :  $scope.name ,
                    Phone:  $scope.contact,
                    DateOfBrith:  $scope.birth, 
                    Address :  $scope.address
                };

                $http.post('http://127.0.0.1:3000/api/register', userData)
                .then(function(response) {
                    if (response.data.success) {                
                        window.location.href = 'login.html';
                    }else{
                        $scope.message = response.data.message;
                    }
                })
                .catch(function(error) {
                    $scope.message = 'An error occurred';
                });
            }else{
                $scope.message = "Your Confirm Password is not match";
            }
        }else{
            $scope.message = "Please Accept the terms & conditions";
        }
    };
}]);
