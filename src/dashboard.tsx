import { doc, DocumentData, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import { db } from "./firebase/firebase";

export const Dashboard = () => {
  const { user, logOut } = useAuth();

  const [userData, setUserData] = useState<DocumentData>();

  useEffect(() => {
    const getData = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        setUserData(data);
      }
    };

    getData();
  }, []);

  return (
    <div className="container d-flex flex-column align-content-center">
      <div className="d-flex flex-row align-content-center justify-content-between my-2 py-4">
        <h1 className="text-center">DASHBOARD</h1>
        <button className="btn btn-primary" onClick={logOut}>
          LOGOUT
        </button>
      </div>
      <div className="d-flex flex-column align-content-center justify-content-center mt-5">
        <h2 className="text-truncate">uid - {user?.uid}</h2>
        <h3>{`name? ${user?.displayName}`}</h3>
        <h3>email - {user?.email}</h3>
        <h3>{`Number? ${user?.phoneNumber}`}</h3>
        <h3>{`Verified? ${user?.emailVerified}`}</h3>
        <img src={user?.photoURL ?? ""} alt="" />

        <h1>User info from users collection</h1>
        <h3>{userData?.id}</h3>
        <h3>{userData?.name}</h3>
        <h3>{userData?.location}</h3>
        <h3>{userData?.age}</h3>
      </div>
    </div>
  );
};
