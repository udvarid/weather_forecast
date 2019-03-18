import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

function NavBar() {

    const username = localStorage.getItem('user');

    let logMeOut = () => {
        return (
            <Fragment>
                Please log in
            </Fragment>
        )
    };

    if (username != null) {
        logMeOut = () => {
            return (
                <div className="navbar-nav ml-auto justify-content-right">
                    <ul className="navbar-nav ml-auto justify-content-right">
                        <li className="nav-item"><Link className="nav-link" to="/Logout">Logout</Link></li>
                    </ul>
                </div>
            )
        }
    }


    return (
        <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-primary">

            <div className="container">

                <div id="myNavbar" className="navbar-collapse collapse">
                    {logMeOut()}
                </div>
            </div>

        </nav>
    )

}

export default NavBar;