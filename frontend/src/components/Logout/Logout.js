import React, { Component } from "react";
import API from '../../Util/api';
import { Button, Input, message, Form } from 'antd';
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

    logoutClick = event => {
        authenticationService.logout();
        // hack to get the navbar to rerender
        // TODO: fix this
        this.props.history.push('/');
        window.location.reload(false);
    }

    render() {
        return (
            <div className="Logout">
                    <Button type="primary" htmlType="submit" onClick={() => this.logoutClick()}>
                        Logout
                    </Button>
            </div>
        )
    };
}



export default Logout;