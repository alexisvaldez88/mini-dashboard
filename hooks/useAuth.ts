/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

export function useAuth() {
  let accesslocal: string | null = null;
  const isAuth = () => {
    accesslocal = localStorage.getItem("accessToken");
    if (accesslocal) {
      return true;
    }
    return false;
  };
  const getToken = () => accesslocal;
  const closeSession = () => {
    localStorage.removeItem("accessToken");
  };
  useEffect(() => {
    isAuth();
  }, []);
  return {
    getToken,
    isAuth,
    closeSession,
  };
}