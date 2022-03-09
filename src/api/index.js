import axios from "axios";
import { baseUrl } from "../constants/baseUrl";

export const addNewMenu = async (restaurantId) => {
  const response = await axios.post(`${baseUrl}menu/addMenu`, { restaurantId });
  return response;
};

export const getAllMenu = async (restaurantId) => {
  const response = await axios.get(`${baseUrl}menu/getAllMenu/${restaurantId}`);
  return response;
};

export const createNewBooking = async (bookingData) => {
  const response = await axios.post(
    `${baseUrl}booking/createBooking`,
    bookingData
  );
  return response;
};

export const addNewItem = async (itemData) => {
  const response = await axios.post(`${baseUrl}menu/addItem`, itemData);
  return response;
};

export const getPlans = async () => {
  const response = axios.get(`${baseUrl}razorpay/getPlans`);
  return response;
};

export const customerLogin = async (loginDetail) => {
  const response = await axios.post(`${baseUrl}login`, loginDetail);
  return response;
};

export const employeeLogin = async (loginDetail) => {
  const response = await axios.post(`${baseUrl}employeeLogin`, loginDetail);
  return response;
};

export const newUserSignUp = async (userDetail) => {
  const response = await axios.post(`${baseUrl}signUp`, userDetail);
  return response;
};

export const getAllRestaurant = async () => {
  const response = axios.get(`${baseUrl}restaurant/getAllRestaurant`);
  return response;
};

export const placeOrder = async (orderData) => {
  const response = await axios.post(`${baseUrl}booking/placeOrder`, {
    orderData
  });
  return response;
};

export const cancelbooking = async (bookingId) => {
  const response = await axios.delete(`${baseUrl}booking/cancelBooking`, {
    data: { bookingId }
  });
  return response;
};

export const createOrder = async (amount) => {
  const response = await axios.post(`${baseUrl}razorpay/createOrder`, {
    amount
  });
  return response;
};
