import React from "react";
import "./sidebar.css";

interface SidebarItemProps {
  loading?: boolean;
  disabled?: boolean;
  isActive?: boolean;
  onClick?: () => void;
  text: string;
  number?: number;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  loading,
  disabled,
  isActive,
  onClick,
  text,
  number,
}) => {
  const renderNumber = () => {
    if (!number) {
      return null;
    }
    return <div className="counter">{number}</div>;
  };

  if (loading || disabled) {
    return <div className="sidebar-item-disabled">{text}</div>;
  }

  if (isActive) {
    return (
      <div className="sidebar-item sidebar-item-selected" onClick={onClick}>
        {text}
        {renderNumber()}
      </div>
    );
  }

  return (
    <div className="sidebar-item" onClick={onClick}>
      {text}
      {renderNumber()}
    </div>
  );
};
