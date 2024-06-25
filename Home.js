import React from 'react';
import { ConfigProvider, Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'; // Import Link for navigation

const { Header, Content } = Layout;

const Home = () => {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <ConfigProvider
          theme={{ token: { colorPrimary: '#808080' } }}
        >
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
            <Menu.Item key="home">Home</Menu.Item>
            <Menu.Item key="about">About Us</Menu.Item>
            <Menu.Item key="products">Products</Menu.Item>
            <Menu.Item key="feedback">Feedback Form</Menu.Item>
            <Menu.Item key="todo">
              <Link to="/todo">Todo</Link>
            </Menu.Item>
          </Menu>
        </ConfigProvider>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div className="site-layout-content">
          <h1>Hello!</h1>
          <p>Welcome to our website.</p>
        </div>
      </Content>
    </Layout>
  );
};

export default Home;
