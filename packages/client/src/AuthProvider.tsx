import React, { useContext, useMemo } from 'react';
import { useAuth } from './hooks/useAuth';
import { User } from './models/user';

const defaultAction = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (code: string) => Promise.resolve({ uid: '' }),
  logout: () => {},
};

const AuthStateContext = React.createContext<User | null>(null);
const AuthActionContext = React.createContext(defaultAction);
const AuthLoadingContext = React.createContext(true);

export const useAuthContext = () => {
  const user = useContext(AuthStateContext);
  const { login, logout } = useContext(AuthActionContext);
  const isLoading = useContext(AuthLoadingContext);

  return {
    user,
    isLoading,
    login,
    logout,
  };
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, login, logout, isLoading } = useAuth();

  const action = useMemo(
    () => ({
      login,
      logout,
    }),
    [login, logout]
  );

  return (
    <AuthActionContext.Provider value={action}>
      <AuthStateContext.Provider value={user}>
        <AuthLoadingContext.Provider value={isLoading}>
          {children}
        </AuthLoadingContext.Provider>
      </AuthStateContext.Provider>
    </AuthActionContext.Provider>
  );
};

export default AuthProvider;
