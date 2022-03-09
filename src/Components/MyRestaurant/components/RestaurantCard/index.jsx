import { Link } from "react-router-dom";
import { restaurantImage } from "../../../../constants/images";

const RestaurantCard = ({ restaurant, navigateUrl }) => {
  return (
    <div className="card" style={{ width: 200, margin: 5 }}>
      <img src={restaurantImage} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{restaurant["Restaurant Name"]}</h5>
        <p className="card-text">{restaurant.address}</p>
        <Link
          to={{
            pathname: `/${navigateUrl}/${restaurant["Restaurant Id"]}`
          }}
          className="btn btn-primary"
        >
          see more
        </Link>
      </div>
    </div>
  );
};

export default RestaurantCard;
