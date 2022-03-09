import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../../../constants/baseUrl";
import RestaurantImagesCarousel from "./Components/RestaurantImagesCarousel";
import RestaurantTables from "./Components/Tables";
import AddTableForm from "./Components/AddTableForm";
import ActionButton from "./Components/ActionButton";
import Slots from "./Components/Slots";
import axios from "axios";
import ManageMenu from "./Components/ManageMenu";
import "./index.css";
import AddEmployee from "./Components/AddEmployee";

const RestaurantDetail = ({ socket }) => {
  const { restaurantId } = useParams();
  const newTableFormref = useRef(null);
  const manageSlots = useRef(null);
  const manageMenu = useRef(null);
  const manageStaff = useRef(null);
  const [restaurantData, setRestaurantData] = useState([]);

  useEffect(() => {
    if (restaurantId) {
      const { email } = JSON.parse(localStorage.getItem("userData"));

      axios
        .get(`${baseUrl}restaurant/getRestaurant/${email}/${restaurantId}`)
        .then((data) => {
          setRestaurantData(data.data);
        });
    }
  }, [restaurantId]);

  return (
    <>
      <RestaurantImagesCarousel />
      <ActionButton
        newTableFormref={newTableFormref}
        manageSlots={manageSlots}
        manageMenu={manageMenu}
        manageStaff={manageStaff}
      />
      <div className="tables">
        <RestaurantTables
          restaurantData={restaurantData}
          navigateUrl="/viewtable"
        />
      </div>
      <AddTableForm
        newTableFormref={newTableFormref}
        restaurantId={restaurantId}
      />
      <AddEmployee restaurantId={restaurantId} manageStaff={manageStaff} />
      <h6 className="title timeSlotHeading">Time Slots</h6>
      <Slots
        manageSlots={manageSlots}
        restaurantId={restaurantId}
        socket={socket}
      />
      <h6 className="title timeSlotHeading">Manage Menu Card</h6>
      <ManageMenu
        restaurantId={restaurantId}
        manageMenu={manageMenu}
        isCustomer={false}
      />
    </>
  );
};

export default RestaurantDetail;
