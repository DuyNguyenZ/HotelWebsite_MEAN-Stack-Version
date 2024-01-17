//Duy Nguyen Part 4_as3

angular.module('myApp').controller('MessageController', function ($scope, $http) {

    $scope.messageSent = function() {
       
        const message = {
            Name: $scope.name,
            Email: $scope.email,
            Message: $scope.note,       
        };

        const config = {
            withCredentials: true,
        };    
            
        $http.post('http://127.0.0.1:3000/api/message', {message : message }, config)
        .then(function(response) {
            if (response.data.success) {
                $scope.message = 'Message Sent';
            }else{
                $scope.message = response.data.message;
            }
        })
        .catch(function(error) {
            $scope.message = 'An error occurred';
        });
                
    }

});