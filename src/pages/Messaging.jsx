import React, { useState, useEffect } from 'react';
import { Layout, List, Avatar, Input, Button, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

// Giả sử dữ liệu tin nhắn và người dùng được lấy từ API
const mockUsers = [
  { id: 1, username: 'user2', profilePicture: 'https://via.placeholder.com/40' },
  { id: 2, username: 'user3', profilePicture: 'https://via.placeholder.com/40' },
  // Thêm nhiều người dùng khác
];

const mockMessages = {
  1: [
    { id: 1, from: 'user2', content: 'Hello!', timestamp: '2024-04-27 10:00' },
    { id: 2, from: 'user1', content: 'Hi there!', timestamp: '2024-04-27 10:05' },
  ],
  2: [
    { id: 1, from: 'user3', content: 'Nice photo!', timestamp: '2024-04-26 14:00' },
    { id: 2, from: 'user1', content: 'Thank you!', timestamp: '2024-04-26 14:05' },
  ],
};

function Messaging() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Gọi API để lấy danh sách người dùng
    // Ở đây chỉ sử dụng dữ liệu giả
    setUsers(mockUsers);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      // Gọi API để lấy tin nhắn với người dùng được chọn
      // Ở đây chỉ sử dụng dữ liệu giả
      setMessages(mockMessages[selectedUser.id] || []);
    }
  }, [selectedUser]);

  const handleSend = () => {
    if (input.trim() === '') return;
    const newMessage = {
      id: messages.length + 1,
      from: 'user1',
      content: input,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
    setInput('');
    // Gọi API để gửi tin nhắn
  };

  return (
    <Layout style={{ height: '80vh', marginTop: '20px' }}>
      <Sider width={250} style={{ background: '#fff' }}>
        <Title level={4} style={{ padding: '16px' }}>Messages</Title>
        <List
          itemLayout="horizontal"
          dataSource={users}
          renderItem={user => (
            <List.Item onClick={() => setSelectedUser(user)} style={{ cursor: 'pointer' }}>
              <List.Item.Meta
                avatar={<Avatar src={user.profilePicture} icon={<UserOutlined />} />}
                title={user.username}
              />
            </List.Item>
          )}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 16px' }}>
          {selectedUser ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={selectedUser.profilePicture} icon={<UserOutlined />} />
              <Title level={5} style={{ margin: '0 0 0 10px' }}>{selectedUser.username}</Title>
            </div>
          ) : (
            <Title level={5}>Select a user to start chatting</Title>
          )}
        </Header>
        <Content style={{ padding: '16px', background: '#f0f2f5' }}>
          {selectedUser ? (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ flex: 1, overflowY: 'auto', marginBottom: '16px' }}>
                <List
                  dataSource={messages}
                  renderItem={msg => (
                    <List.Item
                      style={{
                        justifyContent: msg.from === 'user1' ? 'flex-end' : 'flex-start',
                      }}
                    >
                      <List.Item.Meta
                        avatar={msg.from !== 'user1' ? <Avatar src={selectedUser.profilePicture} /> : null}
                        title={msg.from}
                        description={msg.content}
                      />
                    </List.Item>
                  )}
                />
              </div>
              <div style={{ display: 'flex' }}>
                <Input
                  placeholder="Type a message"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onPressEnter={handleSend}
                />
                <Button type="primary" onClick={handleSend}>Send</Button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <Title level={4}>No conversation selected</Title>
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
}

export default Messaging;
