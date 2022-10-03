/* Global Variables */

// Personal API Key for OpenWeatherMap API
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const API_KEY='&appid=3734059046e3ec7ec64c53f70125cac5&units=imperial';

// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
// Add event listener to generate button
document.getElementById('generate').addEventListener('click',performAction);
function performAction(e){
  // First we get the zip code and the feelings from the user
  const ZIP = document.getElementById('zip').value;
  const FEELINGS = document.getElementById('feelings').value;
  getWeather(BASE_URL,ZIP,API_KEY)
  // then we dynamically update the UI with the new data
  .then(function(data){
    console.log(data);
    postData('/add',{date:newDate,temp:data.main.temp,content:FEELINGS});
    updateUI();
  })
}
 const updateUI = async () => {
  // get the data from the server
  const request = await fetch('/all');
  try{
    // convert the data to json
    const allData = await request.json();
    // update the UI
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('content').innerHTML = allData.content;
  }catch(error){
    console.log("error",error);
  }
}
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content
    }), // body data type must match "Content-Type" header        
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
const getWeather = async (BASE_URL,ZIP,API_KEY)=>{
  const res = await fetch(BASE_URL+ZIP+API_KEY)
  try {
    const data = await res.json();
    return data;
  }  catch(error) {
    console.log("error", error);
  }
}