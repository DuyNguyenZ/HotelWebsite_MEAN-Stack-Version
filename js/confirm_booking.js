angular.module('myApp').controller('BookingController', function ($scope, $http) {
 

    // Retrieve and assign cookie values to scope variables
    $scope.arrive = getCookieValue('arrive');
    $scope.depart = getCookieValue('depart');
    $scope.person = getCookieValue('person');
    $scope.room_name = getCookieValue('room_type');
    $scope.booking_date = getCookieValue('booking_date');
    $scope.stay_days = getCookieValue('stay_days');

    //Customer Info
    $scope.customer_name = getCookieValue('name') ; 
    $scope.customer_email = getCookieValue('email');
    $scope.customer_phone = getCookieValue('phone');

    //get Room Price And caculate the total payment 
    const RoomData = {
        Room_Name: getCookieValue('room_type')
    };

    const config = {
        withCredentials: true,
    };

    $http.post('http://127.0.0.1:3000/api/room_price', RoomData , config)
    .then(function(response) {
        if (response.data.success) {
            const roomPriceDecimal = response.data.Price;
            const roomPriceNumeric = parseFloat(roomPriceDecimal.$numberDecimal);
            $scope.room_price = roomPriceNumeric;
            $scope.total_money = roomPriceNumeric * parseFloat(getCookieValue('stay_days'));
        }else{
            $scope.message = response.data.message;
        }
    })
    .catch(function(error) {
        $scope.message = 'An error occurred';
    });


    //Booking Cofirm 
    $scope.BookedBooking = function() {

        const BookingData = {
            Email: $scope.customer_email,
            Arrive: $scope.arrive,
            Depart: $scope.depart,
            Person: $scope.person,
            Room: $scope.room_name,
            BookingDate: $scope.booking_date,
            StayDays: parseFloat($scope.stay_days),
            RoomPrice:  parseFloat($scope.room_price),
            Total: parseFloat($scope.total_money),
        };


        const config = {
            withCredentials: true,
        };    
            
        $http.post('http://127.0.0.1:3000/api/booking_save', { BookingData: BookingData } , config)
        .then(function(response) {
            if (response.data.success) {
                window.location.href = 'Thank.html';
            }else{
                $scope.message = response.data.message;
            }
        })
        .catch(function(error) {
            $scope.message = 'An error occurred';
        });

    }

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