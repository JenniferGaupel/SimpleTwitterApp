import React, { Component } from "react";
import API from '../../Util/api';
import { Button, Input, message, Form } from 'antd';
import '../../styles/SimpleStyles.css';
import { authenticationService } from '../../services/Auth';

class CreatePost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postText: ""
        };
    }


    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    getPostData = () => {

        return {
            post: this.state.postText, 
            username: authenticationService.getLoggedInUser()
            
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log("Creating our post");
        API.post('/api/v1/posts', this.getPostData(),{ headers: { "Authorization": authenticationService.getJwt() }})
            .then((res) => {
                console.log(res);
                message.success("New post succesful!");
                this.props.history.push('/');                
            });
    }

    validateForm() {
        return this.state.postText.length > 0
            && this.state.postText.length < 258;
    }


    render() {
        return (
            <div className="Post">
                <Form onSubmit={this.handleSubmit}>
                    <div id="postText">
                        <label>Create Post </label><br/>
                        <Input
                            id="postText"
                            type="TextArea"
                            value={this.state.postText}
                            onChange={this.handleChange}
                        />
                    </div>
                    <Button type="primary" disabled={!this.validateForm()} htmlType="submit">
                        Post
                    </Button>
                </Form>
            </div>
        )
    };
}


export default CreatePost;