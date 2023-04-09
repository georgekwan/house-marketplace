import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [isMounted, setIsMounted] = useState(true);

  // Check if user is logged in and remember it until logged off
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      if (user) {
        setLoggedIn(true);
      }
      setCheckingStatus(false);
    });
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  return { loggedIn, checkingStatus };
};
