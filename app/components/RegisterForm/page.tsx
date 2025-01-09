'use client'

import { useState } from 'react';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    country: '',
    age: 0,
    points: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.name === 'age' ? parseInt(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    
      if (!res.ok) {
        console.error('Error:', res.statusText);
        throw new Error('Failed to create user');
      }
    
      const data = await res.json();
      console.log('User created:', data);
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };
  
  
  

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="first_name"
        placeholder="First Name"
        value={formData.first_name}
        onChange={handleChange}
        required
      />
      <input
        name="last_name"
        placeholder="Last Name"
        value={formData.last_name}
        onChange={handleChange}
        required
      />
      <input
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        name="country"
        placeholder="Country"
        value={formData.country}
        onChange={handleChange}
        required
      />
      <input
        name="age"
        type="number"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
