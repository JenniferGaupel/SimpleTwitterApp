import React, { Component } from "react";
import API from '../../Util/api';
import { Button, Input, message, Form } from 'antd';
import Follow from '../Follow/Follow';
import CreatePost from '../CreatePost/CreatePost';
import '../../styles/SimpleStyles.css';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        };
    }

    async componentDidMount() {
        // Hardcoding for testing
        let token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1NzQzNTIxNzh9.mot78VjfPwP2qS4TTxxzxBPgTKXJCgx4IIDC8dmJ3qQ';
        const { match: {params } } = this.props;
        const user = (await API.get(`/api/v1/users/${params.username}`, { headers: { "Authorization": `Bearer ${token}` } })).data;
        this.setState({
            user: user
        });
    }

    render() {
        return (
            <div>
                {this.state.user ? (
                    <p>
                        Profile for: {this.state.user.username} <br/>
                        <Follow /><br/>
                        <CreatePost />
                    </p>
                ) : <span>Loading...</span>
                }
            </div>
        )
    }
}


export default Profile;