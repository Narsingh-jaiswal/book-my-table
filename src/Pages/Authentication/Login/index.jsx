import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../constants/baseUrl";
import Form from "react-bootstrap/Form";
import { customerLogin, employeeLogin } from "../../../api";

const Login = () => {
  const [loginDetail, setLoginDetail] = useState({ email: "", password: "" });
  const [loginType, setLoginType] = useState("customer");
  const navigate = useNavigate();

  const login = () => {
    localStorage.clear();

    if (loginType === "customer") {
      customerLogin(loginDetail).then((response) => {
        if (response.data.length > 0) {
          const userData = response.data[0];
          delete userData["password"];
          userData.type = loginType;
          localStorage.setItem("isLogin", true);
          localStorage.setItem("userData", JSON.stringify(userData));
          navigate("/dashboard");
        }
      });
    }

    if (loginType === "employee") {
      employeeLogin(loginDetail).then((response) => {
        if (response.data.length > 0) {
          const userData = response.data[0];
          delete userData["password"];
          userData.type = loginType;
          localStorage.setItem("isLogin", true);
          localStorage.setItem("userData", JSON.stringify(userData));
          navigate(`/employeeDashboard/${userData.restaurantId}`);
        }
      });
    }
  };

  const onChange = (e) => {
    setLoginDetail({ ...loginDetail, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        margin: "200px 31px 0px",
        background: "black",
        padding: "36px 20px"
      }}
    >
      <div style={{ display: "flex" }}>
        <Form.Check
          label="Customer Login"
          name="loginType"
          type="radio"
          style={{ margin: 10, color: "white" }}
          onClick={() => setLoginType("customer")}
        />
        <Form.Check
          label="Employee Login"
          name="loginType"
          type="radio"
          onClick={() => setLoginType("employee")}
          style={{ margin: 10, color: "white" }}
        />
      </div>
      <div className="input-group mb-3">
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Username"
          onChange={onChange}
        />
      </div>

      <div className="input-group mb-3">
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="password"
          onChange={onChange}
        />
      </div>
      <div className="col-auto">
        <a
          href="/signUp"
          style={{
            color: "white",
            width: "100%",
            margin: 5
          }}
        >
          Create an account ?
        </a>
        <button
          type="submit"
          className="btn btn-primary mb-3"
          onClick={login}
          style={{ width: "100%" }}
        >
          Login
        </button>
      </div>
    </div>
  );
};
export default Login;
