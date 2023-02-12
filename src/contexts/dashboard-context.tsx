import React, { ReactNode, useState } from "react";

interface DashboardContext {
  createEvent: boolean;
  setCreateEvent: React.Dispatch<React.SetStateAction<boolean>>;
  viewEvents: boolean;
  setViewEvents: React.Dispatch<React.SetStateAction<boolean>>;
  viewVolunteers: boolean;
  setViewVolunteers: React.Dispatch<React.SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const DashboardContext = React.createContext<DashboardContext | null>(null);

interface DashboardContextProps {
  children: ReactNode;
}

export const DashBoardProvider: React.FC<DashboardContextProps> = ({
  children,
}) => {
  const [createEvent, setCreateEvent] = useState<boolean>(false);
  const [viewEvents, setViewEvents] = useState<boolean>(true);
  const [viewVolunteers, setViewVolunteers] = useState<boolean>(false);

  return (
    <DashboardContext.Provider
      value={{
        createEvent,
        setCreateEvent,
        viewEvents,
        setViewEvents,
        viewVolunteers,
        setViewVolunteers,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = (): DashboardContext => {
  const context = React.useContext(DashboardContext);

  if (context === null) {
    throw new Error("useDashboard must be used within a DashBoardProvider");
  }

  return context;
};
