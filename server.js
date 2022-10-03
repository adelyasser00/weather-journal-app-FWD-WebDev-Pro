// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require EXPRESS to run server and routes
const EXPRESS = require('express');
// Start up an instance of APP
const APP = EXPRESS();
/* Middleware*/
//Here we are configuring EXPRESS to use body-parser as middle-ware.
const BODY_PARSER = require('body-parser');
APP.use(BODY_PARSER.urlencoded({ extended: false }));
APP.use(BODY_PARSER.json());

// Cors for cross origin allowance
const CORS = require('cors');
APP.use(CORS());
// Initialize the main project folder
APP.use(EXPRESS.static('website'));
// Setup Server
const PORT = 8000;
const SERVER = APP.listen(PORT,()=>console.log(`running on localhost: ${PORT}`));
// Setup GET Route
APP.get('/all',(req,res)=>{
    // Send the projectData object to the client
    res.send(projectData);
});
// Setup POST Route
APP.post('/add',(req,res)=>{
    // Add the data to the projectData object
    projectData['date'] = req.body.date;
    projectData['temp'] = req.body.temp;
    projectData['content'] = req.body.content;
    res.send(projectData);
});