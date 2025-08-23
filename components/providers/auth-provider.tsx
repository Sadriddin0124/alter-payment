"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { $api } from "@/lib/api/api";
import { isTokenExpired, refreshTokens } from "@/lib/auth";
interface AuthContextProps {
  isAuthorized: boolean;
  checking: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthorized: false,
  checking: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (typeof window === "undefined" || !router.isReady) return;

      let accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const isLoginPage = router.pathname === "/login";

      if (isLoginPage) {
        setIsAuthorized(true);
        setChecking(false);
        return;
      }

      const accessExpired = !accessToken || isTokenExpired(accessToken);
      const refreshExpired = !refreshToken || isTokenExpired(refreshToken);

      if (accessExpired && !refreshExpired && refreshToken) {
        const newAccessToken = await refreshTokens(refreshToken);
        if (!newAccessToken) {
          localStorage.clear();
          window.location.href = "/login";
          return;
        }
        accessToken = newAccessToken;
      }

      try {
        await $api.get("/user/me/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setIsAuthorized(true);
      } catch (err) {
        console.warn("Auth check failed", err);
        localStorage.clear();
        window.location.href = "/login";
      } finally {
        setChecking(false);
      }
    };

    checkAuthStatus();
  }, [router.isReady, router.pathname]);

  if(checking || !isAuthorized) {
    return null;
  }



  return (
    <AuthContext.Provider value={{ isAuthorized, checking }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
