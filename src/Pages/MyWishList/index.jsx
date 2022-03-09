import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ItemCard from "./Components/ItemCard";
import shortid from "shortid";
import axios from "axios";
import { baseUrl } from "./../../constants/baseUrl";
import "./index.css";
import { placeOrder } from "../../api";

const MyWishList = () => {
  const { state } = useLocation();
  const [totalAmount, setTotalAmount] = useState(0);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.items) {
      const items = state.items;
      if (items.length > 0) {
        const mappedItems = mapQuantityWithItems(items);
        setItems(mappedItems);
        let totalAmount = 0;
        items.forEach((item) => {
          totalAmount += item.price;
        });
        setTotalAmount(totalAmount);
      }
    }
  }, [state]);

  const mapQuantityWithItems = (item) => {
    return item.map((item) => ({ ...item, quantity: 1 }));
  };

  const removeItem = (index, amount) => {
    const updatedItem = items;
    updatedItem.splice(index, 1);
    setTotalAmount(totalAmount - amount);
    setItems(updatedItem);
  };

  const increaseQuantity = (index) => {
    const item = items;
    item[index].quantity += 1;
    setItems(item);
  };

  const decreaseQuantity = (index) => {
    const item = items;
    item[index].quantity -= 1;
    setItems(item);
  };

  const bookOrder = () => {
    const orderId = shortid.generate();
    const bookingId = state.bookingId;
    const orderData = [];
    items.forEach((item) => {
      orderData.push([
        item.itemId,
        item.quantity,
        bookingId,
        orderId,
        "placed"
      ]);
    });

    placeOrder(orderData).then((result) => {
      navigate(`/trackOrder/${bookingId}`);
    });
  };

  return (
    <>
      <div className="MyWishListItems">
        <p>Total Amount &#8377; {totalAmount}</p>
        {items.length > 0 &&
          items?.map((item, index) => (
            <ItemCard
              itemData={item}
              key={index}
              index={index}
              setTotalAmount={setTotalAmount}
              totalAmount={totalAmount}
              removeItem={removeItem}
              increaseItemQuantity={increaseQuantity}
              decreaseItemQuantity={decreaseQuantity}
            />
          ))}
      </div>
      <div className="confirmOrderActionContainer">
        <button
          type="button"
          className="btn btn-secondary btn-lg confirmOrderButton"
          onClick={bookOrder}
        >
          Confirm Order
        </button>
      </div>
    </>
  );
};

export default MyWishList;
