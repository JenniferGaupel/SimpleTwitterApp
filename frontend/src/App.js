import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/navBar';
import { Layout } from 'antd';

function App() {

  const { Header, Content, Footer } = Layout;
  return (
    <div className="App">
      <Layout>
        <Header>
          <NavBar />
        </Header>
      </Layout>
    </div>
  );
}

export default App;
