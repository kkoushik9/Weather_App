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
    } ; 
    this.getWeather();
  }

   tocelsius = (temperatureInKelvin) => {return Math.floor(temperatureInKelvin - 273.15)} ;
   toKMPH = (speedInmps)=>{ return  (speedInmps * 3.6).toFixed(1) }
   toInchesInMercury = (pressurein_hPa)=>{ return (pressurein_hPa * 0.02953).toFixed(2) }
  
  getWeather = async ()=>{
    const api_response = await fetch(`http://${weatherApi.base}weather?q=London,uk&appid=${weatherApi.key}`)
    const response = await api_response.json();
    console.log(response);

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
    })
  }

  render(){
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
     />
   
    </div>
    );
  }
}



export default App;
