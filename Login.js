import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, Form, Input, Button, Typography } from 'antd';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      setLoading(false);
      console.log('Login response:', response.data);

      setMessage('Login successful!');
      navigate('/home');
    } catch (error) {
      setLoading(false);
      console.error('Login error:', error.response);
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Invalid credentials. Please try again.');
      }
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#f0f2f5',
      overflow: 'hidden', // Prevents scrolling
    }}>
      <Card style={{ 
        width: 400, 
        padding: '20px 40px', 
        backgroundColor: '#edd89f', 
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)' // Drop shadow
      }}>
        <Typography.Title level={2} style={{ textAlign: 'center' }}>Login</Typography.Title>
        <Form
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email.' }]}>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password.' }]}>
            <Input.Password
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form.Item>
        </Form>
        {message && (
          <Typography.Text type={message.includes('successful') ? 'success' : 'danger'}>
            {message}
          </Typography.Text>
        )}
        <Typography.Paragraph style={{ marginTop: 10, textAlign: 'center' }}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </Typography.Paragraph>
      </Card>
    </div>
  );
};

export default Login;
