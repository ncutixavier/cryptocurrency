import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  BarChartOutlined,
  AccountBookOutlined,
} from '@ant-design/icons';
import { ToastContainer } from "react-toastify";

const { Header, Sider, Content } = Layout;

class HomePage extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <ToastContainer />
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className='logo' />
          <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
            <Menu.Item key='1'>
              <Link to='/'>
                <AccountBookOutlined />
                <span>Latest Crypto</span>
              </Link>
            </Menu.Item>
            <Menu.Item key='2'>
              <Link to='/portifolio'>
                <UserOutlined />
                <span>Portfolio</span>
              </Link>
            </Menu.Item>
            <Menu.Item key='3'>
              <Link to='/statistics'>
                <BarChartOutlined />
                <span>Statistics</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className='site-layout' style={{ height: '100vh' }}>
          <Header
            className='site-layout-background'
            style={{ padding: '0 20px', color: '#fff' }}
          >
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: this.toggle,
              }
            )}
            <span style={{ marginLeft: 10 }}>Crypto Market</span>
          </Header>
          <Content
            className='site-layout-background'
            style={{
              margin: '0 16px',
              padding: 10,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default HomePage;
