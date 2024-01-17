angular.module('myApp').controller('BookingViewController', function ($scope, $http) {

    //   $scope.BookingExit = false;

    //Customer Info
    $scope.customer_name = getCookieValue('name') ; 
    $scope.customer_email = getCookieValue('email');
    $scope.customer_phone = getCookieValue('phone');

    const config = {
        withCredentials: true,
    };

    $http.get('http://127.0.0.1:3000/api/booking_view' , config)
    .then(function (response) {
        
        if (response.data.success) {

            $scope.BookingExit = true;

            $scope.arrive = response.data.arrive;
            $scope.depart = response.data.depart;
            $scope.person = response.data.person;
            $scope.room_name = response.data.room;
            $scope.booking_date = response.data.bookingDate;
            $scope.stay_days = response.data.stayDays;
            $scope.room_price = parseFloat((response.data.roomPrice).$numberDecimal);
            $scope.total_money = parseFloat((response.data.total).$numberDecimal);
        }else{
            $scope.BookingExit = false;
        }
    });

    // Function to retrieve a cookie value by its name
    function getCookieValue(cookieName) {
        var name = cookieName + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var cookieArray = decodedCookie.split(';');
        for (var i = 0; i < cookieArray.length; i++) {
            var cookie = cookieArray[i].trim();
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
    }

});
