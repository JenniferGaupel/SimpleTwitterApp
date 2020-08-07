import React, { Component } from "react";
import { Link } from 'react-router-dom';
import API from '../../Util/api';
import { authenticationService } from '../../services/Auth';
import '../../styles/SimpleStyles.css';
import {  Comment } from 'antd';

class FollowList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            followlists: null
        };
    }

    async componentDidMount() {
        const username = this.props.username;
        const followlists = (await API.get(`/api/v1/FollowList/${username}`, { headers: { "Authorization": authenticationService.getJwt() } })).data;
        this.setState({
            followlists: followlists
        });
    }

    render() {
        return (
            <div>
                <p>Users you follow:</p>
                {this.state.followlists ? this.state.followlists.map(followlist => (
                    <Comment 
                        key={followlist}
                        content={<p>{followlist}</p>}
                    />
                )) : <span>You aren't following anyone. <Link to='/Users'>Follow someone!</Link>
                </span>
                }
            </div>
        )
    }
}


export default FollowList;