import React, { Component } from "react";
import '../../styles/SimpleStyles.css';
import { authenticationService } from '../../services/Auth';

class Logout extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    async componentDidMount() {
        authenticationService.logout();

    }

    render() {
        // hack to get the navbar to rerender
        // TODO: fix this
        this.props.history.push('/');
        window.location.reload(false);
        return (
            <div className="Logout">\
            </div>
        )
    };
}



export default Logout;