import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from './AuthContext';

const AuthProvider = ({children}) => {
  const [user, setuser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      let userDetails = await AsyncStorage.getItem('@user');
      setuser(userDetails);
      setLoading(false);
    };

    loadToken();
  }, []);

  const login = async userInfo => {
    await AsyncStorage.setItem('@user', JSON.stringify(userInfo));
    setuser(userInfo);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
