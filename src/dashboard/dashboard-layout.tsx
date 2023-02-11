import { DocumentData } from "firebase/firestore";
import React from "react";
import logo from "../assets/logo-transparent.png";
import { SidebarItem } from "../components/SidebarItem";
import { useAuth } from "../contexts/AuthContext";
import { useDashboard } from "../contexts/dashboard-context";
import "./dashboard.css";

interface Props {
  OrgUserData?: DocumentData;
  loading?: boolean;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<Props> = ({
  OrgUserData,
  loading,
  children,
}) => {
  const { logOut } = useAuth();

  const {
    viewEvents,
    createEvent,
    setCreateEvent,
    setViewEvents,
    setViewVolunteers,
    viewVolunteers,
  } = useDashboard();

  return (
    <div className="d-flex flex-row">
      <div className="sidebar">
        <div className="sidebar-container">
          <img
            src={logo}
            alt="Volunteria"
            width={"100px"}
            height={"100px"}
            loading={"lazy"}
          />

          <p>{OrgUserData?.orgName}</p>
          <SidebarItem
            onClick={() => {
              setCreateEvent(false);
              setViewVolunteers(false);
              setViewEvents(true);
            }}
            text={"View events"}
            isActive={viewEvents}
            disabled={loading}
          ></SidebarItem>
          <SidebarItem
            onClick={() => {
              setCreateEvent(false);
              setViewEvents(false);
              setViewVolunteers(true);
            }}
            text={"View volunteers"}
            isActive={viewVolunteers}
            disabled={loading}
          ></SidebarItem>
          <SidebarItem
            onClick={() => {
              setCreateEvent(true);
              setViewEvents(false);
              setViewVolunteers(false);
            }}
            text={"Create event"}
            isActive={createEvent}
            disabled={loading}
          ></SidebarItem>
          <button className="button-3 mt-auto" onClick={logOut}>
            LOGOUT
          </button>
        </div>
      </div>
      <main className="main">
        <div className="main-navbar">
          <nav className="navbar navbar-expand-lg navbar-light bg-white px-4">
            <div className="container-fluid">
              <img src={logo} alt="Volunteria" width={"60px"} height={"60px"} />
              <button
                type="button"
                className="navbar-toggler"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav ms-auto d-flex align-items-center mx-4 gap-2">
                  <SidebarItem
                    onClick={() => {
                      setCreateEvent(false);
                      setViewVolunteers(false);
                      setViewEvents(true);
                    }}
                    text={"View events"}
                    isActive={viewEvents}
                    disabled={loading}
                  ></SidebarItem>
                  <SidebarItem
                    onClick={() => {
                      setCreateEvent(false);
                      setViewEvents(false);
                      setViewVolunteers(true);
                    }}
                    text={"View volunteers"}
                    isActive={viewVolunteers}
                    disabled={loading}
                  ></SidebarItem>
                  <SidebarItem
                    onClick={() => {
                      setCreateEvent(true);
                      setViewEvents(false);
                      setViewVolunteers(false);
                    }}
                    text={"Create event"}
                    isActive={createEvent}
                    disabled={loading}
                  ></SidebarItem>
                  <button className="button-3 mx-2" onClick={logOut}>
                    LOGOUT
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>
        {children}
      </main>
    </div>
  );
};
