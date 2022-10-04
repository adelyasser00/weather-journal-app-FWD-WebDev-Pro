/* Global Variables */

// Personal API Key for OpenWeatherMap API
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const API_KEY='&appid=3734059046e3ec7ec64c53f70125cac5&units=imperial';

// Create a new date instance dynamically with JS
let date = new Date();
let newDate = date.getMonth()+1+'.'+ date.getDate()+'.'+ date.getFullYear();
// Add event listener to generate button
document.getElementById('generate').addEventListener('click',()=>{
  // First we get the zip code and the feelings from the user
  const ZIP = document.getElementById('zip').value;
  const FEELINGS = document.getElementById('feelings').value;
  generateWeather(BASE_URL,ZIP,API_KEY)
  // then we dynamically update the UI with the new data
  .then(function(weather){
    console.log(weather);
    // add data to POST request
    postData('/add',{date:newDate,temp:weather.main.temp,content:FEELINGS});
    // Update UI with new data obtained
    updateUI();
  })
});

 const updateUI = async () => {
  // get the data from the server
  const request = await fetch('/all');
  try{
    // convert the data to json
    const updatedData = await request.json();
    // update the UI
    document.getElementById('date').innerHTML = updatedData.date;
    document.getElementById('temp').innerHTML = updatedData.temp;
    document.getElementById('content').innerHTML = updatedData.content;
  }catch(error){
    console.log("error",error);
  }
}
const postData = async ( url = '', data = {})=>{
  // body of the POST request, as taught in the course
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // convert the data used to strings
      date: data.date,
      temp: data.temp,
      content: data.content
    }),       
  });
    try {
      // convert the data to json
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};
// get the weather data from the API using the zip code and the API key
const generateWeather = async (BASE_URL,ZIP,API_KEY)=>{
  const result = await fetch(BASE_URL+ZIP+API_KEY)
  try {
    const data = await result.json();
    return data;
  }  catch(error) {
    console.log("error", error);
  }
}