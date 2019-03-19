import React, {Component} from 'react';
import Modal from '@material-ui/core/Modal';
import './NewCity.css';


class NewCity extends Component {

    state = {
        open: true,
        cityName: ""
    };

    handleClose = () => {
      this.setState({open : false});
    };

    inputChangedHandler = (event) => {
        const target = event.target;
        this.setState({[target.name]: target.value});
    };

    addCity = () => {
        const actualUser = JSON.parse(localStorage.getItem('user'));
        const usersDetailed = JSON.parse(localStorage.getItem('users'));
        const findUser = usersDetailed.filter(user => user.userName === actualUser.userName)[0];
        findUser.city.push(this.state.cityName);

        const userDetailedModify = usersDetailed.filter(user => user.userName !== actualUser.userName);
        userDetailedModify.push(findUser);
        localStorage.setItem('users', JSON.stringify(userDetailedModify));
    };

    render() {
        const showHideClassName = this.state.open ? "modal modal-main display-block" : "modal modal-main display-none";
        return (
            <Modal
                open={this.state.open}
                onClose={this.handleClose}>
                <div className={showHideClassName}>
                    <form onSubmit={this.addCity}>
                        <div>
                            <label className="control-label">New City:</label>
                            <input
                                type="text"
                                name="cityName"
                                value={this.state.cityName}
                                onChange={this.inputChangedHandler}
                                placeholder="Name of City"
                                className="form-control"
                                required={true}
                            />
                        </div>

                        <br/>
                        <button name="submit-login" type="submit" className="btn btn-secondary">Add city</button>
                    </form>
                </div>

            </Modal>
        )
    }

};

export default NewCity;