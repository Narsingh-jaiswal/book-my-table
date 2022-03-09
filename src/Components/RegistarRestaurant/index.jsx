import { useState } from "react";
import shortid from "shortid";
import { createRestaurant } from "../../utils/Restaurant/createRestaurant";
import "./index.css";

const RegisterRestaurant = ({
  setIsModalOpen,
  selectedPlan,
  setSelectedPlan
}) => {
  const [restaurantDetail, setRestaurantDetail] = useState({
    name: "",
    id: "",
    address: ""
  });

  const onChange = (e) => {
    setRestaurantDetail({
      ...restaurantDetail,
      [e.target.name]: e.target.value
    });
  };

  const autoGenerate = () => {
    setRestaurantDetail({
      ...restaurantDetail,
      id: shortid.generate()
    });
  };

  return (
    <>
      <div className="modalContainer">
        <div
          className="input-group formContainer"
          style={{ alignItems: "center" }}
        >
          <input
            type="text"
            className="form-control textField"
            placeholder="Restaurant Name"
            name="name"
            onChange={onChange}
            value={restaurantDetail.name}
          />

          <input
            type="text"
            className="form-control textField"
            placeholder="restaurantID"
            name="id"
            onChange={onChange}
            value={restaurantDetail.id}
          />
          <p className="autoGenerate" onClick={autoGenerate}>
            auto generate ?
          </p>

          <input
            type="text"
            className="form-control textField"
            placeholder="Address"
            name="address"
            onChange={onChange}
            value={restaurantDetail.address}
          />
          <div className="action">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                setIsModalOpen(false);
                setSelectedPlan({});
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => createRestaurant(restaurantDetail, selectedPlan)}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterRestaurant;
