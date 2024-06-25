import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Input, Button, Typography } from 'antd';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '', // Added username field
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      setLoading(false);

      if (response.status === 201) {
        setMessage('Signup successful!');
        navigate('/login'); // Navigate to login page after successful signup
      } else {
        setMessage(result.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setLoading(false);
      setMessage('Signup failed. Please try again.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
        overflow: 'hidden', // Prevents scrolling
      }}
    >
      <Card
        style={{
          width: 500,
          padding: '20px 40px',
          backgroundColor: '#edd89f',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Drop shadow
        }}
      >
        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          Signup
        </Typography.Title>
        <Form
          layout="vertical"
          onFinish={handleSubmit} // Use handleSubmit directly as onFinish
          style={{ marginTop: '1px' }} // Optional: Adjust top margin for Form
        >
          <Form.Item label="First Name" required style={{ marginBottom: '10px' }}>
            <Input name="firstName" value={formData.firstName} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Last Name" required style={{ marginBottom: '10px' }}>
            <Input name="lastName" value={formData.lastName} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Username" required style={{ marginBottom: '10px' }}>
            <Input name="username" value={formData.username} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Email" required style={{ marginBottom: '10px' }}>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Password" required style={{ marginBottom: '10px' }}>
            <Input type="password" name="password" value={formData.password} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Confirm Password" required style={{ marginBottom: '10px' }}>
            <Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={loading} style={{ width: '50%' }}>
              {loading ? 'Signing up...' : 'Signup'}
            </Button>
          </Form.Item>
        </Form>
        {message && (
          <Typography.Text type={message.includes('successful') ? 'success' : 'danger'}>
            {message}
          </Typography.Text>
        )}
      </Card>
    </div>
  );
};

export default Signup;
