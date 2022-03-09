import RestaurantCard from "../../../../Components/MyRestaurant/components/RestaurantCard";
import "./index.css";

const RestaurantByPlan = ({ restaurant, plan }) => {
  const restaurantByPlan = restaurant?.filter(
    (element) => element["Plan Amount"] === plan
  );

  return (
    <div className="allRestaurantCard">
      {restaurantByPlan?.map((restaurantData, index) => (
        <RestaurantCard
          key={index}
          restaurant={restaurantData}
          navigateUrl={`allRestaurant`}
        />
      ))}
    </div>
  );
};

export default RestaurantByPlan;
