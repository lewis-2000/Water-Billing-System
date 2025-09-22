import React from "react";
import Home from "./home";
import MeterView from "../components/views/MeterView";
import BillsView from "../components/views/BillsView";
import ChangePasswordView from "../components/views/ChangePasswordView";
import PaymentStatusView from "../components/views/PaymentStatusView";
import RegistrationView from "../components/views/RegistrationView";

const Content = ({ activePage }) => {
  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <Home />;
      case "meter":
        return <MeterView />;
      case "billing":
        return <BillsView />;
      case "registration":
        return <RegistrationView />;
      case "changePassword":
        return <ChangePasswordView />;
      case "paymentStatus":
        return <PaymentStatusView />;
      case "settings":
        return <h1>Settings Page</h1>;
      case "profile":
        return <h1>Your Profile</h1>;
      case "logout":
        return <h1>Logging out...</h1>;
      default:
        return <h1>Not Found</h1>;
    }
  };

  return <div className="content">{renderPage()}</div>;
};

export default Content;
