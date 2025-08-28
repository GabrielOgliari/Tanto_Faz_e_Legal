/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";

const TOKEN_STORAGE_KEY = "token";

const users = [
  {
    username: "Rafael",
    password: "123",
  },
  {
    username: "Evandro",
    password: "123",
  },
  {
    username: "Gabriel",
    password: "123",
  },
  {
    username: "Luiz",
    password: "123",
  },
  {
    username: "Vitor",
    password: "123",
  },
];

export type UserParams = {
  username: string;
  password: string;
};

export const useAuth = () => {
  const router = useRouter();

  const checkIfUserIsRegistered = async ({
    username,
    password,
  }: UserParams) => {
    const user = users.find((user) => user.username === username);
    if (user?.password === password) return true;
    return false;
  };

  const createToken = ({ username, password }: UserParams) => {
    const userDataString = JSON.stringify({
      username,
      password,
    });
    const token = btoa(userDataString);
    return token;
  };

  const login = async ({ username, password }: UserParams) => {
    const isRegistered = await checkIfUserIsRegistered({ username, password });

    if (!isRegistered) {
      return { success: false };
    }

    const token = createToken({ username, password });

    try {
      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
      return { success: true };
    } catch (error) {
      console.error("Erro ao salvar token:", error);
      return { success: false };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
      router.navigate("/login");
    } catch (error) {
      console.error("Erro ao remover token:", error);
    }
  };

  const checkIfUserIsLogged = async () => {
    const storedToken = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
    if (storedToken) return true;
    return false;
  };

  const redirectLogin = () => {
    router.navigate("/login");
  };

  useEffect(() => {
    const verifyLogin = async () => {
      const isLogged = await checkIfUserIsLogged();

      if (!isLogged) {
        redirectLogin();
      }
    };

    verifyLogin();
  }, []);

  return {
    login,
    logout,
  };
};
