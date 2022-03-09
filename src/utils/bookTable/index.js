import axios from "axios";
import { createNewBooking, createOrder } from "../../api";
import { baseUrl } from "../../constants/baseUrl";
import { openRazorPay } from "../../services/Razorpay";

const createBooking = (bookingData, tableId, socket) => {
  createNewBooking(bookingData).then(() => {
    onClose(tableId, bookingData.slotId, socket);
  });
};

const onClose = (tableId, slotId, socket) => {
  axios
    .delete(`${baseUrl}booking/deleteOccupiedSlot`, {
      data: {
        tableId,
        slotId
      }
    })
    .then(() => {
      socket?.emit("getAllBookings", tableId, socket.id);
      socket?.emit("getOccupiedSlots", tableId);
    });
};

export const bookTable = (bookingData, amount, tableId, socket) => {
  createOrder(amount).then((orderResponse) => {
    openRazorPay(
      () => createBooking(bookingData, tableId, socket),
      orderResponse.data,
      () => onClose(tableId, bookingData.slotId, socket)
    );
  });
};
