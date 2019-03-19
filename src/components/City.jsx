import React, {Component} from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class City extends Component {

    removeCity = () => {
        const actualUser = JSON.parse(localStorage.getItem('user'));
        const usersDetailed = JSON.parse(localStorage.getItem('users'));
        const findUser = usersDetailed.filter(user => user.userName === actualUser.userName)[0];

        const newCity = findUser.city.filter(city => city !== this.props.city);
        findUser.city = newCity;

        const userDetailedModify = usersDetailed.filter(user => user.userName !== actualUser.userName);
        userDetailedModify.push(findUser);
        localStorage.setItem('users', JSON.stringify(userDetailedModify));
    };

    render() {

        const actualCelsius = () => {
            const findCelsius = this.props.cityWheaters.filter(cityOfWheater =>
                cityOfWheater.name === this.props.city
            )[0];

            let celsius = "";
            let humidity = "";
            let pressure = "";
            let wind = "";
            if (findCelsius !== undefined) {
                celsius = "" + (Math.round((findCelsius.main.temp - 273.15) * 100) / 100) + " Celsius";
                humidity = "" + findCelsius.main.humidity + " %";
                pressure = "" + findCelsius.main.pressure + " hPa";
                wind = "" + findCelsius.wind.speed +  "strenght with the direction of " + findCelsius.wind.deg;

            }



            return (
              <div>
                  Actual temperature: {celsius} Celsius
                  <br/>
                  Humidity: {humidity}
                  <br/>
                  Pressure: {pressure}
                  <br/>
                  Wind: {wind}
              </div>
            );
        };

        const forecast = () => {
            const findForecast = this.props.cityWheatersForecast.filter(cityOfWheater =>
                cityOfWheater.city.name === this.props.city
            )[0];



            let data = [];
            if (findForecast !== undefined) {
                findForecast.list.forEach(time => {
                    const timePoint = {
                        time : 1, //time.dt
                        temp : Math.round((time.main.temp - 273.15) * 100) / 100
                    };
                    data.push(timePoint);
                })
            }

            console.log(data)
            return (
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="temp" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="time" stroke="#82ca9d" />
                </LineChart>
            )
        };


        return (
            <div>
                <h1>{this.props.city}</h1>

                {actualCelsius()}
                {forecast()}



                <form onSubmit={this.removeCity}>
                    <button> Remove city</button>
                </form>
            </div>
        );

    }

};

export default City;

