import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
} from "firebase/firestore";

import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase/firebase";
import { IEvent } from "../models/Event";
import { IVolunteer } from "../models/Volunteer";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { DashboardLayout } from "./dashboard-layout";
import { useDashboard } from "../contexts/dashboard-context";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    viewEvents,
    createEvent,
    setCreateEvent,
    setViewEvents,
    setViewVolunteers,
    viewVolunteers,
  } = useDashboard();

  const [OrgUserData, setOrgUserData] = useState<DocumentData>();
  const [EventsData, setEventData] = useState<DocumentData>();
  const [VolunteerData, setVolunteerData] = useState<DocumentData>();

  const [eventName, setEventName] = useState<string>("");
  const [EventDescription, setEventDescription] = useState<string>("");
  const [EventLocation, setEventLocation] = useState<string>("");
  const [EventDate, setEventDate] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [user]);

  const getData = async () => {
    try {
      setLoading(true);

      if (user) {
        //Fetch user/ org data
        const orgRef = doc(db, "organisation", user.uid);
        const orgSnap = await getDoc(orgRef);
        const orgData = orgSnap.data();
        setOrgUserData(orgData);

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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    e.preventDefault();

    try {
      setLoading(true);
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
      }
    } catch (error) {
      console.error(error);
    } finally {
      getData();
      setCreateEvent(false);
      setViewVolunteers(false);
      setViewEvents(true);
      setLoading(false);
    }
  };

  const renderEvents = EventsData?.map((doc: DocumentData, index: any) => {
    const data: IEvent = doc.data();
    return (
      <li key={doc.id} className="list-group-item">
        <div className="d-flex align-items-center justify-content-between">
          <span>Name: {data.EventName}</span>
          <span>Description: {data.EventDescription}</span>
          <span>Date: {data.EventDate}</span>
        </div>
      </li>
    );
  });

  const renderVolunteers = VolunteerData?.map(
    (doc: DocumentData, index: any) => {
      const data: IVolunteer = doc.data();
      return (
        <li key={doc.id} className="list-group-item">
          <div className="d-flex align-items-center justify-content-between">
            <span>
              Name: {data.firstName} {data.lastName}
            </span>
            <span>Email: {data.email}</span>
            <span>Number: {data.number}</span>
          </div>
        </li>
      );
    }
  );

  return (
    <DashboardLayout OrgUserData={OrgUserData}>
      <div className="Main-content">
        {viewEvents && (
          <div className="d-flex flex-column align-content-center justify-content-center mt-5">
            <span className="mb-4">
              Link to volunteer page for events -{" "}
              <Link
                className="lead"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/volunteer/${user?.uid}`);
                }}
                style={{ color: "#7d57c2", cursor: "pointer" }}
                to={""}
              >
                here
              </Link>
            </span>

            {EventsData?.length !== 0 ? (
              <div className="card" style={{ width: "100%" }}>
                <div className="card-header d-flex justify-content-between">
                  <div>Events Created: </div>
                  <div>Number of events: {EventsData?.length}</div>
                </div>
                <ul className="list-group list-group-flush">{renderEvents}</ul>
              </div>
            ) : (
              <div className="d-flex align-items-center justify-content-center">
                <p className="lead">No events created yet</p>
              </div>
            )}
          </div>
        )}

        {viewVolunteers && (
          <div className="d-flex flex-column align-content-center justify-content-center mt-5">
            {VolunteerData?.length !== 0 ? (
              <div className="card" style={{ width: "100%" }}>
                <div className="card-header d-flex justify-content-between">
                  <div>Volunteers: </div>
                  <div>Number of volunteers: {VolunteerData?.length}</div>
                </div>
                <ul className="list-group list-group-flush">
                  {renderVolunteers}
                </ul>
              </div>
            ) : (
              <div className="d-flex align-items-center justify-content-center">
                <p className="lead">No volunteers yet</p>
              </div>
            )}
          </div>
        )}

        <div>
          {createEvent && (
            <div className="container mt-3">
              <div className="my-2 text-center">
                <h2>Create Your Event</h2>
                <p className="lead">
                  Tell your volunteers a little about your event and how they
                  can help your good cause
                </p>
              </div>
              <div className="row">
                <div className="center" style={{ alignItems: "center" }}>
                  <h4 className="mb-3">Event Details</h4>
                  <form onSubmit={submitForm}>
                    <div className="mb-3">
                      <label>Event Name</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        onChange={(e) => setEventName(e.target.value)}
                        disabled={loading}
                      />
                    </div>

                    <div className="mb-3">
                      <label>Event Description</label>

                      <textarea
                        className="form-control"
                        id="bio"
                        required
                        onChange={(e) => setEventDescription(e.target.value)}
                        disabled={loading}
                      />
                    </div>

                    <div className="mb-3">
                      <label>Event Location</label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="1234 Main St"
                        required
                        onChange={(e) => setEventLocation(e.target.value)}
                        disabled={loading}
                      />
                    </div>

                    <div className="mb-3">
                      <label>Event Date</label>

                      <input
                        type="date"
                        className="form-control"
                        id="date"
                        required
                        onChange={(e) => setEventDate(e.target.value)}
                        disabled={loading}
                      />
                    </div>

                    <button
                      className="button-3"
                      type="submit"
                      disabled={loading}
                    >
                      {loading && (
                        <span
                          className="spinner-border spinner-border-sm mx-2"
                          role="status"
                          aria-hidden="true"
                        />
                      )}
                      Create
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
