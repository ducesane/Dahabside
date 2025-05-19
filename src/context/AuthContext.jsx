import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserProfile, onAuthChange, signout } from "../lib/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    const cleanUp = onAuthChange(async (user) => {
      setUser(user);

      if (user) {
        try {
          const userProfile = await getUserProfile(user.id);
          console.log("Fetching profile for user ID:", user.id);
          setProfile(userProfile);

          console.log("data from line 25 context", userProfile);
        } catch (error) {
          console.error("error fetching user profile", error);
        }
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    });
    return cleanUp;
  }, []);
  console.log("data from line 37 context", profile);
  const logOut = async () => {
    try {
      await signout();
      console.log("Logging out");
    } catch (error) {
      console.error("error Signing out", error);
    }
  };

  const value = {
    user,
    profile,
    isloading,
    isLoggedIn: !!user,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth Must be used with an AuthProvider");
  }
  return context;
}
// ayanle
