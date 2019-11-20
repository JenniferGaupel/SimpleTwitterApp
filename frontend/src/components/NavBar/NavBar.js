import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

class NavBar extends React.Component {
    state = {
        current: 'feed',
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    render() {
        return (
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                <Menu.Item key="feed">
                    <Link to='/Feed'>
                        <Icon type="user-add" />
                        Feed
                    </Link>
                </Menu.Item>
                <Menu.Item key="profile">
                    <Link to='/Profile'>
                        <Icon type="user-add" />
                        Profile
                    </Link>
                </Menu.Item>
                <Menu.Item key="users">
                    <Link to='/Users'>
                        <Icon type="user-add" />
                        All Users
                    </Link>
                </Menu.Item>
                <Menu.Item key="userposts">
                    <Link to='/UserPosts'>
                        <Icon type="user-add" />
                        Posts
                    </Link>
                </Menu.Item>              
                <Menu.Item key="signup">
                    <Link to='/Signup'>
                        <Icon type="user-add" />
                        Signup
                    </Link>
                </Menu.Item>
                <Menu.Item key="createpost">
                    <Link to='/CreatePost'>
                        <Icon type="user-add" />
                        Create Post
                    </Link>
                </Menu.Item>
                <Menu.Item key="login">
                    <Link to='/Login'>
                        <Icon type="user-add" />
                        Login
                    </Link>
                </Menu.Item>
            </Menu>
        );
    }
}

export default NavBar;