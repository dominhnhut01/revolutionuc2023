import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../user_auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import CreateUser from "../CreateUser/CreateUser";

export default function ProtectedRouteCreateUser({ component: Component, ...rest }) {
  const [user, loading, error] = useAuthState(auth);
  console.log("xxx.inside-protected-route" + user);
  return (
    loading? <h2> Loading </h2> : user ? <CreateUser/> : <Navigate to="/user/login" />
  )
}