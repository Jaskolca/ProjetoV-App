import React, { createContext, useContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../services/api";

interface IUser {
  name: string;
  token: string;
}

interface ISignInCredentials {
  username: string;
  password: string;
}

interface IAuthContextData {
  name: string;
  token: string;
  loading: boolean;
  signIn(credentials: ISignInCredentials): Promise<IUser>;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IUser>({} as IUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const token = await AsyncStorage.getItem("@MeRepresenta:token");

      if (token) {
        api.defaults.headers.authorization = `Bearer ${token}`;
        const name = (await AsyncStorage.getItem("@MeRepresenta:name")) ?? "";

        setData({
          name,
          token,
        });
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = async ({ username, password }: ISignInCredentials) => {
    try {
      const { data: authObject } = await api.post<IUser>("user/login", {
        username,
        password,
      });

      const { name, token } = authObject;

      if (!token) {
        throw new Error("Falha ao realizar login");
      }

      setData(authObject);

      api.defaults.headers.authorization = `Bearer ${token}`;

      await AsyncStorage.setItem("@MeRepresenta:token", token);
      await AsyncStorage.setItem("@MeRepresenta:namen", name);

      return authObject;
    } catch (e) {
      console.error(e.response?.data);
      throw new Error(e.response?.data?.message ?? "Falha ao realizar login");
    }
  };

  return (
    <AuthContext.Provider
      value={{ name: data.name, token: data.token, loading, signIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}
