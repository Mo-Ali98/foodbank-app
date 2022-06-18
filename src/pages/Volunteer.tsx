import React from "react";
import { ContactForm } from "../components/ContactForm";
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


export const Volunteer = () => {
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
            <DateSelection/>
            <ContactForm/>
        </Container>        
    );
}