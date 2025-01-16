// components/MenuOptions.tsx
import React from 'react';
import { useRouter } from 'next/navigation';
import style from './style.module.scss';

interface MenuOptionsProps {
  startGameText: string;
  viewProfileText: string;
  logoutText: string;
  userId: string;
  onLogout: () => void;
}

const MenuOptions: React.FC<MenuOptionsProps> = ({ startGameText, viewProfileText, logoutText, userId, onLogout }) => {
  const router = useRouter();

  return (
    <div className={style.menuOptions}>
      <button className={`${style.menuButton} btn btn-info`} onClick={() => router.push('/game')}>
        {startGameText}
      </button>
      <button className={`${style.menuButton} btn btn-info`} onClick={() => router.push(`/profile/${userId}`)}>
        {viewProfileText}
      </button>
      <button className={`${style.menuButton} btn btn-info`} onClick={onLogout}>
        {logoutText}
      </button>
    </div>
  );
};

export default MenuOptions;
