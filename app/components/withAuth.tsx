import React, { FC } from 'react';
import { useUser } from '../context/UserContext';
import { useRouter } from 'next/navigation';

const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  const AuthHOC: FC<P> = (props) => {
    const { user } = useUser();
    const router = useRouter();

    if (!user) {
      router.push('/login');
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };

  AuthHOC.displayName = `withAuth(${Component.displayName || Component.name})`;

  return AuthHOC;
};

export default withAuth;

