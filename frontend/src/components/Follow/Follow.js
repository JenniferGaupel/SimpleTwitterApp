import React, { Component } from "react";
import API from '../../Util/api';
import { Button, Input, message, Form } from 'antd';
import { authenticationService } from '../../services/Auth';

class Follow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFollowing: null,
            loading: true,
        };
    }


    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    async componentDidMount() {
        const followed  = this.props.followed;
        const currentUser = authenticationService.getLoggedInUser();
        const postData = {
            follower_id: currentUser,
            followed_id: followed
        }
        const isFollowing = (await API.post('/api/v1/checkfollowings/', postData, { headers: { "Authorization": authenticationService.getJwt() } })).data;
        console.log(isFollowing);
        this.setState({
            isFollowing: isFollowing.result,
            loading: false
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        
        this.setState({
            loading: true
        });

        if (!this.state.isFollowing) {
            API.post('/api/v1/followings', this.getPostData(), { headers: { "Authorization": authenticationService.getJwt() } })
            .then((res) => {
                this.setState({
                    isFollowing: true,
                    loading: false
    
                });
                message.success("Follow successful!");
            });

        } else {
            API.delete('/api/v1/unfollow', this.getPostData(), { headers: { "Authorization": authenticationService.getJwt() } })
            .then((res) => {
                this.setState({
                    isFollowing: false,
                    loading: false

                });
                message.success("Unfollow successful!");
            });
        }
    }


    render() {
        return (
            <div className="Follow">
                <Form onSubmit={this.handleSubmit}>
                    {this.state.isFollowing ?
                        <Button loading={this.state.loading} type="primary" htmlType="submit">
                            Unfollow
                        </Button>
                        :
                        <Button loading={this.state.loading} type="primary" htmlType="submit">
                            Follow
                        </Button>
                    }
                </Form>
            </div>
        )
    };
}


export default Follow;