import React, { useContext, useState, useEffect, ReactNode } from "react";
import { User } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { FirebaseError } from "@firebase/util";
import { IOrganisation } from "../models/organisation";
import { notificationError } from "../components/notifications";
import { useNavigate } from "react-router-dom";
import { IEvent } from "../models/Event";

interface ContextProps {
  user?: User;
  setUser: (user: User) => void;
  authenticated: boolean;
  loading: boolean;
  signUp: (email: string, password: string, OrganisationName: string) => void;
  logIn: (email: string, password: string) => void;
  logOut: () => void;
  orgUserData: DocumentData;
  eventsData: DocumentData;
  volunteerData: DocumentData;
  createNewEvent: (event: IEvent) => void;
}

const AuthContext = React.createContext<ContextProps>({
  user: undefined,
  setUser: () => ({} as Promise<void>),
  authenticated: false,
  loading: false,
  logIn: () => ({} as Promise<void>),
  signUp: () => ({} as Promise<void>),
  logOut: () => ({} as Promise<void>),
  orgUserData: [],
  eventsData: [],
  volunteerData: [],
  createNewEvent: () => ({} as Promise<void>),
});

interface AuthContextProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | undefined>(() =>
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [orgUserData, setOrgUserData] = useState<DocumentData>([]);
  const [eventsData, setEventData] = useState<DocumentData>([]);
  const [volunteerData, setVolunteerData] = useState<DocumentData>([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | any) => {
      setLoading(true);
      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        getData();
      } else {
        localStorage.removeItem("authUser");
        setUser(undefined);
      }
      setLoading(false);
    });

    return unsubscribe;
    // eslint-disable-next-line
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
        console.error(error.code, error.cause, error.message);
      }
    }
  };

  const getData = async () => {
    try {
      setLoading(true);

      if (user) {
        //Fetch user/ org data
        const orgRef = doc(db, "organisation", user.uid);
        const orgSnap = await getDoc(orgRef);
        const orgData = orgSnap.data();
        setOrgUserData(orgData ?? []);

        //fetch events
        const eventsRef = collection(db, `events`);
        const eventsQuerySnap = await getDocs(eventsRef);
        setEventData(
          eventsQuerySnap.docs.filter((doc) => {
            const data = doc.data();
            return data.OrgId === user.uid;
          })
        );

        //Fetch volunteers
        const VolunteersRef = collection(db, `Volunteer`);
        const volunteersQuerySnap = await getDocs(VolunteersRef);
        setVolunteerData(
          volunteersQuerySnap.docs.filter((doc) => {
            const data = doc.data();
            return data.orgID === user.uid;
          })
        );
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      if (error instanceof FirebaseError) {
        notificationError(error.message);
        console.error(error.code, error.cause, error.message);
      }
    }
  };

  const createNewEvent = async (newEvent: IEvent) => {
    try {
      setLoading(true);
      if (user) {
        await addDoc(collection(db, "events"), newEvent);
      }
      getData();
      setLoading(false);
    } catch (error) {
      console.error(error);
      if (error instanceof FirebaseError) {
        notificationError(error.message);
        console.error(error.code, error.cause, error.message);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        authenticated: Boolean(user !== null),
        loading,
        logOut,
        signUp,
        logIn,
        eventsData,
        orgUserData,
        volunteerData,
        createNewEvent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
