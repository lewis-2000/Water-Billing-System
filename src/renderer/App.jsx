import React from "react";
import Home from "./pages/home";
import Client from "./pages/client";
import RegistrationView from "./components/views/RegistrationView";
import { loggedIn } from "./actions/userInteraction";

export default function App() {
  console.log(loggedIn());
  return (
    <div className="App-container">
      {/* <Home /> */}

      {loggedIn() ? <Client /> : <RegistrationView />}
      {/* <Client /> */}
    </div>
  );
}
