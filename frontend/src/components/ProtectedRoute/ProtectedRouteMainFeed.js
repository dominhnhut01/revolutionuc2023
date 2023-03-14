import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../user_auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import MainFeed from "../MainFeed/MainFeed";

export default function ProtectedRouteMainFeed({ component: Component, ...rest }) {
  const [user, loading, error] = useAuthState(auth);
  console.log("xxx.inside-protected-route" + user);
  return (
    loading? <h2> Loading </h2> : user ? <MainFeed/> : <Navigate to="/user/login" />
  )
}