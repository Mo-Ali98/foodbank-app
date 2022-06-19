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
import "./dashboard.css";

export const Dashboard = () => {
  const { user, logOut } = useAuth();
  const [OrgUserData, setOrgUserData] = useState<DocumentData>();
  const [EventsData, setEventData] = useState<DocumentData>();
  const [eventName, setEventName] = useState<string>("");
  const [EventDescription, setEventDescription] = useState<string>("");
  const [EventLocation, setEventLocation] = useState<string>("");
  const [EventDate, setEventDate] = useState<string>("");
  const [CreateEvent, setCreateEvent] = useState<boolean>(false);
  const [ViewEvents, setViewEvents] = useState<boolean>(true);

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
      <li key={doc.id} className="list-group-item">
        <div className="d-flex align-items-center justify-content-between">
          <span>Event Name: {data.EventName}</span>
          <span>Event Description: {data.EventDescription}</span>
          <span>Event Date: {data.EventDate}</span>
        </div>
      </li>
    );
  });

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
        <div className="container-fluid">
          Brand Logo here!
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
              <span className="mx-4">{OrgUserData?.orgName}</span>
              <button className="btn btn-primary mx-2" onClick={logOut}>
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="main-container">
        <div className="Sidepanel">
          <div className="my-2">
            <button
              className="btn btn-primary"
              onClick={() => {
                setCreateEvent(false);
                setViewEvents(true);
              }}
            >
              View events
            </button>
          </div>

          <div className="my-2">
            <button
              className="btn btn-primary"
              onClick={() => {
                setCreateEvent(!CreateEvent);
                setViewEvents(false);
              }}
            >
              Create event
            </button>
          </div>

          <div className="my-2">
            <button className="btn btn-primary">View volunteers</button>
          </div>
        </div>
        <div className="Main-content">
          {ViewEvents && (
            <div className="d-flex flex-column align-content-center justify-content-center mt-5">
              <div className="card" style={{ width: "100%" }}>
                <div className="card-header">Events Created: </div>
                <ul className="list-group list-group-flush">{renderEvents}</ul>
              </div>
            </div>
          )}

          <div>
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
        </div>
      </div>
    </>
  );
};
