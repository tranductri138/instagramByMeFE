import React from 'react';
import { Card, Avatar, Typography, Button } from 'antd';
import { HeartOutlined, MessageOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Paragraph } = Typography;

function Post({ post }) {
  return (
    <Card
      style={{ marginBottom: '20px' }}
      cover={<img alt="media" src={post.media} />}
      actions={[
        <HeartOutlined key="like" />,
        <MessageOutlined key="comment" />,
        <ShareAltOutlined key="share" />,
      ]}
    >
      <Card.Meta
        avatar={<Avatar src={post.user.profilePicture} />}
        title={<Link to={`/profile/${post.user.username}`}>{post.user.username}</Link>}
        description={
          <>
            <Paragraph>{post.caption}</Paragraph>
            <strong>{post.likes} likes</strong> · <strong>{post.comments} comments</strong>
          </>
        }
      />
    </Card>
  );
}

export default Post;
