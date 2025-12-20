import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const HRRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, isRoleLoading] = useRole();
  const location = useLocation();

  if (loading || isRoleLoading)
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  if (user && role === "hr") return children;

  // HR না হলে লগআউট করিয়ে দেওয়া যেতে পারে বা হোমপেজে পাঠানো যেতে পারে
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};
export default HRRoute;
