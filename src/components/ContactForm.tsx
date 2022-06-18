import React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding-top:10%;
    padding-left:15%;
    padding-right:15%;
    padding-bottom:5%;
`;

const Title = styled.div`
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
    justify-content: space-between;
    padding-bottom:1%;
    padding-top:2%;  
`;


export const ContactForm = () => {
    return (
        <Container>
        <Title>Billing address</Title>
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
        </Container>
    );
  }