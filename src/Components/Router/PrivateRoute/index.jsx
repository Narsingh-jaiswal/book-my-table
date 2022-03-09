import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../../NavBar";
import io from "socket.io-client";
import axios from "axios";

import { isLogin } from "../../../utils/checkIsLogin";
import { baseUrl } from "../../../constants/baseUrl";
import useSocket from "../../../Hooks/useSocket";

const PrivateRoute = ({ setSocket }) => {
  const { email, employeeId, type, restaurantId } = JSON.parse(
    localStorage.getItem("userData")
  );
  useSocket({ email, employeeId }, setSocket);

  return isLogin() ? (
    <>
      <NavBar type={type} restaurantId={restaurantId} />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
