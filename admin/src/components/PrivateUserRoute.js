import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateUserRoute({ comp: Component, ...rest }) {
  const { currentUser } = useAuth();
  console.log("currentUser", currentUser);
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Component {...props} /> : <Redirect to="/403" />;
      }}
    ></Route>
  );
}
