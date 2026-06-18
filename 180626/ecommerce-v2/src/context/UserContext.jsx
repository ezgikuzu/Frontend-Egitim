import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    setUser({ name: "Ahmet Yılmaz", email });
  };
  const logout = () => {
    setUser(null);
  };
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
