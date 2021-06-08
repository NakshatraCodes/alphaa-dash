import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login, Dashboard } from "../index";
import { AuthService } from "../../services/authService";

const Routing = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(AuthService.isLoggedIn());
  const [welcome, setWelcome] = useState(false);
  const loginSession = (token) => {
    setLoggedIn(true);
    setWelcome(true);
  };
  const logoutSession = () => {
    AuthService.signOut();
    setLoggedIn(false);
  };
  return (
    <>
      <BrowserRouter>
        <Switch>
          {isLoggedIn ? (
            <Route
              path="/todo"
              exact
              render={(props) => (
                <Dashboard
                  open={welcome}
                  close={() => setWelcome(false)}
                  {...props}
                  logoutSession={logoutSession}
                />
              )}
            />
          ) : (
            <>
              <Route
                path="/login"
                render={(props) => (
                  <Login {...props} loginSession={loginSession} />
                )}
              />
              <Route
                path="*"
                render={(props) => (
                  <Login {...props} loginSession={loginSession} />
                )}
              />
            </>
          )}
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Routing;
