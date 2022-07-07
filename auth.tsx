import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './config/firebaseClient';
import Login from './components/common/Login';
import Loading from './components/common/Loading';
import nookies from 'nookies';

// Create a react context instance
const AuthContext = createContext({});
// console.log('AuthContext is: ', AuthContext);

type AuthProviderProps = {
  children?: React.ReactNode | React.ReactNode[];
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        // console.log('user variable is: ', user);
        nookies.set(undefined, 'token', '', {});
        setCurrentUser({});
        // console.log('currentUser is now: ', currentUser);
        // console.log('currentUser boolean is now: ', !!currentUser);
        setLoading(false);
        return;
      } else {
        const token = await user.getIdToken();
        nookies.set(undefined, 'token', token, {});
        setCurrentUser(user);
        setLoading(false);
        // console.log("token", token);
        // console.log("user", user);
      }
    });
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      // console.log('refreshing token...');
      const user = auth.currentUser;
      if (user) await user.getIdToken(true); // true to force refresh
    }, 10 * 60 * 1000);
    return () => clearInterval(handle);
  }, []);

  if (loading) {
    return <Loading type='spinningBubbles' color='yellowgreen' />;
  }

  // Because an empty object would result in a boolean value of true
  if (!Object.keys(currentUser).length) {
    // console.log(`currentUser is: ${currentUser}`);
    return <Login />;
  } else {
    // console.log('Object.keys(currentUser).length is: ', Object.keys(currentUser).length);
    // console.log('Object.keys(currentUser).length boolean is: ', !!Object.keys(currentUser).length);
    return (
      <AuthContext.Provider value={{ currentUser }}>
        {children}
      </AuthContext.Provider>
    );
  }
};

// Pass a context instance to react hooks called useContext. This allows external components to execute it.
export const useAuth = () => useContext(AuthContext);
