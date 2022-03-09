import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ManageMenu from "../../Components/MyRestaurant/components/RestaurantDetail/Components/ManageMenu";
import Cart from "../../Components/MyRestaurant/components/RestaurantDetail/Components/ManageMenu/Components/Cart";
import "./index.css";

const ViewMenu = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const { state } = useLocation();
  const restaurantId = state.restaurantId;
  const navigate = useNavigate();

  const onItemSelect = (item) => {
    const isItemExise = selectedItems.find(
      (element) => element.itemName === item.itemName
    );

    if (!isItemExise) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const navigateToWishlist = () => {
    navigate("/myWishList", {
      state: {
        items: selectedItems,
        bookingId: state.bookingId
      }
    });
  };

  return (
    <>
      <div className="cart">
        <div className="badge">{selectedItems.length}</div>
        <Cart onClick={navigateToWishlist} />
      </div>
      <ManageMenu
        restaurantId={restaurantId}
        isCustomer={true}
        onClick={onItemSelect}
      />
    </>
  );
};
export default ViewMenu;
