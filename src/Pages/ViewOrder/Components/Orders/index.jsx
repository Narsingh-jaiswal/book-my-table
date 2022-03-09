import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../../../constants/baseUrl";
import Card from "react-bootstrap/Card";
import DropdownField from "../../../../Components/MyRestaurant/components/RestaurantDetail/Components/ManageMenu/Components/Dropdown";

const Orders = ({ socket }) => {
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

  const stageOptions = [
    { displayValue: "Received" },
    { displayValue: "Under Progress" },
    { displayValue: "Delivered" }
  ];

  const onClick = (order, element) => {
    const orderId = order.orderId;
    axios
      .put(`${baseUrl}booking/updateOrderStage/${orderId}`, {
        stage: element.displayValue,
        itemId: order.itemId
      })
      .then(() => {
        socket?.emit("getBookingData", bookingId);
        socket?.on("getAllBookingData", (data) => {
          setOrderData(data);
        });
      });
  };

  return (
    <>
      <div style={{ padding: 20 }}>
        {orderData?.map((order, index) => (
          <Card bg={"dark"} text={"white"} className="mb-2" key={index}>
            <Card.Body>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <Card.Title>{order.itemName} </Card.Title>
                <Card.Title className="cardContent">
                  {order.quantity}
                </Card.Title>
              </div>
              <div className="footer">
                <div>
                  <Card.Text>&#8377;{order.price}</Card.Text>
                </div>
                <div className="actionButton">
                  <DropdownField
                    options={stageOptions}
                    value={order.status}
                    onClick={(element) => onClick(order, element)}
                    title="stages"
                  />
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Orders;
