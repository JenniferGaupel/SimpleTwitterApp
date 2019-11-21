import React, { Component } from "react";
import API from '../../Util/api';
import { Button, Input, message, Form } from 'antd';
import { Link } from 'react-router-dom';
import { authenticationService } from '../../services/Auth';

class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: null
        };
    }

    async componentDidMount() {
        const posts = (await API.get('/api/v1/feed', { headers: { "Authorization": authenticationService.getJwt() } })).data;
        this.setState({
            posts: posts
        });
    }

    render() {
        return (
            <div>
                {this.state.posts ? this.state.posts.map(post => (
                    <p>
                        
                            {post} 
                        
                    </p> 
                )) : <span>Loading...</span>
                }
            
            </div>
        )
    }
}


export default Feed;