import React, {Component, Fragment} from 'react';

class Logout extends Component {

    componentDidMount() {
        localStorage.removeItem('user');
        this.props.history.push('/');
    }

    render() {
        return (
            <Fragment>

            </Fragment>
        )
    }

}

export default Logout;