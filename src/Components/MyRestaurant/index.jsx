import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../constants/baseUrl";
import RestaurantCard from "./components/RestaurantCard";
import "./index.css";

const MyRestaurant = ({ socket }) => {
  const [restaurant, setRestaurant] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    axios
      .get(`${baseUrl}restaurant/myRestaurant/${userData.email}`)
      .then((result) => {
        if (result.data.length > 0 && Array.isArray(result?.data)) {
          setRestaurant(result.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="cardContainer">
      {restaurant.map((restaurant, index) => {
        return (
          <RestaurantCard
            restaurant={restaurant}
            navigateUrl="restaurant"
            index={index}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default MyRestaurant;
