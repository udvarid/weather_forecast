import React, {Component, Fragment} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import City from "./City";
import NewCity from "./NewCity";
import axios from 'axios';


class Weather extends Component {

    state = {
        value: 0,
        cityWheaters: [],
        cityWheatersForecast: []
    };

    apiKey = "&APPID=238cdb33fecb304d0a38c4481c4d4614";

    handleChange = (event, value) => {
        this.setState({value});
    };

    componentDidMount() {
        const actualUser = JSON.parse(localStorage.getItem('user'));
        const usersDetailed = JSON.parse(localStorage.getItem('users'));
        const findUser = usersDetailed.filter(user => user.userName === actualUser.userName)[0];

        findUser.city.forEach(city => {
            axios.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + this.apiKey)
                .then(response => {
                    let cityWheatersPuffer = [...this.state.cityWheaters];
                    cityWheatersPuffer.push(response.data);
                    this.setState(
                        {
                            cityWheaters: cityWheatersPuffer
                        }
                    );
                })
                .catch(error => console.warn(error));

            axios.get('http://api.openweathermap.org/data/2.5/forecast?q=' + city + this.apiKey)
                .then(response => {
                    let cityWheatersForecastPuffer = [...this.state.cityWheatersForecast];
                    cityWheatersForecastPuffer.push(response.data);
                    this.setState(
                        {
                            cityWheatersForecast: cityWheatersForecastPuffer
                        }
                    );
                })
                .catch(error => console.warn(error));
        });

    }


    render() {

        const actualUser = JSON.parse(localStorage.getItem('user'));
        const usersDetailed = JSON.parse(localStorage.getItem('users'));
        const findUser = usersDetailed.filter(user => user.userName === actualUser.userName)[0];

        const cityNames = findUser.city.map(city => {

            const findCelsius = this.state.cityWheaters.filter(cityOfWheater =>
                cityOfWheater.name === city
            )[0];

            let celsius = "";
            if (findCelsius !== undefined) {
                celsius = "" + (Math.round((findCelsius.main.temp - 273.15) * 100) / 100) + " Celsius";
            }


            return (
                <Tab label={city + " : " + celsius}/>
            )
        });

        let city = () => {

            return (
                <City city={findUser.city[this.state.value]}
                      cityWheaters = {[...this.state.cityWheaters]}
                      cityWheatersForecast = {[...this.state.cityWheatersForecast]}/>
            )
        };

        if (this.state.value === findUser.city.length) {
            city = () => {
                return (
                    <NewCity/>
                )
            };
        }


        return (
            <div>
                <AppBar position="static">
                    <Tabs value={this.state.value} onChange={this.handleChange}>
                        {cityNames}
                        <Tab label="+"/>
                    </Tabs>
                </AppBar>

                {city()}

            </div>
        )
    }


}

export default Weather;