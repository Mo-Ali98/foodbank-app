import { DocumentData } from "firebase/firestore";
import React from "react";
import "./sidebar.css";
import { SidebarItem } from "./SidebarItem";
import logo from "../../assets/logo-transparent.png";
import { useDashboard } from "../../contexts/dashboard-context";
import { useAuth } from "../../contexts/AuthContext";

interface SidebarContainerProps {
  OrgUserData?: DocumentData;
  loading?: boolean;
}

export const SidebarContainer: React.FC<SidebarContainerProps> = ({
  OrgUserData,
  loading,
}) => {
  const {
    viewEvents,
    createEvent,
    setCreateEvent,
    setViewEvents,
    setViewVolunteers,
    viewVolunteers,
  } = useDashboard();
  const { logOut, eventsData, volunteerData } = useAuth();

  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <img
          src={logo}
          alt="Volunteria"
          width={"100px"}
          height={"100px"}
          loading={"lazy"}
        />

        <p>
          {loading && (
            <span
              className="spinner-border spinner-border-sm mx-2"
              role="status"
              aria-hidden="true"
              style={{ color: "#7d57c2" }}
            />
          )}
          {OrgUserData?.orgName}
        </p>
        <SidebarItem
          onClick={() => {
            setCreateEvent(false);
            setViewVolunteers(false);
            setViewEvents(true);
          }}
          text={"Events"}
          number={eventsData?.length}
          isActive={viewEvents}
          disabled={loading}
        />
        <SidebarItem
          onClick={() => {
            setCreateEvent(false);
            setViewEvents(false);
            setViewVolunteers(true);
          }}
          text={"Volunteers"}
          number={volunteerData?.length}
          isActive={viewVolunteers}
          disabled={loading}
        />
        <SidebarItem
          onClick={() => {
            setCreateEvent(true);
            setViewEvents(false);
            setViewVolunteers(false);
          }}
          text={"Create event"}
          isActive={createEvent}
          disabled={loading}
        />
        <button className="button-3 mt-auto" onClick={logOut}>
          LOGOUT
        </button>
      </div>
    </div>
  );
};
