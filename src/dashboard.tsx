import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
} from "firebase/firestore";

import React, { useEffect, useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import { db } from "./firebase/firebase";
import { IEvent } from "./models/Event";

export const Dashboard = () => {
  const { user, logOut } = useAuth();
  const [OrgUserData, setOrgUserData] = useState<DocumentData>();
  const [EventsData, setEventData] = useState<DocumentData>();
  const [eventName, setEventName] = useState<string>("");
  const [EventDescription, setEventDescription] = useState<string>("");
  const [EventLocation, setEventLocation] = useState<string>("");
  const [EventDate, setEventDate] = useState<string>("");
  const [CreateEvent, setCreateEvent] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      if (user) {
        const orgRef = doc(db, "organisation", user.uid);
        const orgSnap = await getDoc(orgRef);
        const orgData = orgSnap.data();
        setOrgUserData(orgData);

        const eventsRef = collection(db, `events`);
        const eventsQuerySnap = await getDocs(eventsRef);
        setEventData(
          eventsQuerySnap.docs.filter((doc) => {
            const data = doc.data();
            return data.OrgId === user.uid;
          })
        );
      }
    };

    getData();
  }, [user]);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    e.preventDefault();

    try {
      if (user) {
        const newEvent: IEvent = {
          EventName: eventName,
          EventDescription: EventDescription,
          EventLocation: EventLocation,
          EventDate: EventDate,
          EventLink: `/volunteer/${user.uid}`,
          OrgId: user.uid,
        };
        await addDoc(collection(db, "events"), newEvent);
        setCreateEvent(!CreateEvent);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderEvents = EventsData?.map((doc: DocumentData, index: any) => {
    const data: IEvent = doc.data();
    return (
      <p key={index}>
        {data.EventName} - {data.EventDescription} - {data.EventDate}
      </p>
    );
  });

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
        <div className="container-fluid">
          Brand Logo
          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto d-flex align-items-center mx-4">
              <h3 className="mx-4">{OrgUserData?.orgName}</h3>
              <button className="btn btn-primary mx-2" onClick={logOut}>
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="container d-flex flex-column align-content-center">
        <div className="d-flex flex-column align-content-center justify-content-center mt-5">
          {renderEvents}
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setCreateEvent(!CreateEvent)}
        >
          Create Event
        </button>

        {CreateEvent && (
          <div className="">
            <form onSubmit={submitForm}>
              <input
                type="text"
                placeholder="Event Name"
                required
                className="form-control my-2"
                onChange={(e) => setEventName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Event description"
                required
                className="form-control my-2"
                onChange={(e) => setEventDescription(e.target.value)}
              />
              <textarea
                placeholder="Event Location"
                rows={5}
                cols={1}
                className="form-control my-2"
                onChange={(e) => setEventLocation(e.target.value)}
              />
              <input
                type="date"
                className="form-control my-2"
                onChange={(e) => setEventDate(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                Create Event
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};
