import React, { useState } from "react";

export interface IOrganisation {
  orgName: string;
  phoneNumeber: string;
  adddressLine: string;
  emailAddress: string;
  postcode: string;
}

export interface IEvent {
  EventName: string;
  EventDescription: string;
  EventLocation: string;
  EventDate: string;
  EventLink: string;
  OrgId: string;
  EventID:string
}

export interface IVolunteer{
  firstName:string,
  lastName:string,
  email:string,
  number:String,
  eventID: Array<string>
}
