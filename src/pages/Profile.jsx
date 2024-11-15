import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Typography, Button, List, Card, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

// Giả sử dữ liệu người dùng và bài viết được lấy từ API
const mockUser = {
  username: 'user1',
  profilePicture: 'https://via.placeholder.com/100',
  bio: 'This is a sample bio.',
};

const mockPosts = [
  {
    id: 1,
    media: 'https://via.placeholder.com/600',
    caption: 'First post!',
    likes: 50,
    comments: 10,
    createdAt: '2024-04-25',
  },
  // Thêm nhiều bài viết khác
];

function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // Gọi API để lấy thông tin người dùng và bài viết
    // Ở đây chỉ sử dụng dữ liệu giả
    setUser(mockUser);
    setPosts(mockPosts);
    // Giả sử bạn có thông tin về việc đang theo dõi người dùng hay không
    setIsFollowing(false);
  }, [username]);

  const handleFollow = () => {
    // Gọi API để theo dõi người dùng
    setIsFollowing(true);
    message.success(`You are now following ${user.username}`);
  };

  const handleUnfollow = () => {
    // Gọi API để hủy theo dõi người dùng
    setIsFollowing(false);
    message.success(`You have unfollowed ${user.username}`);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', paddingTop: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar size={100} src={user.profilePicture} icon={<UserOutlined />} />
        <div style={{ marginLeft: '20px' }}>
          <Title level={3}>{user.username}</Title>
          <Paragraph>{user.bio}</Paragraph>
          {username !== 'user1' && ( // Giả sử 'user1' là người dùng hiện tại
            isFollowing ? (
              <Button type="default" onClick={handleUnfollow}>Unfollow</Button>
            ) : (
              <Button type="primary" onClick={handleFollow}>Follow</Button>
            )
          )}
        </div>
      </div>
      <Title level={4} style={{ marginTop: '40px' }}>Posts</Title>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={posts}
        renderItem={post => (
          <List.Item>
            <Card
              hoverable
              cover={<img alt="media" src={post.media} />}
            >
              <Card.Meta title={post.caption} description={`${post.likes} likes`} />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}

export default Profile;
