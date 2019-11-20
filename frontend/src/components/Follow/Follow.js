import React, { Component } from "react";
import API from '../../Util/api';
import { Button, Input, message, Form } from 'antd';

class Follow extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }


    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    getPostData = () => {

        return {
            follower_id: 2,
            followed_id: 1
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log("Creating our following");
        // Hardcoding for testing
        let token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1NzQyNjk4Mzd9.X-HzLpdIR7LIuCVQonrKUd4JZH2jsJdn3d_tT49MF9c';
        API.post('/api/v1/followings', this.getPostData(), { headers: { "Authorization": `Bearer ${token}` }})
            .then((res) => {
                console.log(res);
                message.success("Follow succesful!");
                this.props.history.push('/');                
            });
    }


    render() {
        return (
            <div className="Follow">
                <Form onSubmit={this.handleSubmit}>
                    <div id="Follow">
                        <label>Follow</label>
                    </div>
                    <Button type="primary" htmlType="submit">
                        Follow
                    </Button>
                </Form>
            </div>
        )
    };
}


export default Follow;