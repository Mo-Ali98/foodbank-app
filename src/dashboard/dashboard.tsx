import { DocumentData } from "firebase/firestore";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { IEvent } from "../models/Event";
import { IVolunteer } from "../models/Volunteer";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { DashboardLayout } from "./dashboard-layout";
import { useDashboard } from "../contexts/dashboard-context";
import { Card } from "../components/card/card";

export const Dashboard = () => {
  const navigate = useNavigate();
  const {
    user,
    orgUserData,
    eventsData,
    volunteerData,
    loading,
    createNewEvent,
  } = useAuth();

  const {
    viewEvents,
    createEvent,
    setCreateEvent,
    setViewEvents,
    setViewVolunteers,
    viewVolunteers,
  } = useDashboard();

  const [eventName, setEventName] = useState<string>("");
  const [EventDescription, setEventDescription] = useState<string>("");
  const [EventLocation, setEventLocation] = useState<string>("");
  const [EventDate, setEventDate] = useState<string>("");

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
        createNewEvent(newEvent);
      }
      setCreateEvent(false);
      setViewVolunteers(false);
      setViewEvents(true);
    } catch (error) {
      console.error(error);
    }
  };

  const renderEvents = eventsData.map((doc: DocumentData, index: any) => {
    const data: IEvent = doc.data();
    return (
      <Card
        key={doc.id + index}
        title={data.EventName}
        description={data.EventDescription}
        date={data.EventDate}
      />
    );
  });

  const renderVolunteers2 = volunteerData.map(
    (doc: DocumentData, index: any) => {
      const data: IVolunteer = doc.data();
      return (
        <Card
          key={doc.id + index}
          title={`${data.firstName} ${data.lastName}`}
          description={""}
          date={`${data.email} ${data.number}`}
        />
      );
    }
  );

  if (loading) {
    return (
      <DashboardLayout OrgUserData={orgUserData} loading={loading}>
        <div className="Main-content">
          <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
            <span
              className="spinner-border spinner-border-sm mx-2"
              role="status"
              aria-hidden="true"
              style={{ color: "#7d57c2" }}
            />{" "}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout OrgUserData={orgUserData} loading={loading}>
      <div className="Main-content">
        {viewEvents && (
          <div className="d-flex flex-column align-content-center justify-content-center mx-auto">
            <h3>Your Events</h3>
            <p className="mb-4">
              Link to volunteer page for your events{" "}
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/volunteer/${user?.uid}`);
                }}
                style={{
                  color: "#7d57c2",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                to={""}
              >
                here
              </Link>
            </p>

            {eventsData.length !== 0 ? (
              <div className="card-container">{renderEvents}</div>
            ) : (
              <div className="d-flex align-items-center justify-content-center">
                <p className="lead">No events created yet</p>
              </div>
            )}
          </div>
        )}

        {viewVolunteers && (
          <div className="d-flex flex-column align-content-center justify-content-center mt-5">
            {volunteerData.length !== 0 ? (
              <div className="card-container">{renderVolunteers2}</div>
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
