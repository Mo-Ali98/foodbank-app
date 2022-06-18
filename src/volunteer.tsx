import { throws } from "assert";
import { randomUUID } from "crypto";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  setDoc,
  getDocs
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import { db } from "./firebase/firebase";
import { IEvent, IVolunteer } from "./models/organisation";

export const Volunteer = () => {
const [VolunteerFirstName, setVolunteerFirstName] = useState<string>("");
const [VolunteerLastName, setVolunteerLastName] = useState<string>("");
const [VolunteerEmail, setVolunteerEmail] = useState<string>("");
const [VolunteerNumber, setVolunteerNumber] = useState<string>("");
const [EventsData, setEventData] = useState<DocumentData>();
const [VolunteerData, setVolunteerData] = useState<string[]>([""]);


const EventID =  []

const url = window.location.href.split("/")

console.log(url)
const orgID= url[4]

const eventsChosen = Array<string>()


//Finds all the events for the org given a url of /volunteer/orgID.
useEffect(() => {
    const getData = async () => {
        const eventsRef = collection(db, `events`);
        const eventsQuerySnap = await getDocs(eventsRef);
        console.log(eventsQuerySnap.docs.length)
        setEventData(
        eventsQuerySnap.docs.filter((doc) => {
        const data = doc.data();
        return data.OrgId === orgID;
      })
        )
    };
    getData();
  },[]);



 // Appends to eventsChosen array Onchange. However when i push below, shows console empty.
 const appendToEventsChosen = (value: string)=>{
     eventsChosen.push(value)
     setVolunteerData(eventsChosen)
     console.log(eventsChosen)
 }
 
  

// Renders events on page + checkboxes for now
  const renderEvents = EventsData?.map((doc: any) => {
    const data = doc.data();
    return (
        
      <p key={data.EventName}>
        <input type = "checkbox" id={data.EventName} onChange={() => appendToEventsChosen(data.EventID)} />
        {data.EventName} - {data.EventDate}
      </p>
    );
  });


  

const submitVolunteerForm = async(e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault(); 
    try{
      const newVolunteer: IVolunteer ={
        firstName: VolunteerFirstName,
        lastName: VolunteerLastName,
        email:VolunteerEmail,
        number:VolunteerNumber,
        eventID:eventsChosen,
      };

      await setDoc(
        doc(db,"Volunteer",VolunteerFirstName),{
          newVolunteer
        }
      )
    }
    catch(error){
      console.log(error)
    }
  }; 

  return (
  <div className="p-5">
        {renderEvents}
  <form onSubmit={submitVolunteerForm}>
    <input
      type="text"
      placeholder="First Name"
      required
      className="form-control my-2"
      onChange={(e) => setVolunteerFirstName(e.target.value)}
    />
    <input
      type="text"
      placeholder="Last Name"
      required
      className="form-control my-2"
      onChange={(e) => setVolunteerLastName(e.target.value)}
    />
    <input
      type = "text"
      placeholder="Email"
      className="form-control my-2"
      onChange={(e) => setVolunteerEmail(e.target.value)}
    />
    <input
      type = "text"
      placeholder="Number"
      className="form-control my-2"
      onChange={(e) => setVolunteerNumber(e.target.value)}
    />
    <button type="submit">SignUp</button>
  </form>
</div>
)
  }

