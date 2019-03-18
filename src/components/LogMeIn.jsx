import React, { Component } from 'react';

class LogMeIn extends Component{

    state = {
        userName : "",
        password : ""
    };

    inputChangedHandler = (event) => {
        const target = event.target;
        this.setState({[target.name]: target.value});
    };

    validateMe = () => {

        let letIn = false;
        let newUser = false;

        let users = localStorage.getItem('users');

        if (users == null) {
            letIn = true;
            newUser = true;
        } else {
            const usersDetailed = JSON.parse(localStorage.getItem('users'));
            const findUser = usersDetailed.filter(user => user.userName === this.state.userName)[0];
            if (findUser == null) {
                letIn = true;
                newUser = true;
            } else if (findUser.password === this.state.password){
                letIn = true;
            } else {
                alert("Incorrect password!");
            }
        }

        if (newUser) {
            const detailedNewUser = {
                userName: this.state.userName,
                password: this.state.password,
                city : ['Budapest', 'Bécs', 'Berlin']
            };
            if (users == null) {
                const userTosave = [detailedNewUser];
                localStorage.setItem('users', JSON.stringify(userTosave));
            } else {
                const usersDetailed = JSON.parse(localStorage.getItem('users'));
                usersDetailed.push(detailedNewUser);
                localStorage.setItem('users', JSON.stringify(usersDetailed));
            }
        }



        if (letIn) {
            const data = {
                userName: this.state.userName,
                password: this.state.password
            };
            localStorage.setItem('user', JSON.stringify(data));
        }


    };

    render() {
        return (
            <form onSubmit={this.validateMe}>
                <div>
                    <label className="control-label">Username:</label>
                    <input
                        type="text"
                        name="userName"
                        value={this.state.userName}
                        onChange={this.inputChangedHandler}
                        placeholder="Username"
                        className="form-control"
                        required={true}
                    />
                </div>
                <br/>
                <div>
                    <label className="control-label">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.inputChangedHandler}
                        placeholder="Password"
                        className="form-control"
                        required={true}
                    />
                </div>
                <br/>
                <button name="submit-login" type="submit" className="btn btn-secondary">Login</button>
            </form>
        )
    }

}

export default LogMeIn;