import { User } from '../types';

interface UserListProps {
  users: User[];
}

const UserList = ({ users }: UserListProps) => {
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.first_name} {user.last_name} ({user.username}) - {user.country} - {user.age} years old - Points: {user.points}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

