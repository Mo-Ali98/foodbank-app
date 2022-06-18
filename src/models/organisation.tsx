import React, { useState } from "react";

export interface IOrganisation {
  orgName: string;
  emailAddress: string;
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
