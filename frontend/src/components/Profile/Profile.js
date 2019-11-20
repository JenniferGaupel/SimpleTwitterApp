import React, { Component } from "react";
import API from '../../Util/api';
import { Button, Input, message, Form } from 'antd';
import Follow from '../Follow/Follow';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        };
    }

    async componentDidMount() {
        // Hardcoding for testing
        let token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMywiZXhwIjoxNTc0Mjk3OTg5fQ.XIieOBQHgSImwhZCICBqBjl5l9WlXghj4DG8U04v39s';
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
                        Profile for: {this.state.user.username} 
                        <Follow />
                    </p>
                ) : <span>Loading...</span>
                }
            </div>
        )
    }
}


export default Profile;