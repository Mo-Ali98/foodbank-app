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
  

interface IBtn {
    isClicked: string[],
    assignedTo: string,
  }

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding-top:5%;
    padding-left:20%;
    padding-right:20%;
    // flex-wrap: wrap;
`;

const Title = styled.div`
    font-size: 24px;
`;

const EventText = styled.div`
    inline-size: 550px;
    overflow-wrap: break-word;    
    font-size: 13px;
`;

const BannerSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top:2%;    
`;

const Image = styled.div`
    display: flex;
    float:right;
`;

const ContactContainer = styled.div`
    padding-top:10%;
`;

const ContactTitle = styled.div`
    padding-bottom:4%;
    font-size: 24px;
`;

const DivPadding = styled.div`
    padding-top:2%;
`;

const SubmitSection = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: auto;
    align-items: center;
    float: right;
    justify-content: space-between;
    padding-bottom:1%;
    padding-top:2%;  
`;

const CardContainer = styled.div`
    padding-top:10%;
`;

const CardTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
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
    padding-top:5%;
    width: 10rem;
    margin:1%;
`;
const CardButton = styled.button<IBtn>`
    background-color: ${props => props.isClicked.includes(props.assignedTo) ? '#7D57C2' : 'white'}; 
    color: ${props => props.isClicked.includes(props.assignedTo) ? 'white' : 'black'}; ; 
    border: 2px solid #008CBA;
    border-radius: 5px;
    ${CardBody}:hover & {
        background-color: '#7D57C2';
      }  
`;

export const Volunteer = () => {
    const [VolunteerFirstName, setVolunteerFirstName] = useState<string>("");
    const [VolunteerLastName, setVolunteerLastName] = useState<string>("");
    const [VolunteerEmail, setVolunteerEmail] = useState<string>("");
    const [VolunteerNumber, setVolunteerNumber] = useState<string>("");
    const [EventsData, setEventData] = useState<DocumentData>();
    const[orgData, setOrgData] = useState<DocumentData>()
    const [SelectedEvents, setSelectedEvents] = useState<string[]>([]);
    const [dateSelected, setDateSelected] = useState<string[]>([]);

    const[Answer,setAnswer] = useState<string[]>([]);
  
    const url = window.location.href.split("/");
  
    const orgID = url[4];
  
    //Finds all the events for the org given a url of /volunteer/orgID.
    useEffect(() => {
      const getData = async () => {
        const eventsRef = collection(db, `events`);
        const eventsQuerySnap = await getDocs(eventsRef);
        console.log(eventsQuerySnap.docs.length);
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
    const toggleEventSelection = (eventId: string,eventDate: string) => {
      if (SelectedEvents.includes(eventId)) {
        setSelectedEvents((ids) => [...ids].filter((id) => id !== eventId));
      } else {
        console.log(eventId)
        setDateSelected((prev) => [...prev,eventDate])
        setSelectedEvents((ids) => [...ids, eventId]);
      }
    };
  
    console.log(SelectedEvents);
  
    // Renders events on page + checkboxes for now
    const renderEvents = EventsData?.map((doc: any) => {
      const data = doc.data();
      return (
        <p key={data.EventName}>
          <input
            type="checkbox"
            id={data.EventName}
            onChange={() => toggleEventSelection(doc.id)}
          />
          {data.EventName} - {data.EventDate}
        </p>
      );
    });
  
    const submitVolunteerForm = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const newVolunteer: IVolunteer = {
            firstName: VolunteerFirstName,
            lastName: VolunteerLastName,
            email: VolunteerEmail,
            number: VolunteerNumber,
            eventID: SelectedEvents,
            orgID: orgID
        };
  
        await setDoc(doc(db, "Volunteer", VolunteerFirstName), 
          newVolunteer,
        );
      } catch (error) {
        console.log(error);
      }
    };

   
      
    return(
        <Container>
            <BannerSection>
                <Title>{orgData?.orgName}</Title>
                <Image>
                    <img src="https://www.w3schools.com/css/img_5terre_wide.jpg" alt="Paris" width= "450px" height= "250px"/>
                </Image>
            </BannerSection>
            <CardContainer>
                <Scroll>
                <Title>Please scroll horizontally and select dates you are available</Title>
                    {EventsData?.map((doc: any,key: number)=> (
                        <Card key={key} id={doc.data().EventName}>
                            <div className="card-body">
                                <CardTitle>{doc.data().EventName}</CardTitle>
                                    <CardBody>{doc.data().EventDate}</CardBody>
                                    <CardBody>
                                        <CardButton 
                                            isClicked = {dateSelected} 
                                            assignedTo={doc.data().EventDate} 
                                            onClick={()=> {toggleEventSelection(doc.id,doc.data().EventDate)}}>
                                            Select
                                        </CardButton>
                                    </CardBody>
                                </div>
                        </Card>
                    ))}            
                    </Scroll>
            </CardContainer>   
            <ContactContainer>
                <ContactTitle>Billing address</ContactTitle>
                <form className="needs-validation" onSubmit={submitVolunteerForm}>
                    <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="firstName">First name</label>
                        <input type="text" className="form-control" id="firstName" placeholder="" required 
                            onChange={(e) => setVolunteerFirstName(e.target.value)} style={{borderColor:"#7D57C2"}}/>
                        <div className="invalid-feedback">
                        Valid first name is required.
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="lastName">Last name</label>
                        <input type="text" className="form-control" id="lastName" placeholder="" required
                            onChange={(e) => setVolunteerLastName(e.target.value)} style={{borderColor:"#7D57C2"}}/>
                        <div className="invalid-feedback">
                        Valid last name is required.
                        </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="Email Address">Email Address</label>
                        <input type="text" className="form-control" id="email" placeholder=""  required
                            onChange={(e) => setVolunteerEmail(e.target.value)} style={{borderColor:"#7D57C2"}}/>
                        <div className="invalid-feedback">
                        Valid emaill address is required.
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="Mobile Number">Mobile Number</label>
                        <input type="text" className="form-control" id="mobileNumber" placeholder=""  required
                            onChange={(e) => setVolunteerNumber(e.target.value)} style={{borderColor:"#7D57C2"}}/>
                        <div className="invalid-feedback">
                        Valid mobile number is required.
                        </div>
                    </div>
                    <DivPadding>
                        <h6 className="mb-3">Question 1 - This is a Dummy question, enter your answer below</h6>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" 
                            onChange={(e) => setAnswer(e.target.value)} style={{borderColor:"#7D57C2"}}/>
                        <br/>
                        Thank you so much for volunteering,we really appreciate your support. 
                        Food banks rely on your attendance, so please do not sign up if you are not able to attend.
                    </DivPadding>
                    </div>
                    <SubmitSection>
                    <button type="button" className="btn btn-primary">Submit</button>
                        <DivPadding>Powered By Volunteria.</DivPadding>
                </SubmitSection>
                </form>
                </ContactContainer>
        </Container>        
    );
}