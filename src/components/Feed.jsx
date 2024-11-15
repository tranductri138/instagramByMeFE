import React, { useEffect, useState } from 'react';
import { List, Typography } from 'antd';
import Post from '../components/Post';

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
        dataSource={posts}
        renderItem={post => (
          <Post key={post.id} post={post} />
        )}
      />
    </div>
  );
}

export default Feed;
