import React from 'react';
import './App.css'
import Weather from './components/weather'
import Form from './components/form'


const weatherApi = {
  key: "44e9b743150314bcf15e72b3d5efc42e",
  base: "api.openweathermap.org/data/2.5/"
}

let bgimage = 'app-default';

class App extends React.Component{
  constructor()
  {
    super();
    this.state = {
      city : '',
      country : '',
      description : '',
      temp : undefined,
      h : undefined,
      l : undefined,
      feels : undefined,
      humidity: undefined,
      wind : undefined,
      pressure : undefined,
      icon: undefined,
      error:false ,
    } ; 

    

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain:"wi-hail",
      Snow:"wi-snow",
      Atmosphere:"wi-fog",
      Clear:"wi-day-sunny",
      Clouds: "wi-cloudy",
      Default: "wi-thermometer",

    }
  }

   tocelsius = (temperatureInKelvin) => {return Math.floor(temperatureInKelvin - 273.15)} ;
   toKMPH = (speedInmps)=>{ return  (speedInmps * 3.6).toFixed(1) };
   toInchesInMercury = (pressurein_hPa)=>{ return (pressurein_hPa * 0.02953).toFixed(2) };

   

   getIcon = (iconId) => { 

    console.log("Icon Id is: "+iconId);

     switch(true){
       case iconId>=200 && iconId<=232 :{
       bgimage='app-thunderstorm';
       return this.weatherIcon.Thunderstorm;}

       case iconId>=300 && iconId<=331 : {
        bgimage='app-drizzle';
       return this.weatherIcon.Drizzle;}

       case iconId>=500 && iconId<=531 : {
        bgimage='app-rain';
       return this.weatherIcon.Rain;}

       case iconId>=600 && iconId<=622 : {
        bgimage='app-snow';
       return this.weatherIcon.Snow;}

       case iconId>=701 && iconId<=781 : {
        bgimage='app-fog';
       return this.weatherIcon.Atmosphere;}

       case iconId===800 : {
        bgimage='app-sunny';
       return this.weatherIcon.Clear;}

       case iconId>=801 && iconId<=804 : {
        bgimage='app-cloudy';
       return this.weatherIcon.Clouds;}

       default: {
        bgimage='app-default';
       return this.weatherIcon.Default;}
     }
    };
  
  getWeather = async (e)=>{
    
    console.log("entered 1");
    e.preventDefault();
    console.log("entered 2");

    const city = e.target.elements.city.value;

    if(city){
    const api_response = await fetch(`http://${weatherApi.base}weather?q=${city}&appid=${weatherApi.key}`);
   
    const response = await api_response.json();
    console.log(response);

    if(response.cod!=="404"){
      this.setState({
        city:response.name,
        country:response.sys.country,
        description:response.weather[0].description ,
        temp : this.tocelsius(response.main.temp),
        h :this.tocelsius(response.main.temp_max) ,
        l : this.tocelsius(response.main.temp_min),
        feels : this.tocelsius(response.main.feels_like),
        humidity:response.main.humidity ,
        wind : this.toKMPH(response.wind.speed),
        pressure : this.toInchesInMercury(response.main.pressure),
        icon: this.getIcon(response.weather[0].id),
        error: false,
      });
    }
    else{
      this.setState({
        error:true,
      });
    }
  }
  else{
    this.setState({
      error:true,
    });
  }

    console.log(this.state.icon);
  }

  render(){
    
      return( 
        <div  className={"App "+bgimage}>
          <main>
        <Form loadweather={this.getWeather} error={this.state.error} />
        <Weather 
        city = {this.state.city} 
        country={this.state.country}
        description={this.state.description}
        temp={(this.state.temp)}
        h= {this.state.h}
        l={this.state.l}
        feels={this.state.feels}
        humidity={this.state.humidity}
        wind={this.state.wind}
        pressure={this.state.pressure}
        icon={this.state.icon}
        />
       </main>
        </div>
      );
    }
  }




export default App;
