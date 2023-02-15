import { DocumentData } from "firebase/firestore";
import React from "react";
import logo from "../assets/logo-transparent.png";
import { SidebarContainer } from "../components/sidebar/sidebar";
import { SidebarItem } from "../components/sidebar/SidebarItem";
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
  const { logOut, eventsData, volunteerData } = useAuth();

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
      <SidebarContainer OrgUserData={OrgUserData} loading={loading} />
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
