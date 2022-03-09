import axios from "axios";
import { createOrder } from "../../api";
import { baseUrl } from "../../constants/baseUrl";
import { openRazorPay } from "../../services/Razorpay";

const updateBooking = (bookingId, navigateTo) => {
  axios
    .put(`${baseUrl}booking/orderPayment/${bookingId}`, {
      data: { bookingId }
    })
    .then((response) => {
      navigateTo();
    });
};

export const payOrderAmount = (amount, bookingId, navigateTo) => {
  createOrder(amount).then((orderResponse) => {
    openRazorPay(
      () => updateBooking(bookingId, navigateTo),
      orderResponse.data
    );
  });
};
