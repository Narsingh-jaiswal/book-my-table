import { useEffect } from "react";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import "./index.css";

const ItemCard = ({
  itemData,
  setTotalAmount,
  totalAmount,
  removeItem,
  index,
  increaseItemQuantity,
  decreaseItemQuantity
}) => {
  const [amount, setAmount] = useState(itemData.price);

  useEffect(() => {
    if (itemData.price) {
      setAmount(itemData.price * itemData.quantity);
    }
  }, [itemData.quantity]);

  const increaseQuantity = () => {
    increaseItemQuantity(index);
    setTotalAmount(totalAmount + itemData.price);
  };

  const decreaseQuantity = () => {
    if (itemData.quantity > 1) {
      decreaseItemQuantity(index);
      setTotalAmount(totalAmount - itemData.price);
    }
  };

  return (
    <Card bg={"dark"} text={"white"} className="mb-2">
      <Card.Body>
        <div className="header">
          <Card.Text className="closeIcon">&#x2715;</Card.Text>
          <Card.Title>{itemData.itemName} </Card.Title>
          <Card.Text onClick={() => removeItem(index, amount)}>
            &#8377;{itemData.price}
          </Card.Text>
        </div>
        <div className="footer">
          <div>
            <Card.Text>&#8377;{amount}</Card.Text>
          </div>
          <div className="actionButton">
            <Card.Text className="cardContent" onClick={decreaseQuantity}>
              &#8722;
            </Card.Text>
            <Card.Text className="cardContent">{itemData.quantity}</Card.Text>
            <Card.Text className="cardContent" onClick={increaseQuantity}>
              &#43;
            </Card.Text>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ItemCard;
