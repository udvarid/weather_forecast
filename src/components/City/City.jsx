import React, {Component, Fragment} from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import './City.css';

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
                wind = "" + findCelsius.wind.speed + " meter/sec with the direction of " + findCelsius.wind.deg + " degrees";

            }


            return (
                <div className="actual-block">
                    <h6>Actual temperature: {celsius}</h6>
                    <br/>
                    <h6>Humidity: {humidity}</h6>
                    <br/>
                    <h6>Pressure: {pressure}</h6>
                    <br/>
                    <h6>Wind: {wind}</h6>
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
                        time: 1,
                        temp: Math.round((time.main.temp - 273.15) * 100) / 100
                    };
                    data.push(timePoint);
                })
                console.log(data);
            }

            return (
                <div className="forecast">
                    <h5>5 day forecast</h5>
                    <LineChart
                        width={500}
                        height={140}
                        data={data}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="temp" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </div>

            )
        };



        return (
            <div>
                <h1>{this.props.city}</h1>

                <div className="myFlex">
                    <div>
                        {actualCelsius()}
                    </div>
                    <div>
                        {forecast()}
                    </div>
                </div>

                <br/>
                <br/>
                <br/>
                <br/>
                <br/>

                <form onSubmit={this.removeCity} className="delete-button">
                    <button> Remove city</button>
                </form>
            </div>
        );

    }

};

export default City;

