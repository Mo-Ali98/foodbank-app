import React from "react";
import "./sidebar.css";

interface SidebarItemProps {
  loading?: boolean;
  disabled?: boolean;
  isActive?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  text: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  loading,
  disabled,
  isActive,
  onClick,
  children,
  text,
}) => {
  if (loading || disabled) {
    return <div className="sidebar-item-disabled"> {text}</div>;
  }

  if (isActive) {
    return (
      <div className="sidebar-item sidebar-item-selected" onClick={onClick}>
        {text}
        {children}
      </div>
    );
  }

  return (
    <div className="sidebar-item" onClick={onClick}>
      {text}
      {children}
    </div>
  );
};
