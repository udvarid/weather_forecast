import React, {Component, Fragment} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import City from "./City";
import NewCity from "./NewCity";

class Weather extends Component {

    state = {
        value: 0
    };

    handleChange = (event, value) => {
        this.setState({value});
    };


    render() {

        const actualUser = JSON.parse(localStorage.getItem('user'));
        const usersDetailed = JSON.parse(localStorage.getItem('users'));
        const findUser = usersDetailed.filter(user => user.userName === actualUser.userName)[0];

        const cityNames = findUser.city.map(city => {
            return (
                <Tab label={city}/>
            )
        });

        let city = () => {
            return (
                    <City city={findUser.city[this.state.value]}/>
                )
        };

        if (this.state.value === findUser.city.length) {
            city = () => {
                return (
                    <NewCity />
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