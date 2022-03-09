import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RestaurantImagesCarousel from "../../../../Components/MyRestaurant/components/RestaurantDetail/Components/RestaurantImagesCarousel";
import RestaurantTables from "../../../../Components/MyRestaurant/components/RestaurantDetail/Components/Tables";
import { baseUrl } from "../../../../constants/baseUrl";

const ViewRestaurantDetail = () => {
  const { restaurantId } = useParams();
  const [restaurantData, setRestaurantData] = useState([]);
  useEffect(() => {
    if (restaurantId) {
      axios
        .get(`${baseUrl}restaurant/getTableByRestaurantId/${restaurantId}`)
        .then((restaurantData) => {
          setRestaurantData(restaurantData.data);
        });
    }
  }, [restaurantId]);
  return (
    <>
      <RestaurantImagesCarousel />
      <RestaurantTables restaurantData={restaurantData} navigateUrl="/table" />
    </>
  );
};

export default ViewRestaurantDetail;
