import React, { useEffect, useState } from 'react';
import { List, Card, Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title } = Typography;

// Giả sử dữ liệu bài viết được lấy từ API
const mockPosts = [
  {
    id: 1,
    user: {
      username: 'user1',
      profilePicture: 'https://via.placeholder.com/40',
    },
    media: 'https://via.placeholder.com/600',
    caption: 'Beautiful day!',
    likes: 120,
    comments: 30,
    createdAt: '2024-04-27',
  },
  // Thêm nhiều bài viết khác
];

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Gọi API để lấy bài viết
    // Ở đây chỉ sử dụng dữ liệu giả
    setPosts(mockPosts);
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', paddingTop: '20px' }}>
      <Title level={2}>Feed</Title>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={posts}
        renderItem={post => (
          <List.Item
            key={post.id}
            extra={<img width={272} alt="media" src={post.media} />}
          >
            <List.Item.Meta
              avatar={<Avatar src={post.user.profilePicture} icon={<UserOutlined />} />}
              title={<Link to={`/profile/${post.user.username}`}>{post.user.username}</Link>}
              description={post.caption}
            />
            <div>
              <strong>{post.likes}</strong> likes · <strong>{post.comments}</strong> comments
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}

export default Feed;
