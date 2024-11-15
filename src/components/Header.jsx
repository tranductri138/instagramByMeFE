import React, { useState } from 'react';
import { Layout, Menu, Avatar, Modal, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { HomeOutlined, PlusSquareOutlined, HeartOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import UploadModal from './UploadModal';

const { Header: AntHeader } = Layout;

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); // Giả sử bạn lưu thông tin người dùng vào localStorage
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleUpload = ({ caption, file }) => {
    // Gọi API để tải lên file và lưu thông tin bài viết
    // Ở đây chỉ là ví dụ đơn giản
    console.log('Uploading:', { caption, file });
    message.success('Post uploaded successfully!');
    setIsModalVisible(false);
    // Cập nhật feed sau khi tải lên (nếu cần)
  };

  return (
    <AntHeader style={{ position: 'fixed', zIndex: 1, width: '100%', display: 'flex', alignItems: 'center' }}>
      <div className="logo">
        <Link to="/" style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>InstagramByMe</Link>
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ flex: 1, justifyContent: 'center' }}>
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/">Feed</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<PlusSquareOutlined />} onClick={() => setIsModalVisible(true)}>
          Upload
        </Menu.Item>
        <Menu.Item key="3" icon={<HeartOutlined />}>
          <Link to="/notifications">Notifications</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<MessageOutlined />}>
          <Link to="/messaging">Messaging</Link>
        </Menu.Item>
      </Menu>
      {user ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to={`/profile/${user.username}`}>
            <Avatar src={user.profilePicture} icon={<UserOutlined />} />
          </Link>
          <a onClick={handleLogout} style={{ color: 'white', marginLeft: '20px' }}>Logout</a>
        </div>
      ) : (
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['5']}>
          <Menu.Item key="5">
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="/register">Register</Link>
          </Menu.Item>
        </Menu>
      )}
      <UploadModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onUpload={handleUpload}
      />
    </AntHeader>
  );
}

export default Header;
