import React from 'react'

function Weather(props) {

   
    return(
        <div className="container text-light">
            <div className="cards">
                <h1 className="mt-5">{props.city} ,{props.country} </h1>
                
                <h3 className="py-1">{props.description}</h3>
                <h3 className="pt-2 m-0">
                    <div className="fl">
                        <i className="wi wi-day-sunny display-3"> </i>
                        <b className="display-2 pl-3">{props.temp}&deg;c</b>
                    </div>
                    
                </h3>
                <h5 className="pt-3">H : {props.h}&deg;c | L : {props.l}&deg;c</h5>
                <table className="table table-active text-light mt-4">
                    <tbody>
                    <tr>
                        <td>
                            Feels Like
                        </td>
                        <td >
                            {props.feels}&deg;c
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Humidity
                        </td>
                        <td>
                            {props.humidity}%
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Wind Speed
                        </td>
                        <td>
                            {props.wind}kmph
                        </td>
                    </tr>
                    <tr className="">
                        <td>
                            Pressure
                        </td>
                        <td>
                            {props.pressure}in
                        </td>
                    </tr>
                   </tbody> 
                </table>
                
            </div>
        </div>
    );
}

export default Weather;
