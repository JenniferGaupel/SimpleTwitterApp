import React, { Component } from "react";
import API from '../../Util/api';
import { authenticationService } from '../../services/Auth';
import '../../styles/SimpleStyles.css';
import {  Comment, Icon, Tooltip, Avatar, Row, Col } from 'antd';
import moment from 'moment';

class UserPosts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: null,
        };
    }

    async componentDidMount() {
        const username = this.props.username;
        const posts = (await API.get(`/api/v1/UserPosts/${username}`, { headers: { "Authorization": authenticationService.getJwt() } })).data;
        this.setState({
            posts: posts
        });
    }

    render() {
        return (
            <div>
                <p>Your posts: </p>
                {this.state.posts ? this.state.posts.map(post => (
                    <Row type="flex" justify="center">
                        <Col span={8}>
                            <Comment
                                className="posts"
                                key={post.id}
                                author={<a>{post.username}</a>}
                                avatar={
                                    <Avatar src="http://placekitten.com/200/300" alt="Avatar" size="large" />
                                }
                                content={
                                    <p>
                                        {post.post} 
                                    </p>
                                }
                                datetime={
                                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                    <span>{moment().fromNow()}</span>
                                    </Tooltip>
                                }
                            />
                        </Col>
                    </Row>
                )) : <span>no posts...</span>
                }
            </div>
        )
    }
}

export default UserPosts;