//Duy Nguyen T00640033
//Assignment 3 _ Part 1

const mongoose = require('mongoose');
const url = "mongodb://127.0.0.1:27017/DuyProject";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

console.log("Setup MongoDB ....");

// Using Schema for better data storage (better than insertOne)
const userSchema = new mongoose.Schema({
  Email: String, 
  Password: String,
  Full_Name: String , 
  Address : String ,
  Phone: String, 
  DateOfBrith: String
});

const HotelRoomSchema = new mongoose.Schema({
  Room_Name: String, 
  Price: mongoose.Types.Decimal128 
});

const HotelBooking = new mongoose.Schema({
  Email: String, 
  Arrive: String,
  Depart: String,
  Person :String, 
  Room: String, 
  BookingDate :String, 
  StayDays: Number, 
  RoomPrice :  mongoose.Types.Decimal128, 
  Total: mongoose.Types.Decimal128
});

const User = mongoose.model('users', userSchema);
const Room = mongoose.model('rooms', HotelRoomSchema);
const Booking = mongoose.model('bookings', HotelBooking);

// List of test data
const adminUsers = [
   {  Email: 'duy@gmail.com' , Password: '1'  , Full_Name: 'Duy Nguyen' , Phone: '12345698729' , DateOfBrith:'04/27' , Address:'764 SomSo Street ,AB'},
   {  Email: 'john@gmail.com' , Password: '1'  , Full_Name: 'John Summit' , Phone: '1234888879' , DateOfBrith:'11/07' , Address:'777 SomSo Street ,AB'},
];

const RoomData = [
  { Room_Name: 'Ambsassador Suite', Price: 200 },
  { Room_Name: 'Junior Suite', Price: 250},
  { Room_Name: 'Family Room', Price: 300 },
  { Room_Name: 'Premium Suite', Price: 400 },
  { Room_Name: 'Premium Plus', Price:500},
  { Room_Name: 'V.I.P Room', Price: 600},
];

// Insert data 
User.create(adminUsers)
  .then(createdUsers => {
    console.log('Users created:', createdUsers);
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error creating users:', err);
    mongoose.disconnect();
  });

Room.create(RoomData)
  .then(createdRoom => {
    console.log('Room created:', createdRoom);
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error creating Room:', err);
    mongoose.disconnect();
  });

