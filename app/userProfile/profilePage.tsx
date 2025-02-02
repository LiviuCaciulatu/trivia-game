"use client";

import { useUser } from '../context/UserContext';
import style from './style.module.scss';
import Profile from '../components/PlayerProfile/PlayerProfile';

const ProfilePage = () => {
  const { user } = useUser();
  
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.container}>
      <Profile/>
    </div>
  );
};

export default ProfilePage;

