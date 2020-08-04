import React, { Component } from "react";
import API from '../../Util/api';
import { authenticationService } from '../../services/Auth';
import { Comment, Avatar, Tooltip } from 'antd';
import moment from 'moment';

class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: null
        };
    }

    async componentDidMount() {
        const currentUser = authenticationService.getLoggedInUser();
        const postData = {
            username: currentUser
        }
        const posts = (await API.post('/api/v1/feed', postData, { headers: { "Authorization": authenticationService.getJwt() } })).data;
        this.setState({
            posts: posts
        });
    }

    render() {
        return (
            <div>
                {this.state.posts ? this.state.posts.map(post => (
                    <Comment
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
                    />
 
                )) : <span>Loading...</span>
                }
            
            </div>
        )
    }
}


export default Feed;