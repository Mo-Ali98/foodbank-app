import React from "react";
// import { ContactForm } from "../components/ContactForm";
import { DateSelection } from "../components/DateSelection";

import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding-top:5%;
    padding-left:20%;
    padding-right:20%;
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

const SubmitText = styled.div`
    padding-top:2%;
`;

const LowerSection = styled.div`
    padding-top:2%;
`;

const SubmitButton = styled.div`
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
    display: flex;
    flex-direction: row;
    margin:2%;
    padding-top:10%;
    padding-left:20%;
    padding-right:20%;
`;

const CardTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 34px;
`;

const CardBody = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
`;


export const Volunteer = () => {

    const dates: string[]= ["21-06-2021","23-06-2022","24-06-2022","27-06-2022","28-06-2022"]

    const getMonth = (val:string) :string => {
        const months: string[]= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        let date :string = months[val];
        return date;
    }

    return(
        <Container>
            <Title>Event Name</Title>
            <BannerSection>
                <EventText>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                    It has survived not only five centuries, but also the leap into electronic 
                    typesetting, remaining essentially unchanged. 
                    <br/>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                    It has survived not only five centuries, but also the leap into electronic 
                    typesetting, remaining essentially unchanged. 
                </EventText>
                <Image>
                    <img src="https://www.w3schools.com/css/img_5terre_wide.jpg" alt="Paris" width= "450px" height= "250px"/>
                </Image>
            </BannerSection>
            <CardContainer>
                {dates.map((item: string,key:number) => (
                        <div className="card" style={{width: "20rem",margin:"1%",flexWrap: "wrap"}} key = {key}>
                            <div className="card-body">
                                <CardTitle>{item.split("-")[0]}</CardTitle>
                                <CardBody>{getMonth(item.split("-")[1].split("0")[1])}</CardBody>
                                <CardBody>{item.split("-")[2]}</CardBody>
                                <CardBody><button type="button" className="btn btn-outline-primary btn-sm">Select</button></CardBody>
                            </div>
                        </div>
                ))}
            </CardContainer>   
            <ContactContainer>
                <ContactTitle>Billing address</ContactTitle>
                {/* <form className="needs-validation" novalidate> */}
                <form className="needs-validation">
                    <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="firstName">First name</label>
                        <input type="text" className="form-control" id="firstName" placeholder=""  required/>
                        <div className="invalid-feedback">
                        Valid first name is required.
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="lastName">Last name</label>
                        <input type="text" className="form-control" id="lastName" placeholder=""  required/>
                        <div className="invalid-feedback">
                        Valid last name is required.
                        </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="Email Address">Email Address</label>
                        <input type="text" className="form-control" id="email" placeholder="" required/>
                        <div className="invalid-feedback">
                        Valid emaill address is required.
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="Mobile Number">Mobile Number</label>
                        <input type="text" className="form-control" id="mobileNumber" placeholder=""  required/>
                        <div className="invalid-feedback">
                        Valid mobile number is required.
                        </div>
                    </div>
                    <LowerSection>
                        <h6 className="mb-3">Question 1 - This is a Dummy question, enter your answer below</h6>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        <br/>
                        Thank you so much for volunteering to...., we really appreciate your support. 
                        Food banks rely on your attendance, so please do not sign up if you are not able to attend.
                    </LowerSection>
                    </div>
                </form>
                <SubmitButton>
                    <button type="button" className="btn btn-primary">Submit</button>
                    <SubmitText>Powered By Volunteria.</SubmitText>
                </SubmitButton>
                </ContactContainer>
        </Container>        
    );
}