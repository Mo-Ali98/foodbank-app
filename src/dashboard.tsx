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

import logo from "./assets/logo-small.png";
import { IVolunteer } from "./models/Volunteer";

export const Dashboard = () => {
  const { user, logOut } = useAuth();
  const [OrgUserData, setOrgUserData] = useState<DocumentData>();
  const [EventsData, setEventData] = useState<DocumentData>();
  const [VolunteerData, setVolunteerData] = useState<DocumentData>();

  const [eventName, setEventName] = useState<string>("");
  const [EventDescription, setEventDescription] = useState<string>("");
  const [EventLocation, setEventLocation] = useState<string>("");
  const [EventDate, setEventDate] = useState<string>("");
  const [CreateEvent, setCreateEvent] = useState<boolean>(false);
  const [ViewEvents, setViewEvents] = useState<boolean>(true);
  const [ViewVolunteers, setViewVolunteers] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
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
    };

    //getData();
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

  const renderVolunteers = VolunteerData?.map(
    (doc: DocumentData, index: any) => {
      const data: IVolunteer = doc.data();
      return (
        <li key={doc.id} className="list-group-item">
          <div className="d-flex align-items-center justify-content-between">
            <span>
              Volunteer name: {data.firstName} {data.lastName}
            </span>
            <span>Volunteer email: {data.email}</span>
            <span>Volunteer number: {data.number}</span>
          </div>
        </li>
      );
    }
  );
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white px-4 navbar-additional">
        <div className="container-fluid">
          <img src={logo} alt="Volunteria" width={"55px"} height={"55px"} />
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
              <button className="button-3 mx-2" onClick={logOut}>
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
              className="button-3"
              onClick={() => {
                setCreateEvent(false);
                setViewEvents(false);
                setViewVolunteers(true);
              }}
            >
              View volunteers
            </button>
          </div>
          <div className="my-2">
            <button
              className="button-3"
              onClick={() => {
                setCreateEvent(false);
                setViewVolunteers(false);
                setViewEvents(true);
              }}
            >
              View events
            </button>
          </div>

          <div className="my-2">
            <button
              className="button-3"
              onClick={() => {
                setCreateEvent(true);
                setViewEvents(false);
                setViewVolunteers(false);
              }}
            >
              Create event
            </button>
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

          {ViewVolunteers && (
            <div className="d-flex flex-column align-content-center justify-content-center mt-5">
              <div className="card" style={{ width: "100%" }}>
                <div className="card-header">Volunteers: </div>
                <ul className="list-group list-group-flush">
                  {renderVolunteers}
                </ul>
              </div>
            </div>
          )}

          <div>
            {CreateEvent && (
             <div>

             <div className="maincontainer">
               <div className="container">
                 <div className="py-5 text-center">
                   
                   <h2>Create Your Event</h2>
                   <p className="lead">Tell your volunteers a little about your event and how they can help your good cause</p>
                 </div>
                 <div className="row">
                   
                   <div className="center" style={{ alignItems: 'center', }}>
                     <h4 className="mb-3">Event Details</h4>
                     <form className="needs-validation">
                       <div className="row">
                         
                       </div>
                       <div className="mb-3">
                         <label>Event Name</label>
       
                           <input 
                             type="text" 
                             className="form-control" 
                             id="username" 
                             placeholder="" 
                             required 
                             onChange={(e) => setEventName(e.target.value)}
                             />
       
                           <div className="invalid-feedback">
                             Your username is required.
                           </div>
                       </div>
       
                       <div className="mb-3">
                         <label >Event Bio </label>
                         
                         <textarea 
                         className="form-control" 
                         id="bio" 
                         placeholder="" 
                         onChange={(e) => setEventDescription(e.target.value)}
                         />
       
                       </div>
       
                       <div className="mb-3">
                         <label >Event Location</label>
       
                         <input 
                         type="text" 
                         className="form-control" 
                         id="address" 
                         placeholder="1234 Main St" 
                         required 
                         onChange={(e) => setEventLocation(e.target.value)}
                         />
                       </div>
       
                       <div className="mb-3">
                         <label>Event Date</label>
       
                         <input 
                         type="date" 
                         className="form-control" 
                         id="date" 
                         placeholder="12/12/2022" 
                         onChange={(e) => setEventDate(e.target.value)}
                         />
       
                       </div>
                      
                       <hr className="mb-4" />
                       <button className="btn btn-primary btn-lg btn-block" type="button">Create Your Event</button>
                     </form>
                   </div>
                 </div>
                 <footer className="my-5 pt-5 text-muted text-center text-small">
                   <p className="mb-1">&copy; 2022 Volunteria.com</p>
                   <ul className="list-inline">
                     <li className="list-inline-item"><a href="#">Privacy</a></li>
                     <li className="list-inline-item"><a href="#">Terms</a></li>
                     <li className="list-inline-item"><a href="#">Support</a></li>
                   </ul>
                 </footer>
               </div>
            
             </div>
       
                       </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
