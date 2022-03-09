import { Navigate, Outlet } from "react-router-dom";
import useSocket from "../../../Hooks/useSocket";
import { isLogin } from "../../../utils/checkIsLogin";

const PublicRoute = ({ setSocket }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  useSocket(userData, setSocket);
  return (
    <>
      {isLogin() ? (
        userData?.type === "employee" ? (
          <Navigate to={`/employeeDashboard/${userData?.restaurantId}`} />
        ) : (
          <Navigate to="/dashboard" />
        )
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PublicRoute;
