"use client";
import React, { useState, useContext, createContext } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import endPoints from "@/services/api/";

const AuthContext = createContext<any>(null);

///////Provider
export function ProviderAuth({ children }: any) {
  const auth = useProviderAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

////login
function useProviderAuth() {
  const [user, setUser] = useState([]);

  const signIn = async (email: string, password: string) => {
    const options = {
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      endPoints.auth.login,
      { email, password },
      options
    );

    ///////TOKEN
    if (response.data.access_token) {
      const token = response.data.access_token;
      Cookie.set("token", token, { expires: 5, path: "/" }); ////httpOnly: true
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      ///const { data: user } = await axios.get(endPoints.auth.profile);
      setUser(response.data.user);
      // Obtener el valor de la cookie
    }
  };

  return {
    user,
    signIn,
  };
}
