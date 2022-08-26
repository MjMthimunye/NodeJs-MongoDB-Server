const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const request = require('request');
const app = express();

//import user credentials for React front end
const credentials = (
    require ('fs').existsSync(path.join(__dirname, 'credentials.js'))
      ? require ('./credentials')
      : console.log('No credentials.js file present')
);

// Cors allows all urls 
var corsOptions = {
  origin: "*"
};


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// import mongo db from models
const db = require("./models");

// use cloud or local
var useCloud = false;

const PORT = process.env.PORT || 8080;

// Connect DB to Local server // need to add mongo db atlas for cloud
db.mongoose.connect(useCloud ? db.cloudUrl : db.localUrl , { useUnifiedTopology: true })
  .then(() => {
      console.log("Connected to the database!");
  })
  .catch(err => {
      console.log("Cannot connect to the database!", err);
      process.exit();
  });

// Register door model
require("./models/doorModel");
// Import door routes 
require("./routes/doorRoutes")(app);

// get access token for react front end
app.get ('/token', function (req, res) {
  request.post(
    credentials.Authentication,
    { form: credentials.credentials },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.json(JSON.parse(body)) ;
      }
    });
});


// Set up for production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'/client/build')));
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '/client', 'build', 'index.html'));
    })
}

      
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Revit MongoDB Server" });
});


// set port, listen for requests 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});