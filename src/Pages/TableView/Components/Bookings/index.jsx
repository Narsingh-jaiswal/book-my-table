import { useState } from "react";
import { useEffect } from "react";
import Slots from "../slots";

import { getAvailableSlots } from "./../../../../utils/getAvailableSlots";

const Bookings = ({
  slots,
  bookingData,
  occupiedSlots,
  advancePayment,
  tableId,
  socket
}) => {
  const [slotData, setSlotData] = useState([]);

  useEffect(() => {
    const availableSlots = getAvailableSlots(
      slots,
      bookingData,
      occupiedSlots,
      tableId
    );
    setSlotData(availableSlots);
  }, [slots, bookingData, occupiedSlots, tableId]);

  return (
    <>
      <Slots
        slots={slotData}
        advancePayment={advancePayment}
        tableId={tableId}
        socket={socket}
      />
    </>
  );
};
export default Bookings;
