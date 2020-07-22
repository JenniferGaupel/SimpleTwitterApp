import React, { Component } from "react";
import API from '../../Util/api';
import { Link } from 'react-router-dom';
import { authenticationService } from '../../services/Auth';
import { Avatar } from 'antd';

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null
        };
    }

    async componentDidMount() {
        const users = (await API.get('/api/v1/users', { headers: { "Authorization": authenticationService.getJwt() } })).data;
        this.setState({
            users: users
        });
    }

    render() {
        return (
            <div>
                {this.state.users ? this.state.users.map(user => (
                    <p>
                        <Avatar src="http://placekitten.com/200/300" alt="Avatar" size="large" />
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