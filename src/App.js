import React from 'react';
import './App.css'
import Weather from './components/weather'


const weatherApi = {
  key: "44e9b743150314bcf15e72b3d5efc42e",
  base: "api.openweathermap.org/data/2.5/"
}

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
    } ; 


    this.getWeather();

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
       case iconId>=200 && iconId<=232 :
       return this.weatherIcon.Thunderstorm;

       case iconId>=300 && iconId<=331 :
       return this.weatherIcon.Drizzle;

       case iconId>=500 && iconId<=531 :
       return this.weatherIcon.Rain;

       case iconId>=600 && iconId<=622 :
       return this.weatherIcon.Snow;

       case iconId>=701 && iconId<=781 :
       return this.weatherIcon.Atmosphere;

       case iconId===800 :
       return this.weatherIcon.Clear;

       case iconId>=801 && iconId<=804 :
       return this.weatherIcon.Clouds;

       default:
       return this.weatherIcon.Default;
     }
    };
  
  getWeather = async ()=>{
    const api_response = await fetch(`http://${weatherApi.base}weather?q=Charlotte&appid=${weatherApi.key}`)
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
      })
    }

    console.log(this.state.icon);
  }

  render(){
    console.log("City name : " + this.state.city);
    if(this.state.city==="")
    {
      return(<h1 > ERROR 404 !! City Not Found. Please Enter the Name of the city correctly.</h1>);
    }
    else{
      return( 
        <div  className="App ">
        
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
      
        </div>
      );
    }
  }
}



export default App;
