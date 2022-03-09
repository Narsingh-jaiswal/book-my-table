import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../constants/baseUrl";

const ViewOrder = () => {
  const { tableId, restaurantId } = useParams();
  const [bookingData, setBookingData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (restaurantId && tableId) {
      axios
        .get(`${baseUrl}restaurant/getBookings/${tableId}`)
        .then((response) => setBookingData(response.data));
    }
  }, [tableId, restaurantId]);

  const onClick = (id) => {
    navigate(`/viewOrder/${id}`);
  };

  return (
    <>
      {bookingData.length > 0 ? (
        bookingData.map((booking, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-around",
                padding: 20,
                background: "whitesmoke"
              }}
            >
              <div>
                <h6>{booking?.email}</h6>
                <h6>{booking?.time}</h6>
              </div>
              <Button variant="success" onClick={() => onClick(booking.id)}>
                open
              </Button>
            </div>
          );
        })
      ) : (
        <h6 style={{ textAlign: "center" }}> Till now there is no Booking</h6>
      )}
    </>
  );
};

export default ViewOrder;
