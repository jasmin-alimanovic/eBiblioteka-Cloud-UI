import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebaseClient";
import { getZaposlenikByFID } from "../services/zaposlenikService";
import { getUserByFID } from "../services/userService";
import userEvent from "@testing-library/user-event";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    var user = auth.currentUser;
    return user.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged((user) => {
      if (user) {
        getZaposlenikByFID(user.uid)
          .then((data) => {
            if (data) setCurrentUser({ ...user, ...data });
            setLoading(false);
          })
          .catch(() => {
            getUserByFID(user.uid).then((u) => {
              setCurrentUser({ ...userEvent, ...u });
              setLoading(false);
            });
          });
      } else {
        setCurrentUser(null);
        setLoading(false);
      }

      // setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
