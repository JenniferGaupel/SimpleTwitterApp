import React, { Component } from "react";
import API from '../../Util/api';
import { Button, Input, message, Form } from 'antd';

class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            feed: null
        };
    }

    async componentDidMount() {
        // Hardcoding for testing
        let token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1NzQyNjk4Mzd9.X-HzLpdIR7LIuCVQonrKUd4JZH2jsJdn3d_tT49MF9c';
        const feed = (await API.get('/api/v1/posts', { headers: { "Authorization": `Bearer ${token}` } })).data;
        this.setState({
            feed: feed
        });
    }

    render() {
        return (
            <div>
                {this.state.feed ? this.state.feed.map(feed => (
                            <p>
                                {feed.post}
                            </p>
                    )) : <span>Loading...</span>
                }
            </div>
        )
    }
}


export default Feed;