import { useNavigate } from "react-router-dom";
import "./index.css";

const NavBar = ({ type, restaurantId }) => {
  const navigate = useNavigate();

  const openNav = () => {
    document.getElementById("mySidebar").style.width = "250px";
  };

  const closeNav = () => {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div id="mySidebar" className="sidebar">
        <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
          &times;
        </a>
        <div className="sidebarContentcontainer">
          {type === "customer" ? (
            <>
              <a href="/dashboard">Dashboard</a>
              <a href="/MyBookings">My Bookings</a>
              <a href="/myRestaurant">My Restaurant</a>
              <a href="/business">Affiliate</a>
            </>
          ) : (
            <>
              <a href={`/employeeDashboard/${restaurantId}`}>dashboard</a>
            </>
          )}
        </div>
        <button
          type="button"
          className="btn btn-light logoutButton"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      <div id="main">
        <button className="openbtn" onClick={openNav}>
          &#9776;
        </button>
      </div>
    </>
  );
};

export default NavBar;
