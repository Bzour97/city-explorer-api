'use strict';

// make a variable to use the express library
const express = require('express');
require('dotenv').config();
const cors = require('cors');


// serevr has all the properities and methods in express
const server = express();

const weatherInfos = require('./data/weather.json')


const PORT = 8000;
server.use(cors());

// localhost:3005/
// https://class07-301d33.herokuapp.com/

server.get('/',(req,res)=>{
    res.status(200).send('Home route')
})

// localhost:3005/test
// https://class07-301d33.herokuapp.com/test
server.get('/test',(request,response)=>{
    response.send('Everything is Done Yo Yo Yo')
})

// localhost:3005/getPokemon?city=charmander&pokeLevel=10
// https://class07-301d33.herokuapp.com/?city=charmander&pokeLevel=10
server.get('/weather',(req,res)=>{
    // res.send(weatherInfos);
    try{
    let ourCity = req.query.city;
    console.log(req.query);
    console.log(req.query.city)
    console.log(1, weatherInfos);
    let objForCast = []; 
    let infoForWather = weatherInfos.find((item)=>{
        console.log(2, item.city_name)
        if(item.city_name === ourCity) {
            objForCast = item.data.map(itemDesc => 
                // console.log(3, itemDesc)
                new Forcast ( itemDesc.datetime, itemDesc.weather.description )) ; 
            return item;
        }
    })
    res.send({"weatherInfos": objForCast, "city": infoForWather.city_name, "lan": infoForWather.lat, "lon": infoForWather.lon});

} catch (errorzZ){
    res.send('Wrong request, you can only search for 3 cities' + errorzZ);
}
})
// localhost:3005/ANYTHING
server.get('*',(req,res)=>{
    res.status(404).send('route is not found')
})

server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})

class Forcast {
    constructor(date, description) {
      this.data = date;
      this.description = description;
    }}
///// i hate my life