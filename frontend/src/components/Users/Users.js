import React, { Component } from "react";
import API from '../../Util/api';
import { Button, Input, message, Form } from 'antd';
import { Link } from 'react-router-dom';

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null
        };
    }

    async componentDidMount() {
        // Hardcoding for testing
        let token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMywiZXhwIjoxNTc0Mjk3MjQ1fQ.zSCcPIG0nvUvAWCl7J_PsPHXGy4aCsuVyZEazjAKFyY';
        //const users2 = (await API.get('/users')).data;
        const users = (await API.get('/api/v1/users', { headers: { "Authorization": `Bearer ${token}` } })).data;
        this.setState({
            users: users
        });
    }

    render() {
        return (
            <div>
                {this.state.users ? this.state.users.map(user => (
                    <p>
                        <Link to={`/Profile/${user.username}`}>
                            {user.username} 
                        </Link>
                    </p>
                )) : <span>Loading...</span>
                }
            </div>
        )
    }
}


export default Users;