import React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Feed from './components/Feed/Feed';
import Profile from './components/Profile/Profile';
import Users from './components/Users/Users';
import CreatePost from './components/CreatePost/CreatePost';
import Follow from './components/Follow/Follow';
import Logout from './components/Logout/Logout';
import { Layout } from 'antd';
import { Route } from 'react-router-dom';
import UserPosts from './components/UserPosts/UserPosts';
import FollowList from './components/FollowList/FollowList';

function App() {

  const { Header, Content, Footer } = Layout;
  return (
    <div className="App">
      <Layout style={{ minHeight: "100vh" }}>
          <Header>
            <NavBar />
          </Header>
          <Content style={{ margin: "0 0px" }}>
            <Route exact path="/" component={Feed} />
            <Route exact path='/Signup/' component={Signup} />
            <Route exact path='/Login/' component={Login} />
            <Route exact path='/Feed/' component={Feed} />
            <Route exact path='/Users/' component={Users} />
            <Route exact path='/CreatePost/' component={CreatePost} />
            <Route exact path='/Follow/' component={Follow} />
            <Route exact path='/Profile/:username' component={Profile} />
            <Route exact path='/Logout/' component={Logout} />
            <Route exact path='/UserPosts/:username' component={UserPosts} />
            <Route exact path='/FollowList/:username' component={FollowList} />
          </Content>
      </Layout>
    </div>
  );
}

export default App;
