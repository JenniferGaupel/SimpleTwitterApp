import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Feed from './components/Feed/Feed';
import UserPosts from './components/UserPosts/UserPosts';
import Profile from './components/Profile/Profile';
import Users from './components/Users/Users';
import CreatePost from './components/CreatePost/CreatePost';
import Follow from './components/Follow/Follow';
import { Layout } from 'antd';
import { Route } from 'react-router-dom';

function App() {

  const { Header, Content, Footer } = Layout;
  return (
    <div className="App">
      <Layout>
          <Header>
            <NavBar />
          </Header>
          <Content>
            <Route exact path='/Signup/' component={Signup} />
            <Route exact path='/Login/' component={Login} />
            <Route exact path='/Feed/' component={Feed} />
            <Route exact path='/UserPosts/' component={UserPosts} />
            <Route exact path='/Profile/' component={Profile} />
            <Route exact path='/Users/' component={Users} />
            <Route exact path='/CreatePost/' component={CreatePost} />
            <Route exact path='/Follow/' component={Follow} />
          </Content>
      </Layout>
    </div>
  );
}

export default App;
