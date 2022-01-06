import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  HeartOutlined,
  AccountBookOutlined,
} from '@ant-design/icons';

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
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}
        >
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
              <Link to='/watchList'>
              <HeartOutlined />
                <span>Watch List</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className='site-layout' style={{ minHeight: '100vh' }}>
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
            style={{
              margin: '0 16px',
              padding: 10,
              Height: '70vh',
              overflow: 'auto',
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
