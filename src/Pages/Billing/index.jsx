import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import { payOrderAmount } from "../../utils/payorderAmount";

const Billing = ({ socket }) => {
  const { bookingId } = useParams();
  const { state } = useLocation();
  const [orderData, setOrderData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (bookingId && socket) {
      socket?.emit("joinRoomByBookingId", bookingId);
      socket?.emit("getBookingData", bookingId);
      socket?.on("getAllBookingData", (data) => {
        let amount = 0;
        data.forEach((order) => {
          amount += order.quantity * order.price;
        });

        if (amount > state.advancePayment) {
          setTotalAmount(amount - state.advancePayment);
        } else {
          setTotalAmount(amount);
        }

        setOrderData(data);
      });
    }
    return () => socket?.emit("leaveRoom", bookingId);
  }, [bookingId, socket]);

  const navigateTo = () => {
    navigate("/dashboard");
  };

  const onPay = () => {
    if (totalAmount > 0) {
      payOrderAmount(totalAmount, bookingId, navigateTo);
    }
  };

  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orderData.length > 0 ? (
            orderData.map((order, index) => {
              return (
                <tr style={{ border: 0 }} key={index}>
                  <td>{index + 1}</td>
                  <td>{order.itemName}</td>
                  <td>{order.quantity}</td>
                  <td>{order.price}</td>
                </tr>
              );
            })
          ) : (
            <tr style={{ border: 0 }}>
              <td colSpan={4}>
                <h6 style={{ textAlign: "center" }}>No Items</h6>
              </td>
            </tr>
          )}
          <tr style={{ border: 0 }}>
            <td colSpan={2}>Total Amount</td>
            <td colSpan={2} style={{ textAlign: "center" }}>
              <Button variant="light" onClick={onPay}>
                &#8377; {totalAmount} Pay
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
export default Billing;
