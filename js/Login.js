//Duy Nguyen Part 4_as3

angular.module('myApp', [])
  .controller('LoginController', ['$scope', '$http', function($scope, $http) {
    $scope.login = function() {
      const userData = {
        Email: ($scope.email).toLowerCase(),
        Password: $scope.password
      };

      const config = {
        withCredentials: true,
      };

      $http.post('http://127.0.0.1:3000/api/login', userData , config)
        .then(function(response) {
          if (response.data.success) {
            window.location.href = 'index.html';
          }else{
            $scope.message = response.data.message;
          }
        })
        .catch(function(error) {
          $scope.message = 'An error occurred';
        });
    };
  }]);
