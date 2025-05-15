// src/components/ProtectedRoutes.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // adjust if your path is different

export const ProtectedRoutes = ({ children, redirectTo = "/signin" }) => {
  const { isloading, isLoggedIn } = useAuth();
 
  if (isloading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Prevent back navigation by replacing the route
  if (!isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};
