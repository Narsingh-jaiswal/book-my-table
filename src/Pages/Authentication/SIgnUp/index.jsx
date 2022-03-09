import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { newUserSignUp } from "../../../api";
import { baseUrl } from "../../../constants/baseUrl";

const SignUp = () => {
  const [userDetail, setLoginDetail] = useState({
    email: "",
    password: "",
    name: "",
    contact: "",
    address: ""
  });
  const navigate = useNavigate();

  const createUser = () => {
    newUserSignUp(userDetail).then(() => {
      navigate("/login");
    });
  };

  const onChange = (e) => {
    setLoginDetail({ ...userDetail, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div
        style={{
          margin: "200px 31px 0px",
          background: "black",
          padding: "36px 20px"
        }}
      >
        <div className="input-group mb-3">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="User Name"
            onChange={onChange}
            value={userDetail.name}
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="email"
            onChange={onChange}
            value={userDetail.email}
          />
        </div>

        <div className="input-group mb-3">
          <input
            type="tel"
            name="contact"
            className="form-control"
            placeholder="Contact Number"
            onChange={onChange}
            value={userDetail.contact}
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            name="address"
            className="form-control"
            placeholder="address"
            onChange={onChange}
            value={userDetail.address}
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="password"
            onChange={onChange}
            value={userDetail.password}
          />
        </div>
        <div className="col-auto">
          <a
            href="/login"
            style={{
              color: "white",
              width: "100%",
              margin: 5
            }}
          >
            Already have an account ?
          </a>
          <button
            type="submit"
            className="btn btn-primary mb-3"
            onClick={createUser}
            style={{ width: "100%" }}
          >
            SignUp
          </button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
