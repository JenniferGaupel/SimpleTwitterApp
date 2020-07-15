import React, { Component } from "react";
import API from '../../Util/api';
import { authenticationService } from '../../services/Auth';
import '../../styles/SimpleStyles.css';

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
            <div className='Post-align'>
                {this.state.posts ? this.state.posts.map(post => (
                    <p>
                        {post.post}
                    </p> 
                )) : <span>no posts...</span>
                }
            </div>
        )
    }
}


export default UserPosts;