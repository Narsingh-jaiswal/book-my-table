import Button from "react-bootstrap/esm/Button";
import { useEffect, useState } from "react";
import { checkBookingIsExpire } from "../../../../utils/MyBookings/checkBookingIsExpire";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { cancelbooking } from "../../../../api";

const BookingCard = ({ myBooking, socket }) => {
  const [isExpire, setIsExpire] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (myBooking) {
      const isExpire = checkBookingIsExpire(myBooking);
      setIsExpire(isExpire);
    }
  }, [myBooking]);

  const onCancelOrder = () => {
    cancelbooking(myBooking.id).then(() => {
      socket.emit("joinRoomByTableId", myBooking.tableId);
      socket?.emit("getAllBookings", myBooking.tableId, socket.id);
      socket?.emit("getSlot", myBooking.restaurantId, socket.id);
    });
  };

  return (
    <div className="bookingCardContainer">
      <h6>Restaurant Name : {myBooking["Restaurant Name"]}</h6>
      <h6>Booking Date : {myBooking.bookingDate}</h6>
      <h6>Time : {myBooking.time}</h6>
      <h6>Advance payment : &#8377;{myBooking.advancePayment}</h6>
      {isExpire === null ? (
        <Button onClick={onCancelOrder}>Cancel Order</Button>
      ) : isExpire ? (
        <></>
      ) : (
        // <Button>Download Receipt</Button>
        <div className="myWishListContainer">
          <Button
            onClick={() => {
              navigate("/viewMenu", {
                state: {
                  restaurantId: myBooking?.["Restaurant Id"],
                  bookingId: myBooking.id
                }
              });
            }}
          >
            Place Order
          </Button>
          <Button
            onClick={() => {
              navigate(`/trackorder/${myBooking.id}`);
            }}
          >
            Track Order
          </Button>
          {myBooking.paymentType === "online" && (
            <Button
              onClick={() => {
                navigate(`/generatebill/${myBooking.id}`, {
                  state: { advancePayment: myBooking.advancePayment }
                });
              }}
            >
              Pay Bill
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingCard;
