import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { baseUrl } from "../../constants/baseUrl";
import { sortBookingsByBookingDate } from "../../utils/MyBookings/sortbyBookingDate";
import BookingCard from "./Components/BookingCard";

const MyBookings = ({ socket }) => {
  const [myBookings, setMyBookings] = useState([]);
  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem("userData"));
    axios
      .get(`${baseUrl}booking/getBookingsByEmail/${email}`)
      .then((response) => {
        const data = sortBookingsByBookingDate(response.data);
        setMyBookings(data);
      });
  }, []);

  return (
    <>
      {myBookings.length > 0 ? (
        myBookings.map((element, index) => (
          <BookingCard myBooking={element} key={index} socket={socket} />
        ))
      ) : (
        <h6 style={{ textAlign: "center" }}>No Bookings</h6>
      )}
    </>
  );
};
export default MyBookings;
