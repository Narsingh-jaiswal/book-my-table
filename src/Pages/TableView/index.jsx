import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import RestaurantImagesCarousel from "../../Components/MyRestaurant/components/RestaurantDetail/Components/RestaurantImagesCarousel";
import { getBookingsAndSlots } from "../../utils/getBookingsAndSlots";
import Bookings from "./Components/Bookings";

const TableView = ({ socket }) => {
  const { tableId, restaurantId } = useParams();
  const [bookingData, setBookingData] = useState([]);
  const [slots, setSlots] = useState([]);
  const [occupiedSlots, setOccupiedSlots] = useState([]);
  const { state } = useLocation();

  useEffect(() => {
    if ((tableId && restaurantId, socket)) {
      socket.emit("joinRoomByTableId", tableId);
      getBookingsAndSlots(
        tableId,
        restaurantId,
        setSlots,
        setBookingData,
        setOccupiedSlots,
        socket
      );
    }
    return () => {
      socket?.emit("leaveRoom", tableId);
    };
  }, [tableId, restaurantId, socket]);

  return (
    <>
      <RestaurantImagesCarousel />
      <Bookings
        bookingData={bookingData}
        slots={slots}
        advancePayment={state.advancePayment}
        tableId={tableId}
        socket={socket}
        occupiedSlots={occupiedSlots}
      />
    </>
  );
};

export default TableView;
