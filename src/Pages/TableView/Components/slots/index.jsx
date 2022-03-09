import { bookTable } from "../../../../utils/bookTable";
import "./index.css";

const Slots = ({ slots, advancePayment, tableId, socket }) => {
  const onClick = (slot) => {
    if (
      slot.isAvailable &&
      typeof slot.isAvailable === "boolean" &&
      advancePayment
    ) {
      socket.emit("slotOccupied", tableId, slot.slotId);
      socket?.emit("getOccupiedSlots", tableId, slot.slotId);
      const { email } = JSON.parse(localStorage.getItem("userData"));
      const dateObject = new Date();
      const date = `${dateObject.getDate()}`.padStart(2, 0);
      const month = `${dateObject.getMonth()}`.padStart(2, 0);
      const year = dateObject.getFullYear();
      const dateString = `${month}/${date}/${year}`;

      const bookingData = {
        email,
        slotId: slot.slotId,
        tableId,
        bookingDate: dateString
      };
      bookTable(bookingData, advancePayment, tableId, socket);
    }
  };

  const getStyle = (slot) => {
    return slot.isAvailable === "occupied"
      ? "occupiedstyle"
      : slot.isAvailable
      ? "availableSlots"
      : "unavailableSlots";
  };

  return (
    <>
      {slots?.length > 0 &&
        slots.map((slot, index) => {
          return (
            <div
              className="availableSlotsContainer"
              key={index}
              onClick={() => onClick(slot)}
            >
              <div className={`slot  ${getStyle(slot)}`}>
                <h6 className="time">{slot.time}</h6>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Slots;
