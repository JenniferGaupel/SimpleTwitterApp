import React, { Component } from "react";
import API from '../../Util/api';
import { Button, Input, message, Form } from 'antd';

class Follow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFollowing: null,
            loading: true
        };
    }


    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    getPostData = () => {

        return {
            follower_id: 13,
            followed_id: 14
        }
    }

    async componentDidMount() {
        // Hardcoding for testing
        let token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMywiZXhwIjoxNTc0Mjk3MjQ1fQ.zSCcPIG0nvUvAWCl7J_PsPHXGy4aCsuVyZEazjAKFyY';
        //const users2 = (await API.get('/users')).data;
        const isFollowing = (await API.post('/api/v1/checkfollowings/', this.getPostData(), { headers: { "Authorization": `Bearer ${token}` } })).data;
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
        // Hardcoding for testing
        let token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMywiZXhwIjoxNTc0Mjk3MjQ1fQ.zSCcPIG0nvUvAWCl7J_PsPHXGy4aCsuVyZEazjAKFyY';

        if (!this.state.isFollowing) {
            API.post('/api/v1/followings', this.getPostData(), { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => {
                this.setState({
                    isFollowing: true,
                    loading: false
    
                });
                message.success("Follow successful!");
            });

        } else {
            API.delete('/api/v1/unfollow', this.getPostData(), { headers: { "Authorization": `Bearer ${token}` } })
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