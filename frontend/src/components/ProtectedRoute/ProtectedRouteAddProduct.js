import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../user_auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ImageProcess from "../ImageProcess/ImageProcess";

export default function ProtectedRouteAddProduct({ component: Component, ...rest }) {
  const [user, loading, error] = useAuthState(auth);
  return (
    loading? <h2> Loading </h2> : user ? <ImageProcess/> : <Navigate to="/user/login" />
  )
}