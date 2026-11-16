import React, { createContext, useContext, useState, useEffect } from "react";
import { subscribeToAuthChanges, loginAdmin, logoutAdmin, verifyAdminStatus } from "../firebase/auth";
import { isFirebaseConfigured, auth } from "../firebase/config";

const AuthContext = createContext({
  currentUser: null,
  isAdmin: false,
  loading: true,
  login: async () => {},
  logout: async () => {},
  isFirebaseConfigured: false,
  devBypassMode: false,
  enableDevBypass: () => {}
});

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [devBypassMode, setDevBypassMode] = useState(() => {
    // Only enabled if Firebase is not yet configured and admin explicitly enabled local evaluation
    return !isFirebaseConfigured && localStorage.getItem("pulse-dev-bypass") === "true";
  });

  useEffect(() => {
    if (!auth) {
      if (devBypassMode) {
        setCurrentUser({ uid: "dev-admin-uid", email: "editor@pulse-media.internal", displayName: "Editorial Lead" });
        setIsAdmin(true);
      }
      setLoading(false);
      return;
    }

    const unsubscribe = subscribeToAuthChanges(async (user) => {
      setCurrentUser(user);
      if (user) {
        const adminCheck = await verifyAdminStatus(user);
        setIsAdmin(adminCheck);
      } else {
        if (devBypassMode) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [devBypassMode]);

  const login = async (email, password) => {
    if (!auth) {
      if (!isFirebaseConfigured) {
        throw new Error(
          "Firebase credentials are not yet configured in .env. Please see the setup guide in README.md or enable Local Evaluation Mode below."
        );
      }
      throw new Error("Authentication service is unavailable.");
    }
    const cred = await loginAdmin(email, password);
    const adminCheck = await verifyAdminStatus(cred.user);
    if (!adminCheck) {
      // Sign them out immediately if they are not an authorized administrator
      await logoutAdmin();
      throw new Error("Access Denied: This account does not possess administrator privileges for PULSE.");
    }
    setIsAdmin(true);
    return cred;
  };

  const logout = async () => {
    setDevBypassMode(false);
    localStorage.removeItem("pulse-dev-bypass");
    setIsAdmin(false);
    setCurrentUser(null);
    if (auth) {
      await logoutAdmin();
    }
  };

  const enableDevBypass = () => {
    if (!isFirebaseConfigured) {
      setDevBypassMode(true);
      localStorage.setItem("pulse-dev-bypass", "true");
      setCurrentUser({ uid: "dev-admin-uid", email: "editor@pulse-media.internal", displayName: "Editorial Lead (Local Preview)" });
      setIsAdmin(true);
    }
  };

  const value = {
    currentUser,
    isAdmin,
    loading,
    login,
    logout,
    isFirebaseConfigured,
    devBypassMode,
    enableDevBypass
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
