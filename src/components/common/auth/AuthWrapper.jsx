import React, { useState } from "react";
import { useAuth } from "reactfire";
import SignOut from "context/singout";
import Loading from "./Loading";
import Login from "./Login";

export default function AuthWrapper({ children }) {
  const auth = useAuth();
  const [user, setUser] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  var signOut = () => {
    auth.signOut();
  };

  auth.onAuthStateChanged((user) => {
    setUser(user);
    setIsComplete(true);
  });

  if (!isComplete) return <Loading texto="loading...." />;

  if (user) {
    return <SignOut.Provider value={signOut}>{children}</SignOut.Provider>;
  } else {
    return <Login />;
  }
}
