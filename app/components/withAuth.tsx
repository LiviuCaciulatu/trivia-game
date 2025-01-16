
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push('/authentication');
      }
    }, [user, router]);

    if (!user) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
