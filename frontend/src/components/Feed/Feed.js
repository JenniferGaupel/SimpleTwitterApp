import React, { Component } from "react";
import API from '../../Util/api';
import { authenticationService } from '../../services/Auth';
import { Comment, Avatar, Tooltip, Icon, Row, Col } from 'antd';
import moment from 'moment';

class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: null,
            likes: 0,
            dislikes: 0,
            action: null,
        };
    }
    like = () => {
        this.setState({
          likes: 1,
          dislikes: 0,
          action: 'liked',
        });
      };
    
    dislike = () => {
        this.setState({
          likes: 0,
          dislikes: 1,
          action: 'disliked',
        });
    };
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
        const { likes, dislikes, action } = this.state;

        const actions = [
          <span key="comment-basic-like">
            <Tooltip title="Like">
              <Icon
                type="like"
                theme={action === 'liked' ? 'filled' : 'outlined'}
                onClick={this.like}
              />
            </Tooltip>
            <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
          </span>,
          <span key=' key="comment-basic-dislike"'>
            <Tooltip title="Dislike">
              <Icon
                type="dislike"
                theme={action === 'disliked' ? 'filled' : 'outlined'}
                onClick={this.dislike}
              />
            </Tooltip>
            <span style={{ paddingLeft: 8, cursor: 'auto' }}>{dislikes}</span>
          </span>,
        ];
        return (
            <div>
                {this.state.posts ? this.state.posts.map(post => (
                    <Row type="flex" justify="center">
                        <Col span={8}>
                            <Comment
                                className="posts"
                                key={post.id}
                                actions={actions}
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
                )) : <span>Loading...</span>
                }
            
            </div>
        )
    }
}


export default Feed;