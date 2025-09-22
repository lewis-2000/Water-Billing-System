import React from "react";
import MenuItem from "./MenuItem";

const SideMenu = ({ activePage, setActivePage }) => {
  return (
    <div className="side-menu">
      <div className="logo">
        <p>Water Billing 🌊 </p>
      </div>

      <MenuItem
        item="Home"
        icon="home"
        action="home"
        active={activePage === "home"}
        onClick={setActivePage}
      />
      <MenuItem
        item="Meter"
        icon="meter"
        action="meter"
        active={activePage === "meter"}
        onClick={setActivePage}
      />
      <MenuItem
        item="Settings"
        icon="settings"
        action="settings"
        active={activePage === "settings"}
        onClick={setActivePage}
      />
      <MenuItem
        item="Billing"
        icon="billing"
        action="billing"
        active={activePage === "billing"}
        onClick={setActivePage}
      />
      <MenuItem
        item="Registration"
        icon="registration"
        action="registration"
        active={activePage === "registration"}
        onClick={setActivePage}
      />
      <MenuItem
        item="Change Password"
        icon="changePassword"
        action="changePassword"
        active={activePage === "changePassword"}
        onClick={setActivePage}
      />
      <MenuItem
        item="Profile"
        icon="user"
        action="profile"
        active={activePage === "profile"}
        onClick={setActivePage}
      />
      <MenuItem
        item="Logout"
        icon="logout"
        action="logout"
        active={activePage === "logout"}
        onClick={setActivePage}
      />
    </div>
  );
};

export default SideMenu;
