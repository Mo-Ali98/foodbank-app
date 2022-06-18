import React, { useContext, useState, useEffect } from "react";
import { User } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { IOrganisation } from "../models/organisation";

interface ContextProps {
  user?: User;
  setUser: (user: User) => void;
  authenticated: boolean;
  loadingAuthState: boolean;
  signUp: (email: string, password: string, OrginisationName: string) => void;
  logIn: (email: string, password: string) => void;
  logOut: () => void;
}

const AuthContext = React.createContext<ContextProps>({
  user: undefined,
  setUser: () => ({} as Promise<void>),
  authenticated: false,
  loadingAuthState: false,
  logIn: () => ({} as Promise<void>),
  signUp: () => ({} as Promise<void>),
  logOut: () => ({} as Promise<void>),
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | undefined>(() =>
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const [loadingAuthState, setLoadingAuthState] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | any) => {
      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        setLoadingAuthState(false);
      } else {
        localStorage.removeItem("authUser");
        setUser(undefined);
      }
    });

    return unsubscribe;
  }, []);

  const logOut = () => {
    auth.signOut();
  };

  const signUp = async (
    email: string,
    password: string,
    OrginisationName: string
  ) => {
    try {
      const { user: userInfo } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (userInfo) {
        const newOrg: IOrganisation = {
          emailAddress: userInfo?.email || "",
          orgName: OrginisationName,
        };

        await setDoc(doc(db, "organisation", userInfo?.uid || ""), newOrg);
        await setDoc(doc(db, "events", userInfo?.uid || ""), {});
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logIn = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  console.log({ user });
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        authenticated: user !== null,
        loadingAuthState,
        logOut,
        signUp,
        logIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
