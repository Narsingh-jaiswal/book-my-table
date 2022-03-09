import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";

const TrackOrder = ({ socket }) => {
  const { bookingId } = useParams();
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    if (bookingId) {
      socket?.emit("joinRoomByBookingId", bookingId);
      socket?.emit("getBookingData", bookingId);
      socket?.on("getAllBookingData", (data) => {
        setOrderData(data);
      });
    }
    return () => socket?.emit("leaveRoom", bookingId);
  }, [bookingId, socket]);

  return (
    <>
      <h6 style={{ textAlign: "center" }}>Track Your Orders Status</h6>
      <div style={{ padding: 20 }}>
        {orderData?.map((order, index) => (
          <Card bg={"dark"} text={"white"} className="mb-2" key={index}>
            <Card.Body>
              <Card.Title>{order.itemName} </Card.Title>
              <div className="footer">
                <div>
                  <Card.Text>&#8377;{order.price}</Card.Text>
                </div>
                <div className="actionButton">
                  <Card.Text className="cardContent">
                    {order.quantity}
                  </Card.Text>
                  <Card.Text className="cardContent">{order.status}</Card.Text>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
};

export default TrackOrder;
