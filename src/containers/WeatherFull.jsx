import React, {Component} from 'react';
import LogMeIn from "../components/LogMeIn/LogMeIn";
import Weather from "../components/Weather";

class WeatherFull extends Component {

    render() {

        const username = localStorage.getItem('user');

        let logMeOrShowWheater = () => {
            return (
                <LogMeIn/>
            )
        };

        if (username != null) {
            logMeOrShowWheater = () => {
                return (
                    <Weather/>
                )
            }
        }

        return (
            <div>
                {logMeOrShowWheater()}
            </div>
        )
    }

}

export default WeatherFull;