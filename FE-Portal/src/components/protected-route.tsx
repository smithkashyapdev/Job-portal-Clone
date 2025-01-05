/* eslint-disable react/prop-types */
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser, RedirectToSignIn } from "@clerk/clerk-react";


const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const { pathname } = useLocation();
  
  if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
    console.log('pathname', pathname, isSignedIn, isLoaded, user);
    return <RedirectToSignIn />;
  }
  console.log('user', user);
  if (
    user !== undefined &&
    !user?.unsafeMetadata?.role &&
    pathname !== "/onboarding"
  )
    return <Navigate to="/onboarding" />;

  return children;
};

export default ProtectedRoute;