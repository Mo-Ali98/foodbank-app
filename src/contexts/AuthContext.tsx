import React, { useContext, useState, useEffect } from "react";
import { User } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseError } from "@firebase/util";
import { IOrganisation } from "../models/organisation";
import { notificationError } from "../components/notifications";
import { useNavigate } from "react-router-dom";

interface ContextProps {
  user?: User;
  setUser: (user: User) => void;
  authenticated: boolean;
  loadingAuthState: boolean;
  signUp: (email: string, password: string, OrganisationName: string) => void;
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
  const navigate = useNavigate();

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
    OrganisationName: string
  ) => {
    try {
      const { user: userInfo } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (userInfo) {
        const newOrg: IOrganisation = {
          emailAddress: userInfo?.email || "",
          orgName: OrganisationName,
        };

        await setDoc(doc(db, "organisation", userInfo.uid), newOrg);
        await setDoc(doc(db, "events", userInfo.uid), {});
      }

      navigate("/");
    } catch (error) {
      console.error(error);
      if (error instanceof FirebaseError) {
        notificationError(error.message);
        console.error(error.code, error.cause, error.message);
      }
    }
  };

  const logIn = async (email: string, password: string) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
      if (error instanceof FirebaseError) {
        notificationError(error.message);
        console.error(error.code, error.cause, error.message, "here");
      }
    }
  };

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
