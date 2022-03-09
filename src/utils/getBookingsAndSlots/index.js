export const getBookingsAndSlots = (
  tableId,
  restaurantId,
  setSlots,
  setBookingData,
  setOccupiedSlots,
  socket
) => {
  socket?.emit("getAllBookings", tableId, socket.id);
  socket?.on("allBookings", (bookings) => {
    setBookingData(bookings);
  });

  socket?.emit("getSlot", restaurantId, socket.id);
  socket?.on("getSlot", (slots) => {
    const data = slots.filter((element) => {
      return element.time !== "0" && element;
    });
    setSlots(data);
  });
  socket?.emit("getOccupiedSlots", tableId);
  socket.on("allOccupiedSlots", (occupiedSlots) => {
    setOccupiedSlots(occupiedSlots);
  });
};
