//Dependencies:
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');

//THIS NEEDS TO BE CHANGED BEFORE DEPLOYMENT
var PORT = process.env.PORT || 8080;


//creates application/json parser - from npm body-parser
//var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({
  extended: true
}));

// parse various different custom JSON types as JSON - from npm body-parser
app.use(bodyParser.json({
  type: 'application/*+json'
}))

// parse some custom thing into a buffer - from npm body-parser
app.use(bodyParser.raw({
  type: 'application/vnd.custom-type'
}))

//parse a HTML body into a string - from npm body-parser
app.use(bodyParser.text({
  type: 'text/html'
}))

//include route to see friends
require("./app/routing/apiRoutes.js")(app);
//include html route file
require("./app/routing/htmlRoutes.js")(app);


// Starts the server to begin listening
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});