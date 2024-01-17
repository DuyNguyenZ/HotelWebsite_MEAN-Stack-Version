angular.module('myApp').controller('BookingController', function ($scope, $window) {

    $scope.booking = {
        arrive: new Date(),
        person: '2',
        room_type: 'Ambsassador Suite'
    };

    $scope.minArrivalDate = new Date().toISOString();
    
    $scope.updateMinDepartureDate = function () {
        // Calculate minDepartureDate based on arrive + 1 day
        const minArrivalDate = new Date($scope.booking.arrive);
        minArrivalDate.setDate(minArrivalDate.getDate() + 1);
        $scope.minDepartureDate = minArrivalDate.toISOString().split('T')[0]; // Format as yyyy-MM-dd
    };

    $scope.updateMinDepartureDate();

    $scope.submitBooking = function () {
        // Store form data in cookies
        document.cookie = `arrive=${formatDate($scope.booking.arrive)}; path=/;`;
        document.cookie = `depart=${formatDate($scope.booking.depart)}; path=/;`;
        document.cookie = `booking_date=${formatDate(new Date())}; path=/;`;
        document.cookie = `stay_days=${DiffInDays($scope.booking.arrive , $scope.booking.depart )}; path=/;`;

        document.cookie = `person=${$scope.booking.person}; path=/;`;
        document.cookie = `room_type=${$scope.booking.room_type}; path=/;`;        

        // Redirect to the confirmation page
        $window.location.href = "confirm_booking.html";
    };

    // Format the date as MM/DD/YYYY
    function formatDate(date) {
        var month = (date.getMonth() + 1).toString().padStart(2, '0');
        var day = date.getDate().toString().padStart(2, '0');
        var year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }
    
    function DiffInDays(a, b) {
        const diff = b - a;
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }
});
