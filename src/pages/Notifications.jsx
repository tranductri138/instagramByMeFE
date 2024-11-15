import React, { useEffect, useState } from 'react';
import { List, Avatar, Typography } from 'antd';
import { UserOutlined, HeartOutlined, CommentOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title } = Typography;

// Giả sử dữ liệu thông báo được lấy từ API
const mockNotifications = [
  {
    id: 1,
    type: 'like',
    from: {
      username: 'user2',
      profilePicture: 'https://via.placeholder.com/40',
    },
    postId: 1,
    createdAt: '2024-04-27',
  },
  {
    id: 2,
    type: 'comment',
    from: {
      username: 'user3',
      profilePicture: 'https://via.placeholder.com/40',
    },
    postId: 2,
    comment: 'Nice photo!',
    createdAt: '2024-04-26',
  },
  // Thêm nhiều thông báo khác
];

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Gọi API để lấy thông báo
    // Ở đây chỉ sử dụng dữ liệu giả
    setNotifications(mockNotifications);
  }, []);

  const renderNotification = item => {
    let action;
    switch (item.type) {
      case 'like':
        action = <HeartOutlined style={{ color: 'red' }} />;
        break;
      case 'comment':
        action = <CommentOutlined style={{ color: 'blue' }} />;
        break;
      default:
        action = <UserOutlined />;
    }

    return (
      <List.Item
        key={item.id}
        actions={[action]}
      >
        <List.Item.Meta
          avatar={<Avatar src={item.from.profilePicture} icon={<UserOutlined />} />}
          title={<Link to={`/profile/${item.from.username}`}>{item.from.username}</Link>}
          description={
            item.type === 'like' ? (
              'liked your post.'
            ) : (
              <>
                commented on your post: <em>"{item.comment}"</em>
              </>
            )
          }
        />
        <div>{item.createdAt}</div>
      </List.Item>
    );
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', paddingTop: '20px' }}>
      <Title level={2}>Notifications</Title>
      <List
        itemLayout="horizontal"
        dataSource={notifications}
        renderItem={item => renderNotification(item)}
      />
    </div>
  );
}

export default Notifications;
