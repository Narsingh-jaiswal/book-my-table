import axios from "axios";
import { useEffect, useState } from "react";
import { getPlans } from "../../api";
import RegisterRestaurant from "../RegistarRestaurant";
import "./index.css";

const ViewPlan = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getPlans().then((data) => {
      setPlans(data.data);
    });
  }, []);

  return (
    <div>
      <h6 className="plans">Plans</h6>
      {plans.length
        ? plans.map((element, index) => (
            <div className="card" style={{ margin: 20 }} key={index}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2JGV_0GymGvUrCKCc-1bDopzY18D5m5tHoEnO-VAlCxxL5EqHLbjxqicdmadtWitU8w&usqp=CAU"
                alt=""
              />
              <div className="card-body">
                <h5 className="card-title planName">{element["Plan Name"]}</h5>
                <div className="planValidity">
                  <p>valid upto</p>
                  <p>{element["validDate"]}</p>
                </div>
                <div className="amountContainer">
                  <p className="amount">&#8377;{element["Plan Amount"]}</p>
                </div>
                <div className="alert alert-warning validity" role="alert">
                  {element["validDays"]} days validity
                </div>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    setIsModalOpen(true);
                    setSelectedPlan(element);
                  }}
                >
                  buy
                </button>
              </div>
            </div>
          ))
        : null}
      {isModalOpen && (
        <RegisterRestaurant
          setIsModalOpen={setIsModalOpen}
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
        />
      )}
    </div>
  );
};

export default ViewPlan;
