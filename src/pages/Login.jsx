import React, { useState } from 'react';
import { Form, Input, Button, Typography, Alert } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const { Title } = Typography;

function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onFinish = (values) => {
    // Giả sử bạn có API để xác thực người dùng
    // Đây chỉ là ví dụ đơn giản
    const { email, password } = values;
    if (email === 'user@example.com' && password === 'password') {
      const user = {
        username: 'user',
        email: 'user@example.com',
        profilePicture: 'https://via.placeholder.com/150',
      };
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', paddingTop: '100px' }}>
      <Title level={2} style={{ textAlign: 'center' }}>Login</Title>
      {error && <Alert message={error} type="error" showIcon closable onClose={() => setError(null)} />}
      <Form
        name="login"
        onFinish={onFinish}
        layout="vertical"
        style={{ marginTop: '20px' }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Invalid email format!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
        <Form.Item style={{ textAlign: 'center' }}>
          <Link to="/register">Don't have an account? Register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
