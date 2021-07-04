// index.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs')
const { google } = require("googleapis");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//import routes
// const routes = require('./api/routes/routes.js'); 

//register the route
// routes(app);

app.get("/", (req, res) => res.send("Welcome to the  API!"));

app.get('/logs', async function(req, res) {

  var phone;
  var message;
      
        phone = req.query.phone;
        message = req.query.message;
      
  

  
     const auth = new google.auth.GoogleAuth({
      keyFile: "credential.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
  
    // Create client instance for auth
    const client = await auth.getClient();
  
    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });
  
    const spreadsheetId = "13ZHvr-8Az6-Fwj8BG7h0Q4WVRa1s_IEseuOS2joywLM";
  
    // Get metadata about spreadsheet
    const metaData = await googleSheets.spreadsheets.get({
      auth,
      spreadsheetId,
    });
  
    // Read rows from spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Sheet1!A:A",
    });
  
    const str = new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' });
    
  
    // Write row(s) to spreadsheet
    await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "Sheet1!A:C",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[phone, message,str]],
      },
    });
  
    res.send("Successfully submitted! Thank you!");
  
  
  });

app.post('/logs', async function(req, res) {

var phone;
var message;
    
      phone = req.body['phone'];
      message = req.body['message'];
    

  

   const auth = new google.auth.GoogleAuth({
    keyFile: "credential.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "13ZHvr-8Az6-Fwj8BG7h0Q4WVRa1s_IEseuOS2joywLM";

  // Get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  // Read rows from spreadsheet
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1!A:A",
  });

  const str = new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' });
  

  // Write row(s) to spreadsheet
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Sheet1!A:C",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[phone, message,str]],
    },
  });

  res.send("Successfully submitted! Thank you!");

});


app.all("*", (req, res) =>res.send("You've tried reaching a route that doesn't exist."));

app.listen(port, ()=> {
  console.log(`RESTful API server running on ${port}`);
});