import React, { useCallback, useContext, useMemo, useState } from 'react';
import { User } from './models/user';

const defaultAction = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (loginUser: User) => {},
  logout: () => {},
};

const AuthStateContext = React.createContext<User | null>(null);
const AuthActionContext = React.createContext(defaultAction);

export const useAuthContext = () => {
  const user = useContext(AuthStateContext);
  const { login, logout } = useContext(AuthActionContext);

  return {
    user,
    login,
    logout,
  };
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((loginUser: User) => setUser(loginUser), [setUser]);
  const logout = useCallback(() => setUser(null), [setUser]);

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
        {children}
      </AuthStateContext.Provider>
    </AuthActionContext.Provider>
  );
};

export default AuthProvider;
