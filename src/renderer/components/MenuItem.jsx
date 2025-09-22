import React from "react";
import {
  FaHome,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import { FaCreditCard } from "react-icons/fa6";
import { MdAppRegistration } from "react-icons/md";

const iconMap = {
  home: <FaHome />,
  settings: <FaCog />,
  user: <FaUser />,
  logout: <FaSignOutAlt />,
  meter: <FaTachometerAlt />,
  changePassword: <MdOutlinePassword />,
  billing: <FaCreditCard />,
  registration: <MdAppRegistration />,
};

const MenuItem = ({ item, icon, action, active, onClick }) => {
  return (
    <div
      className={`menu-item ${active ? "active" : ""}`}
      onClick={() => onClick(action)}
    >
      <div className="menu-item-icon">{iconMap[icon]}</div>
      <p className="item-name">{item}</p>
    </div>
  );
};

export default MenuItem;
