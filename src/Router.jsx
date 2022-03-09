import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Affiliate from "./Components/Affilated";
import MyRestaurant from "./Components/MyRestaurant";
import RestaurantDetail from "./Components/MyRestaurant/components/RestaurantDetail";
import PrivateRoute from "./Components/Router/PrivateRoute";
import PublicRoute from "./Components/Router/PublicRoute";
import Login from "./Pages/Authentication/Login";
import SignUp from "./Pages/Authentication/SIgnUp";
import Billing from "./Pages/Billing";
import Dashboard from "./Pages/Dashboard";
import ViewRestaurantDetail from "./Pages/Dashboard/components/ViewRestaurantDetail";
import EmployeeDashboard from "./Pages/EmployeeDashboard";
import MyBookings from "./Pages/MyBookings";
import MyWishList from "./Pages/MyWishList";
import TableView from "./Pages/TableView";
import TrackOrder from "./Pages/TrackOrder";
import ViewMenu from "./Pages/ViewMenu";
import ViewOrder from "./Pages/ViewOrder";
import Orders from "./Pages/ViewOrder/Components/Orders";

const Router = () => {
  const [socket, setSocket] = useState(null);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute setSocket={setSocket} />} path="/">
            <Route element={<Login />} path="/" />
          </Route>
          <Route element={<PublicRoute setSocket={setSocket} />} path="/login">
            <Route element={<Login />} path="/login" />
          </Route>

          <Route element={<PublicRoute setSocket={setSocket} />} path="/signUp">
            <Route element={<SignUp />} path="/signUp" />
          </Route>

          <Route
            element={<PrivateRoute setSocket={setSocket} />}
            path="/business"
          >
            <Route element={<Affiliate />} path="/business" />
          </Route>
          <Route
            element={<PrivateRoute setSocket={setSocket} />}
            path="/myRestaurant"
          >
            <Route
              element={<MyRestaurant socket={socket} />}
              path="/myRestaurant"
            />
          </Route>
          <Route
            element={<PrivateRoute setSocket={setSocket} />}
            path="/restaurant/:restaurantId"
          >
            <Route
              element={<RestaurantDetail socket={socket} />}
              path="/restaurant/:restaurantId"
            />
          </Route>

          <Route
            element={<PrivateRoute setSocket={setSocket} />}
            path="/dashboard"
          >
            <Route element={<Dashboard socket={socket} />} path="/dashboard" />
          </Route>

          <Route
            element={<PrivateRoute setSocket={setSocket} />}
            path="/allRestaurant/:restaurantId"
          >
            <Route
              element={<ViewRestaurantDetail socket={socket} />}
              path="/allRestaurant/:restaurantId"
            />
          </Route>

          <Route
            element={<PrivateRoute setSocket={setSocket} />}
            path="/viewtable/:restaurantId/:tableId"
          >
            <Route
              element={<TableView socket={socket} />}
              path="/viewtable/:restaurantId/:tableId"
            />
          </Route>

          <Route
            element={<PrivateRoute setSocket={setSocket} />}
            path="/table/:restaurantId/:tableId"
          >
            <Route
              element={<TableView socket={socket} />}
              path="/table/:restaurantId/:tableId"
            />
          </Route>

          <Route
            element={<PrivateRoute setSocket={setSocket} />}
            path="/MyBookings"
          >
            <Route
              element={<MyBookings socket={socket} />}
              path="/MyBookings"
            />
          </Route>

          <Route
            element={<PrivateRoute setSocket={setSocket} />}
            path="/viewMenu"
          >
            <Route element={<ViewMenu socket={socket} />} path="/viewMenu" />
          </Route>

          <Route
            element={<PrivateRoute setSocket={setSocket} />}
            path="/myWishList"
          >
            <Route
              element={<MyWishList socket={socket} />}
              path="/myWishList"
            />
          </Route>
          <Route
            element={<PrivateRoute setSocket={setSocket} />}
            path="/trackorder/:bookingId"
          >
            <Route
              element={<TrackOrder socket={socket} />}
              path="/trackorder/:bookingId"
            />
          </Route>

          <Route
            element={<PrivateRoute setSocket={setSocket} />}
            path="/employeeDashboard/:restaurantId"
          >
            <Route
              element={<EmployeeDashboard socket={socket} />}
              path="/employeeDashboard/:restaurantId"
            />
          </Route>

          <Route
            element={<PrivateRoute setSocket={setSocket} />}
            path="/viewOrder/:restaurantId/:tableId"
          >
            <Route
              element={<ViewOrder socket={socket} />}
              path="/viewOrder/:restaurantId/:tableId"
            />
          </Route>
          <Route
            element={<PrivateRoute setSocket={setSocket} />}
            path="/viewOrder/:bookingId"
          >
            <Route
              element={<Orders socket={socket} />}
              path="/viewOrder/:bookingId"
            />
          </Route>
          <Route
            element={<PrivateRoute setSocket={setSocket} />}
            path="/generatebill/:bookingId"
          >
            <Route
              element={<Billing socket={socket} />}
              path="/generatebill/:bookingId"
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default Router;
