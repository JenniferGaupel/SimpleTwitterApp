import React, { Component } from "react";
import API from '../../Util/api';
import { Button, Input, message, Form } from 'antd';
import '../../styles/SimpleStyles.css';
import { authenticationService } from '../../services/Auth';

class Login extends Component {
    constructor(props) {
        super(props);

        // redirect to home if already logged in
        if (!authenticationService.isUserLoggedIn) { 
            this.props.history.push('/');
        }

        this.state = {
            password: "",
            username: ""
        };
    }


    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    getPostData = () => {
        return {
            username: this.state.username, 
            password: this.state.password
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log("Posting our user");
        API.post('/api/v1/auth/login', this.getPostData())
            .then((res) => {
                console.log(res);
                localStorage.setItem('jwt', res.data.token);
                localStorage.setItem('username', res.data.username);
                message.success("Login succesful!");
                // hack to get the navbar to reload
                // TODO: fix this
                this.props.history.push('/');
                window.location.reload(false);            
            }).catch(error => {
                message.error("Incorrect username or password.");
            });

    }

    validateForm() {
        return this.state.password.length > 0
            && this.state.username.length > 0;
    }


    render() {
        return (
            <div className="Signup">
                <Form onSubmit={this.handleSubmit}>
                    <div id="username">
                        <label>Username: </label>
                        <Input
                            id="username"
                            type="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div id="password">
                        <label>Password: </label>
                        <Input
                            id="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </div>
                    <Button type="primary" disabled={!this.validateForm()} htmlType="submit">
                        Login
                    </Button>
                </Form>
            </div>
        )
    };
}


export default Login;