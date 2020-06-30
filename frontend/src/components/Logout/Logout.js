import React, { Component } from "react";
import { Link } from 'react-router-dom';
import API from '../../Util/api';
import { Button, Input, message, Form } from 'antd';
import '../../styles/SimpleStyles.css';
import { authenticationService } from '../../services/Auth';
import Signup from "../Signup/Signup";

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