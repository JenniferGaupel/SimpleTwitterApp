import React, { Component } from "react";
import API from '../../Util/api';
import { Button, Input, message, Form } from 'antd';

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null
        };
    }

    async componentDidMount() {
        // Hardcoding for testing
        let token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1NzQyNjk4Mzd9.X-HzLpdIR7LIuCVQonrKUd4JZH2jsJdn3d_tT49MF9c';
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
                        {user.username} 
                    </p>
                )) : <span>Loading...</span>
                }
            </div>
        )
    }
}


export default Users;