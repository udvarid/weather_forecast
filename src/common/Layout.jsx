import React from 'react';
import {Route, Switch} from 'react-router-dom';
import WeatherFull from "../containers/WeatherFull";
import NavBar from "./NavBar";
import Logout from "../components/Logout";

function Layout() {
    return (
        <div className="layout__container">
            <NavBar/>
            <div>
                <Switch>
                    <Route path="/" exact component={WeatherFull}/>
                    <Route path="/Logout" exact component={Logout}/>
                </Switch>
            </div>
        </div>
    )
}


export default Layout;