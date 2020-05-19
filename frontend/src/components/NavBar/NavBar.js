import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import styles from '../../styles/SimpleStyles.css';
import { authenticationService } from '../../services/Auth';

const { SubMenu } = Menu;

class NavBar extends React.Component {
    state = {
        current: 'feed',
        loggedIn: authenticationService.isUserLoggedIn()

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
                { authenticationService.isUserLoggedIn() &&
                    <Menu.Item key="profile">
                        <Link to={`/Profile/${authenticationService.getLoggedInUser()}`}>
                            <Icon type="user" />
                            Profile
                        </Link>
                    </Menu.Item>
                }
                { authenticationService.isUserLoggedIn() &&
                    <Menu.Item key="feed">
                        <Link to='/Feed'>
                            <Icon type="container" />
                            Feed
                        </Link>
                    </Menu.Item>
                }
                { authenticationService.isUserLoggedIn() &&
                    <Menu.Item key="createPost">
                        <Link to='/CreatePost/'>
                            <Icon type="robot" />
                            Create Post
                        </Link>
                    </Menu.Item>
                }
                { authenticationService.isUserLoggedIn() &&
                    <Menu.Item key="users">
                        <Link to='/Users'>
                            <Icon type="team" />
                            All Users
                        </Link>
                    </Menu.Item>
                }     
                { authenticationService.isUserLoggedIn() &&
                    <Menu.Item key="logout">
                        <Link to='/Logout'>
                            <Icon type="logout" />
                            Logout
                        </Link>
                    </Menu.Item>
                }
                { !authenticationService.isUserLoggedIn() &&    
                    <Menu.Item key="signup">
                        <Link to='/Signup'>
                            <Icon type="user-add" />
                            Signup
                        </Link>
                    </Menu.Item>
                }
                { !authenticationService.isUserLoggedIn() &&
                    <Menu.Item key="login">
                        <Link to='/Login'>
                            <Icon type="user" />
                            Login
                        </Link>
                    </Menu.Item>
                }
            </Menu>
        );
    }
}

export default NavBar;