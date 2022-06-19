import React, {useState} from "react";
import styled from "styled-components";

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
    font-size: 34px;
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
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [mobile, setMobile] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");
    const [dateSelected, setDateSelected] = useState<string[]>([]);


    const dates: string[]= ["21-06-2021","23-06-2022","24-06-2022","27-06-2022","28-06-2022","29-06-2021","13-07-2022","14-08-2022","17-09-2022","28-09-2022"];

    const getMonth = (val:string) :string => {
        const months: string[]= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        let date :string = months[val];
        return date;
    }

    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        try {
          console.log("email",email)
        } catch (error) {
          console.log(error);
         
        }
      };

    return(
        <Container>
            <Title>Organisation Name</Title>
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
            <Title>Please scroll horizontally and select dates you are available</Title>
            <Scroll>
                {dates.map((item: string,key:number) => (
                        <Card key={key}>
                            <div className="card-body">
                                <CardTitle>{item.split("-")[0]}</CardTitle>
                                <CardBody>{getMonth(item.split("-")[1].split("0")[1])}</CardBody>
                                <CardBody>{item.split("-")[2]}</CardBody>
                                <CardBody>
                                    <CardButton isClicked = {dateSelected} assignedTo={item} onClick={(e => {
                                        setDateSelected((prev) => [...prev,item]);
                                        })}>
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
                <form className="needs-validation" onSubmit={submitForm}>
                    <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="firstName">First name</label>
                        <input type="text" className="form-control" id="firstName" placeholder="" required 
                            onChange={(e) => setFirstName(e.target.value)} style={{borderColor:"#7D57C2"}}/>
                        <div className="invalid-feedback">
                        Valid first name is required.
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="lastName">Last name</label>
                        <input type="text" className="form-control" id="lastName" placeholder="" required
                            onChange={(e) => setLastName(e.target.value)} style={{borderColor:"#7D57C2"}}/>
                        <div className="invalid-feedback">
                        Valid last name is required.
                        </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="Email Address">Email Address</label>
                        <input type="text" className="form-control" id="email" placeholder=""  required
                            onChange={(e) => setEmail(e.target.value)} style={{borderColor:"#7D57C2"}}/>
                        <div className="invalid-feedback">
                        Valid emaill address is required.
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="Mobile Number">Mobile Number</label>
                        <input type="text" className="form-control" id="mobileNumber" placeholder=""  required
                            onChange={(e) => setMobile(e.target.value)} style={{borderColor:"#7D57C2"}}/>
                        <div className="invalid-feedback">
                        Valid mobile number is required.
                        </div>
                    </div>
                    <DivPadding>
                        <h6 className="mb-3">Question 1 - This is a Dummy question, enter your answer below</h6>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" 
                            onChange={(e) => setAnswer(e.target.value)} style={{borderColor:"#7D57C2"}}/>
                        <br/>
                        Thank you so much for volunteering to...., we really appreciate your support. 
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