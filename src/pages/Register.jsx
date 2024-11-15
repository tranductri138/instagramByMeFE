import React, { useState } from 'react';
import { Form, Input, Button, Typography, Alert } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const { Title } = Typography;

function Register() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onFinish = (values) => {
    // Giả sử bạn có API để đăng ký người dùng
    // Đây chỉ là ví dụ đơn giản
    const { username, email, password } = values;
    if (email && password && username) {
      const user = {
        username: username,
        email: email,
        profilePicture: 'https://via.placeholder.com/150',
      };
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } else {
      setError('Please fill all the fields');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', paddingTop: '50px' }}>
      <Title level={2} style={{ textAlign: 'center' }}>Register</Title>
      {error && <Alert message={error} type="error" showIcon closable onClose={() => setError(null)} />}
      <Form
        name="register"
        onFinish={onFinish}
        layout="vertical"
        style={{ marginTop: '20px' }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

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

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form.Item>
        <Form.Item style={{ textAlign: 'center' }}>
          <Link to="/login">Already have an account? Login here!</Link>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
