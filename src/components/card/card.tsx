import React from "react";
import "./card.css";

interface CardProps {
  title: string;
  description: string;
  date: string;
}

export const Card: React.FC<CardProps> = ({ title, description, date }) => {
  return (
    <div className="events-card">
      <div className="d-flex flex-column gap-2">
        <div className="events-card-header">
          <p>{title}</p>
        </div>
        <div className="events-card-desc">
          <p>{description}</p>
        </div>
      </div>

      <div className="w-100">
        <div className="divider" />
        <div className="events-card-footer">
          <p>{date}</p>
        </div>
      </div>
    </div>
  );
};

interface VolunteerCardProps {
  name: string;
  contact: string;
}

export const VolunteerCard: React.FC<VolunteerCardProps> = ({
  name,
  contact,
}) => {
  return (
    <div className="volunteer-card">
      <div className="d-flex flex-column gap-2">
        <div className="events-card-header">
          <p>{name}</p>
        </div>
      </div>

      <div className="w-100">
        <div className="divider" />
        <div className="events-card-footer">
          <p>{contact}</p>
        </div>
      </div>
    </div>
  );
};
