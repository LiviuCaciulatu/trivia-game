import { useState } from 'react';

interface UserFormProps {
  onUserCreated: (newUser: any) => void;
}

const UserForm = ({ onUserCreated }: UserFormProps) => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [age, setAge] = useState('');
  const [points, setPoints] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name,
        last_name,
        username,
        password,
        country,
        age: parseInt(age),
        points: parseInt(points),
      }),
    });

    const data = await res.json();
    if (data.id) {
      onUserCreated(data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="First Name" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
      <input type="text" placeholder="Last Name" value={last_name} onChange={(e) => setLastName(e.target.value)} />
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
      <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
      <input type="number" placeholder="Points" value={points} onChange={(e) => setPoints(e.target.value)} />
      <button type="submit">Create User</button>
    </form>
  );
};

export default UserForm;
