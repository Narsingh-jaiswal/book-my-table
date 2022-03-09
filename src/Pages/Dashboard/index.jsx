import axios from "axios";
import { useEffect, useState } from "react";
import { getAllRestaurant } from "../../api";
import { baseUrl } from "../../constants/baseUrl";
import RestaurantByPlan from "./components/RestaurantByPlan";

const Dashboard = () => {
  const [restaurant, setRestaurant] = useState();

  useEffect(() => {
    getAllRestaurant().then((data) => {
      setRestaurant(data.data);
    });
  }, []);

  return (
    <>
      <img
        src="https://www.favouritetables.com/wp-content/uploads/2015/12/Skylon-Grill-960x435.jpg"
        width="100%"
        alt=""
      />
      <RestaurantByPlan restaurant={restaurant} plan={1000} />
      <img
        src="https://www.noormahal.in/images/dine_banner4.jpg"
        width="100%"
        alt=""
      />
      <RestaurantByPlan restaurant={restaurant} plan={500} />
    </>
  );
};

export default Dashboard;
