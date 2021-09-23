import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  const uloge = ["Bibliotekar", "Admin"];

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          uloge.includes(currentUser?.uloga.naziv) ? (
            <Component {...props} />
          ) : (
            <Redirect to="/403" />
          )
        ) : (
          <Redirect to="/admin/login" />
        );
      }}
    ></Route>
  );
}
