import React, {Component} from 'react';

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
        return (
            <div>
                <h1>{this.props.city}</h1>
                <form onSubmit={this.removeCity}>
                    <button> Remove city</button>
                </form>
            </div>
        );
    }

};

export default City;

