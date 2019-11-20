import React, { Component } from "react";
import API from '../../Util/api';
import { Button, Input, message, Form } from 'antd';

class Login extends Component {
    constructor(props) {
        super(props);

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
                message.success("Login succesful!");
                this.props.history.push('/');                
            });
    }

    validateForm() {
        return this.state.password.length > 0
            && this.state.username.length > 0;
    }


    render() {
        return (
            <div className="Login">
                <Form onSubmit={this.handleSubmit}>
                    <div id="username">
                        <label>Username</label>
                        <Input
                            id="username"
                            type="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div id="password">
                        <label>Password</label>
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