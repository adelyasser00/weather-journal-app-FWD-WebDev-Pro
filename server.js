// Setup empty JS object to act as endpoint for all routes
projectData = {};

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
APP.get('/', (req, res) => {
    res.send(projectData);
    console.log(projectData);
});
APP.post('/', (req, res) => {
    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.userResponse = req.body.userResponse;
    console.log(projectData);
});