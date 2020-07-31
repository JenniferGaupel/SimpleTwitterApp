import React, { Component } from "react";
import API from '../../Util/api';
import Follow from '../Follow/Follow';
import FollowList from '../FollowList/FollowList';
import '../../styles/SimpleStyles.css';
import { authenticationService } from '../../services/Auth';
import UserPosts from "../UserPosts/UserPosts";
import { Avatar } from 'antd';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        };
    }

    async componentDidMount() {
        const { match: {params } } = this.props;
        const user = (await API.get(`/api/v1/users/${params.username}`, { headers: { "Authorization": authenticationService.getJwt() } })).data;
        
        this.setState({
            user: user
        });
    }

    render() {
        return (
            <div>
                {this.state.user ? (
                    <div>
                        <Avatar src="http://placekitten.com/200/300" alt="Avatar" size="large" />
                        <p>Profile for: {this.state.user.username}</p>
                        <UserPosts username={this.state.user.username} />
                        {this.state.user.username != authenticationService.getLoggedInUser() &&
                            <Follow followed={this.state.user.username} />
                        }
                        {this.state.user.username == authenticationService.getLoggedInUser() &&
                            <FollowList username={this.state.user.username}/>
                        }
                    </div>
                ) : <span>Loading...</span>
                }
            </div>
        )
    }
}


export default Profile;