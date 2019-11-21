import React, { Component } from "react";
import API from '../../Util/api';
import { Button, Input, message, Form } from 'antd';
import Follow from '../Follow/Follow';
import CreatePost from '../CreatePost/CreatePost';
import '../../styles/SimpleStyles.css';
import { authenticationService } from '../../services/Auth';

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
                    <p>
                        Profile for: {this.state.user.username} 
                        {this.state.user.username != authenticationService.getLoggedInUser() &&
                            <Follow followed={this.state.user.username} />
                        }
                    </p>
                ) : <span>Loading...</span>
                }
            </div>
        )
    }
}


export default Profile;