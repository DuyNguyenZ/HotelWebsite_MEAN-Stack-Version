//Duy Nguyen T00640033
//Assignment 3 _ Part 4

const express = require('express');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require("cookie-parser");

app.use(
  session({
    secret: 'xsxacas5a1sda',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // Set the session expiration time to 1 hour (in milliseconds)
    },
  })
);
app.use(cookieParser());
app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://127.0.0.1',
  methods: ["GET", "POST"],
  credentials: true,
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions)); // Use this after the variable declaration

mongoose.connect('mongodb://127.0.0.1:27017/DuyProject', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  Email: String,
  Password: String,
  Full_Name: String,
  Phone: String,
  DateOfBrith: String, 
  Address : String
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


const message = new mongoose.Schema({
  Name: String, 
  Email: String , 
  Message: String
});

const HotelRoomSchema = new mongoose.Schema({
  Room_Name: String, 
  Price: mongoose.Types.Decimal128 
});

const User = mongoose.model('users', userSchema);
const Room = mongoose.model('rooms', HotelRoomSchema);
const Booking = mongoose.model('bookings', HotelBooking);
const Message = mongoose.model('message', message);


//Login
app.post('/api/login', async (req, res) => {
  const { Email , Password } = req.body;
  try {
    const user = await User.findOne({ Email });

    if (user) {
      if (user.Password === Password) {
        req.session.Logged = true; // Set a session variable
        req.session.username = user.Full_Name; // Store the username in the session
        req.session.email =  user.Email; 

        res.cookie('name',  user.Full_Name);
        res.cookie('email',  user.Email);
        res.cookie('phone', user.Phone);

        res.json({ success: req.session.Logged });
      } else {
        res.json({ success: false, message: 'Incorrect Username or Password. Please try again.' });
      }
    } else {
      res.json({ success: false, message: 'User not found. Create a new account.' });
    }
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ success: false, message: 'An internal server error occurred.' });
  }
});

//Register
app.post('/api/register', async (req, res) => {
  const { Email } = req.body;

  try {
    const user = await User.findOne({ Email });

    if (!user) {
      const UserData = req.body;

      // Insert data 
      User.create(UserData)
      .then(createdUsers => {
        console.log('Users created:', createdUsers);
        res.json({ success: true});
      })
      .catch(err => {
        console.error('Error creating users:', err);
        res.json({ success: false, message: 'Error creating users' });
      });          

    } else {
      res.json({ success: false, message: 'The email has already been registered.' });
    }
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ success: false, message: 'An internal server error occurred.' });
  }
});


// Add a route to check if the user is logged in
app.get('/api/check-login', (req, res) => {
  if (req.session.Logged !== undefined) {
    res.json({ loggedin: true , username: req.session.username });
  } else {
    res.json({ loggedin: req.session.Logged });
  }
});

//Logout 
app.get('/api/logout', (req, res) => {

  // Clear each cookie by setting it to an empty string with an expired date
  const cookies = req.cookies;
  for (const cookieName in cookies) {
    res.clearCookie(cookieName);
  }

  // Destroy the session to log the user out
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    } else {       
      res.json({ success: true });
    }
  });
});

//Get Room Price
app.post('/api/room_price', async (req, res) => {
  const { Room_Name } = req.body;
  try {

    const room = await Room.findOne({ Room_Name });
    res.json({ success: true , Price: room.Price});

  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ success: false, message: 'An internal server error occurred.' });
  }
});

//Save The Booking
app.post('/api/booking_save', async (req, res) => {
  
  try {
    const { BookingData } = req.body;

    // Insert data 
    Booking.create(BookingData)
    .then(createdBooking => {
      console.log('Booking created:', createdBooking);
      res.json({ success: true});
    })
    .catch(err => {
      console.error('Error creating users:', err);
      res.json({ success: false, message: 'Error creating users' });
    });       

  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ success: false, message: 'An internal server error occurred.' });
  }
});

//Get the User Booking
app.get('/api/booking_view', async (req, res) => {
  
  try {
    const email = req.session.email; 
    const booking = await Booking.findOne({ Email: email }); 

    if (booking) {           
      res.json({ success: true, arrive: booking.Arrive, depart: booking.Depart, person: booking.Person, room: booking.Room, bookingDate: booking.BookingDate, stayDays: booking.StayDays, roomPrice: booking.RoomPrice, total: booking.Total });
    } else {
      res.json({ success: false });
    }
    
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ success: false, message: 'An internal server error occurred.' });
  }
});

//Save the Message from Contact.html to DB
app.post('/api/message', async (req, res) => {

  try {
      const { message } = req.body;

      // Insert data 
      Message.create(message)
      .then(createdMessage => {
        console.log('Message created:', createdMessage);
        res.json({ success: true});
      })
      .catch(err => {
        console.error('Error save Message:', err);
        res.json({ success: false, message: 'Error Send Message' });
      });             
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ success: false, message: 'An internal server error occurred.' });
  }
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

    

