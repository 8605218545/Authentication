
if (process.env.SCRETEKEY != "production") {
    require('dotenv').config(); // Require for .env file
}

const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const Flower = require("./models/flowerSchema.js")

const app = express();
const PORT = process.env.PORT || 3000;

const path = require("path");
const methodOverride = require("method-override");

const bodyParser = require("body-parser");
const cors = require("cors");

const session = require("express-session");
const MongoStore = require('connect-mongo');

const ExpressError = require("./utils/ExpressError.js");
const WrapAsync = require("./utils/wrapAsync.js")

const passport = require("passport"); // Require the passport for authentication
const LocalStrategy = require("passport-local"); // For authentication
// const { readdir } = require('fs');

// const { isLoggedIn } = require("./middlewere.js")

// Databse connection
// async function main() {
//     await mongoose.connect("mongodb://localhost:27017/myUser");
// }

const mongoUrl = process.env.MONGO_URL;

async function main() {
    mongoose.connect(mongoUrl)
}
main()
    .then((res) => {
        console.log("DB Connection Successful!");
    })
    .catch((err) => {
        console.log(err);
    });



// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Handle client-side routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Enable CORS for specific origin (your frontend URL)
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent
}));


app.use(bodyParser.json());


const store = MongoStore.create({
    mongoUrl: mongoUrl,              
    crypto: {                           // crypto : it put a imp data ( secret data )
        secret: process.env.SECRET,     // secret key take from ( .env file )
    },
    touchAfter: 24 * 3600,             // touchAfter , there is set time for upadata our session( cookies update) in seconds , we set 24 Hours means 3600 Seconds   ( expire cookie Bydefault 14 days  )       
});


store.on("error", () => {              // find for error in mongo session
console.log("ERROR IN MONGO SESSION STORE!", err)
})


const sessionOptions = {
    store,
    secret: process.env.SECRET, // Secret key take from (.env file)
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // Set the expiry date of our cookie for one week
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true, // For security purposes
        sameSite: 'none', // Required for cross-origin requests
        secure: false, // Set to true if using HTTPS
    },

    // store: MongoStore.create({
    //     mongoUrl: "mongodb://localhost:27017/myUser", // MongoDB connection URL
    // }),
};


app.use(session(sessionOptions)); // Use the express-session for creating cookies


// Passport initialization
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({ usernameField: 'email' }, User.authenticate()));   // take email as a username
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.status(401).json({ message: 'You must be logged in to access this resource.' });
//     // redirect('/login')
// }


// ROot route
app.get("/", (req, res) => {
    res.send("Root is running!");
});


// Sign Up route
app.post("/signup", WrapAsync ( async (req, res) => {
    try {
        let { name, email, mobile, password } = req.body;
        const newUser = new User({ email, name, mobile });
        const registerUser = await User.register(newUser, password);
        console.log(registerUser);

        req.login(registerUser, (err) => {
            if (err) {
                return next(err);
            }
            res.status(200).json({ message: "Signup successful!", user: registerUser });
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Signup failed. User may already exist." });
    }
}));



// Login route
app.post("/login", passport.authenticate("local", { failureRedirect: '/login' }), async (req, res) => {
    res.status(200).json({ message: "Login successful!", user: req.user });
});



// app.get("/showFlowers", (req, res) => {
//     const addFlowers = [
//         {
//           name: 'Rose',
//           image: 'https://www.pngarc.com/wp-content/uploads/2023/05/Rose-Lovely-Red-Rose-red-rose-flower-Arranging-flower-rose-Order-png-1-min.png',
//           details: 'Roses are classic flowers symbolizing love and beauty.',
//         },
//         {
//           name: 'Tulip',
//           image: 'https://img.freepik.com/premium-photo/close-up-red-tulip-against-white-background_1048944-26425139.jpg?semt=ais_hybrid',
//           details: 'Tulips are vibrant flowers that come in a variety of colors.',
//         },
//         {
//           name: 'Sunflower',
//           image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOFlrgseFmYXxiHLSNsLnUW7_ZcUCqggBZ6Q&s',
//           details: 'Sunflowers are known for their bright yellow petals and large size.',
//         },
//         {
//           name: 'Lily',
//           image: 'https://i.pinimg.com/564x/62/61/4c/62614c4997e8e2c50864bcba8c0156e7.jpg',
//           details: 'Lilies are elegant flowers often used in bouquets.',
//         },
//         {
//           name: 'Orchid',
//           image: 'https://static.vecteezy.com/system/resources/thumbnails/023/564/907/small_2x/purple-orchid-flower-watercolor-illustration-ai-generated-png.png',
//           details: 'Orchids are exotic flowers with unique shapes and colors.',
//         },
//         {
//           name: 'Daisy',
//           image: 'https://static.vecteezy.com/system/resources/thumbnails/024/393/578/small_2x/white-daisy-flower-isolate-on-transparent-background-file-png.png',
//           details: 'Daisies are simple and cheerful flowers.',
//         },
//     ];

//     addFlowers.forEach((item) => {
//         let newFlowers = new Flower({
//             name: item.name,
//             image: item.image,
//             details: item.details,
//         });

//         newFlowers.save();
//     })
//     res.send("flowers is added!")

// })




// Home route
app.get("/home", WrapAsync(async (req, res) => {
    let allFlowers = await Flower.find({});
    res.json(allFlowers);
}));



// Show details route
app.get("/details/:id", WrapAsync(async (req, res) => {
    const { id } = req.params;
    console.log("Received ID:", id);
    const flower = await Flower.findById(id);

    if (!flower) {
        return res.status(404).json({ message: "Flower not found" });
    }
    
    res.json(flower); // Send the flower details as a JSON response
}));



// 404 error page
// For Error Handling 
app.use((req, res) => {
    res.status(404).send("404 Page is not found");
});

// Page is Not found
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});


app.listen(PORT, () => {
    console.log("Your app is running on port - 3000");
});
