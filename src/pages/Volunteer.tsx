import styled from "styled-components";
import {
  collection,
  doc,
  DocumentData,
  setDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { IVolunteer } from "../models/Volunteer";
import logo from "../assets/logo-small.png";

import "./volunteer.css";

interface IBtn {
  isClicked: string[];
  assignedTo: string;
}

const Title = styled.div`
  color: #7d57c2;
  font-size: 24px;
`;

const ContactContainer = styled.div`
  padding-top: 10%;
`;

const SubmitSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  align-items: center;
  float: right;
  justify-content: space-between;
  padding-bottom: 1%;
  padding-top: 2%;
`;

const CardContainer = styled.div`
  padding-top: 5px;
`;

const CardTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`;

const CardBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
`;

const Scroll = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
`;
const Card = styled.div`
  display: inline-block;
  padding-top: 5%;
  width: 18rem;
  margin: 1%;
`;
const CardButton = styled.button<IBtn>`
  background-color: ${(props) =>
    props.isClicked.includes(props.assignedTo) ? "#7D57C2" : "white"};
  color: ${(props) =>
    props.isClicked.includes(props.assignedTo) ? "white" : "black"};
  border: 2px solid #008cba;
  border-radius: 5px;
  ${CardBody}:hover & {
    background-color: "#7D57C2";
  }
`;

export const Volunteer = () => {
  const [VolunteerFirstName, setVolunteerFirstName] = useState<string>("");
  const [VolunteerLastName, setVolunteerLastName] = useState<string>("");
  const [VolunteerEmail, setVolunteerEmail] = useState<string>("");
  const [VolunteerNumber, setVolunteerNumber] = useState<string>("");
  const [EventsData, setEventData] = useState<DocumentData>();
  const [orgData, setOrgData] = useState<DocumentData>();
  const [SelectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [dateSelected, setDateSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const url = window.location.href.split("/");

  const orgID = url[4];

  //Finds all the events for the org given a url of /volunteer/orgID.
  useEffect(() => {
    const getData = async () => {
      const eventsRef = collection(db, `events`);
      const eventsQuerySnap = await getDocs(eventsRef);
      setEventData(
        eventsQuerySnap.docs.filter((doc) => {
          const data = doc.data();
          return data.OrgId === orgID;
        })
      );
      const orgRef = doc(db, "organisation", orgID);
      const orgSnap = await getDoc(orgRef);
      const orgData = orgSnap.data();
      setOrgData(orgData);
    };
    getData();
  }, [orgID]);

  if (!orgID) {
    return (
      <>
        <h1>Event does not exist</h1>
      </>
    );
  }

  //Handles adding eventIds to list
  const toggleEventSelection = (eventId: string, eventDate: string) => {
    if (SelectedEvents.includes(eventId)) {
      setSelectedEvents((ids) => [...ids].filter((id) => id !== eventId));
    } else {
      setDateSelected((prev) => [...prev, eventDate]);
      setSelectedEvents((ids) => [...ids, eventId]);
    }
  };

  const submitVolunteerForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const newVolunteer: IVolunteer = {
        firstName: VolunteerFirstName,
        lastName: VolunteerLastName,
        email: VolunteerEmail,
        number: VolunteerNumber,
        eventID: SelectedEvents,
        orgID: orgID,
      };

      await setDoc(doc(db, "Volunteer", VolunteerFirstName), newVolunteer);
      alert(
        "Thank you " +
          VolunteerFirstName +
          " for signing up, we will be in contact with you shortly"
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white px-2 navbar-additional mb-5">
        <div className="container-fluid">
          <div className="mx-2">
            <div className="d-flex align-items-center">
              <img
                className="mx-2"
                src={logo}
                alt="Volunteria"
                width={"55px"}
                height={"55px"}
                loading={"lazy"}
              />
            </div>
          </div>
        </div>
      </nav>
      <div className="container px-5 mt-2">
        <div className="header">
          <div className="d-flex flex-column">
            <h3>{orgData?.orgName} events</h3>
          </div>
        </div>

        <CardContainer>
          <Title>
            Please scroll horizontally and select dates you are available
          </Title>
          <Scroll>
            {EventsData?.map((doc: any, key: number) => (
              <Card key={key} id={doc.data().EventName}>
                <div className="card-body">
                  <CardTitle>{doc.data().EventName}</CardTitle>
                  <CardBody>{doc.data().EventDate}</CardBody>
                  <CardBody>
                    <CardButton
                      isClicked={dateSelected}
                      assignedTo={doc.data().EventDate}
                      onClick={() => {
                        toggleEventSelection(doc.id, doc.data().EventDate);
                      }}
                    >
                      Select
                    </CardButton>
                  </CardBody>
                </div>
              </Card>
            ))}
          </Scroll>
        </CardContainer>
        <ContactContainer>
          <h3>Volunteer Contact form</h3>
          <form onSubmit={submitVolunteerForm}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  onChange={(e) => setVolunteerFirstName(e.target.value)}
                  style={{ borderColor: "#7D57C2" }}
                  disabled={loading}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  onChange={(e) => setVolunteerLastName(e.target.value)}
                  style={{ borderColor: "#7D57C2" }}
                  disabled={loading}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="Email Address">Email Address</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  onChange={(e) => setVolunteerEmail(e.target.value)}
                  style={{ borderColor: "#7D57C2" }}
                  disabled={loading}
                />
                <div className="invalid-feedback">
                  Valid emaill address is required.
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="Mobile Number">Mobile Number</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  disabled={loading}
                  onChange={(e) => setVolunteerNumber(e.target.value)}
                  style={{ borderColor: "#7D57C2" }}
                />
              </div>
            </div>
            <SubmitSection>
              <button type="submit" className="button-3" disabled={loading}>
                {loading && (
                  <span
                    className="spinner-border spinner-border-sm mx-2"
                    role="status"
                    aria-hidden="true"
                  />
                )}
                Submit
              </button>
            </SubmitSection>
          </form>
        </ContactContainer>
      </div>
    </>
  );
};

/**
 

 
 */
