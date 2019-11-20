import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import styles from '../../styles/SimpleStyles.css';

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
                        <Icon type="container" />
                        Feed
                    </Link>
                </Menu.Item>
                <Menu.Item key="profile">
                    <Link to='/Profile'>
                        <Icon type="robot" />
                        Profile
                    </Link>
                </Menu.Item>
                <Menu.Item key="users">
                    <Link to='/Users'>
                        <Icon type="team" />
                        All Users
                    </Link>
                </Menu.Item>              
                <Menu.Item key="signup">
                    <Link to='/Signup'>
                        <Icon type="user-add" />
                        Signup
                    </Link>
                </Menu.Item>
                <Menu.Item key="login">
                    <Link to='/Login'>
                        <Icon type="user" />
                        Login
                    </Link>
                </Menu.Item>
            </Menu>
        );
    }
}

export default NavBar;