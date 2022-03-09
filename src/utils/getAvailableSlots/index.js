export const getFormatedDate = (dateObject) => {
  const date = `${dateObject.getDate()}`.padStart(2, 0);
  const month = `${dateObject.getMonth()}`.padStart(2, 0);
  const year = dateObject.getFullYear();
  const dateString = `${month}/${date}/${year}`;
  return dateString;
};

export const getAvailableSlots = (
  slots,
  bookingData,
  occupiedSlots,
  tableId
) => {
  const manipulatedSlotData = [];

  slots.forEach((slot) => {
    const isSlotBook = bookingData.find((bookingData) => {
      const bookingDate = bookingData.bookingDate;
      const currentTime = getFormatedDate(new Date());

      return bookingData.slotId === slot.slotId && currentTime === bookingDate;
    });

    const isSlotOccupied = occupiedSlots?.find(
      (occupiedSlot) =>
        occupiedSlot.slotId === slot.slotId && occupiedSlot.tableId === tableId
    );

    if (isSlotOccupied) {
      manipulatedSlotData.push({
        ...isSlotBook,
        ...slot,
        isAvailable: "occupied"
      });
    } else if (isSlotBook) {
      manipulatedSlotData.push({
        ...isSlotBook,
        ...slot,
        isAvailable: false
      });
    } else {
      manipulatedSlotData.push({ ...slot, isAvailable: true });
    }
  });

  return manipulatedSlotData.sort((slot1, slot2) =>
    slot1.time > slot2.time ? 1 : -1
  );
};
