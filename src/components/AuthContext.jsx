import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // useEffect(() => {
  //   checkAuthentication();
  // }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      checkAuthentication();
    }
  }, []);

  const checkAuthentication = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/users/session', {
            withCredentials: true,
          });
      if (response.data.user) {
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error.message);
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:8080/api/users/logout", {}, {
        withCredentials: true,
      });
      setUser(null);
      localStorage.removeItem("user");
      router.replace('/login');
    } catch (error) {
      console.error("Erro ao fazer logout:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, checkAuthentication, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
