// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp/:date_string", function (req, res) {
  let date;
  
  if(!isNaN(req.params.date_string)){
    date = new Date(parseInt(req.params.date_string));
    res.json({"unix": date.getTime(), "utc": date.toUTCString()});
  }else{
    date = new Date(req.params.date_string);
    if(date == 'Invalid Date'){
      res.json({"error": "Invalid Date"});
    }else{
      res.json({"unix": date.getTime(), "utc": date.toUTCString()});
    }
  }
  
});



// listen for requests :)
var listener = app.listen(process.env.PORT || 3456, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});