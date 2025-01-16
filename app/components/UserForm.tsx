// import { useState } from 'react';

// interface FormData {
//   first_name: string;
//   last_name: string;
//   username: string;
//   password: string;
//   country: string;
//   age: number;
//   points: number;
// }

// const UserForm = () => {
//   const [formData, setFormData] = useState<FormData>({
//     first_name: '',
//     last_name: '',
//     username: '',
//     password: '',
//     country: '',
//     age: 0,
//     points: 0,
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.name === 'age' || e.target.name === 'points' ? parseInt(e.target.value) : e.target.value;
//     setFormData({ ...formData, [e.target.name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const res = await fetch('/api/createUser', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (data.id) {
//         console.log('User created:', data);
//       }
//     } catch (error) {
//       console.error('Error during form submission:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="first_name"
//         placeholder="First Name"
//         value={formData.first_name}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="last_name"
//         placeholder="Last Name"
//         value={formData.last_name}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="username"
//         placeholder="Username"
//         value={formData.username}
//         onChange={handleChange}
//       />
//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={formData.password}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="country"
//         placeholder="Country"
//         value={formData.country}
//         onChange={handleChange}
//       />
//       <input
//         type="number"
//         name="age"
//         placeholder="Age"
//         value={formData.age}
//         onChange={handleChange}
//       />
//       <input
//         type="number"
//         name="points"
//         placeholder="Points"
//         value={formData.points}
//         onChange={handleChange}
//       />
//       <button type="submit">Create User</button>
//     </form>
//   );
// };

// export default UserForm;
