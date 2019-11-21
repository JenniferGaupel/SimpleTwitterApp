import React, { Component } from "react";
import API from '../../Util/api';
import { Button, Input, message, Form } from 'antd';
import { authenticationService } from '../../services/Auth';

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feed: null,
        };
    }

    async componentDidMount() {
        const { match: {params } } = this.props;
        const feed = (await API.get(`/api/v1/feed/${params.username}`, { headers: { "Authorization": authenticationService.getJwt() } })).data;
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