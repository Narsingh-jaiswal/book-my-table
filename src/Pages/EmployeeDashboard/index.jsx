import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";
import RestaurantImagesCarousel from "../../Components/MyRestaurant/components/RestaurantDetail/Components/RestaurantImagesCarousel";
import RestaurantTables from "../../Components/MyRestaurant/components/RestaurantDetail/Components/Tables";

const EmployeeDashboard = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState([]);

  useEffect(() => {
    if (restaurantId) {
      axios
        .get(`${baseUrl}restaurant/getTableByRestaurantId/${restaurantId}`)
        .then((response) => {
          setRestaurant(response.data);
        });
    }
  }, [restaurantId]);

  return (
    <>
      <RestaurantImagesCarousel />
      <RestaurantTables restaurantData={restaurant} navigateUrl="/viewOrder" />
    </>
  );
};

export default EmployeeDashboard;
