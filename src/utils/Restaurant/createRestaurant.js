import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";
import { openRazorPay } from "../../services/Razorpay";
import moment from "moment";

const create = async (restaurantData, planData) => {
  const { email } = JSON.parse(localStorage.getItem("userData"));
  const expireOn = moment().add(planData.validDays, "days").calendar();
  const data = {
    ...restaurantData,
    email,
    expireOn,
    planid: planData["Plan ID"]
  };

  axios
    .post("http://localhost:3000/restaurant/RegisterRestaurant", data)
    .then((response) => {
      console.log({ response });
    });
};

export const createRestaurant = (restaurantData, planData) => {
  axios
    .post(`${baseUrl}razorpay/createOrder`, {
      ...planData,
      amount: planData["Plan Amount"]
    })
    .then((orderResponse) => {
      openRazorPay(() => create(restaurantData, planData), orderResponse.data);
    });
};
