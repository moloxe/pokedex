import { useEffect, useState, createContext, FC } from "react";

type User = {
  username: string;
};

type AuthContextProps = {
  user?: User;
  isLoading: boolean;
  isLogged: boolean;
  clearUser: () => void;
  login: (username: string, password: string) => void;
};

const STORED_USER_KEY = "USER";

export const AuthContext = createContext<AuthContextProps>({
  isLoading: true,
  isLogged: false,
  clearUser: () => {},
  login: () => {},
});

const AuthProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    setIsLoading(true);
    const storedUserStr = localStorage.getItem(STORED_USER_KEY);
    if (storedUserStr) {
      const storedUser = JSON.parse(storedUserStr) as User;
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const clearUser = () => {
    setIsLoading(true);
    localStorage.removeItem(STORED_USER_KEY);
    setUser(undefined);
    setIsLoading(false);
  };

  function login(username: string, password: string) {
    setIsLoading(true);
    const user: User = {
      username,
    };
    localStorage.setItem(STORED_USER_KEY, JSON.stringify(user));
    setIsLoading(false);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isLogged: Boolean(user),
        clearUser,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
