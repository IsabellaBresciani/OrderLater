import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import React from 'react'; 

const PublicRoute = ({ children }) => {
  console.log("PublicRoute rendered");
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) return <Navigate to="/" />;
  console.log("PublicRoute rendered 2");
  return children;
};

export default PublicRoute;