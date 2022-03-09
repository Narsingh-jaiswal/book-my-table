import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { addNewMenu, getAllMenu } from "../../../../../../api";
import { baseUrl } from "../../../../../../constants/baseUrl";
import ManageMenuActionButton from "./Components/ActionButton";
import Cart from "./Components/Cart";
import CategoryModal from "./Components/CategoryModal";
import ItemModal from "./Components/ItemModal";
import "./index.css";

const ManageMenu = ({
  manageMenu,
  restaurantId,
  isCustomer,
  onClick = () => {}
}) => {
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [currentMenu, setCurrentMenu] = useState({});

  useEffect(() => {
    getAllMenu(restaurantId).then((menuData) => {
      const data = menuData.data;
      if (data.length > 0) {
        getCategories(data[0].MenuID);
        setMenus(menuData.data);
      }
    });
  }, [restaurantId]);

  const addMenu = () => {
    addNewMenu(restaurantId).then((menuData) => {
      setMenus([...menus, menuData.data]);
    });
  };

  const toggleModal = () => {
    setOpen(!open);
  };

  const toggleItemModal = () => {
    setIsItemModalOpen(!setIsItemModalOpen);
  };

  const getCategories = (id) => {
    setCurrentMenu(id);
    axios
      .get(`${baseUrl}menu/getAllCategoryByMenuId/${id}`)
      .then((response) => {
        const data = response.data;
        if (data.length > 0) {
          axios
            .get(
              `${baseUrl}menu/getAllItems/${data[0].categoryId}/${data[0].menuId}`
            )
            .then((items) => {
              setItems(items.data);
            });
        }
        setItems([]);
        setCategories(data);
      });
  };

  const getItemsByCategories = (id) => {
    axios
      .get(`${baseUrl}menu/getAllItems/${id}/${currentMenu}`)
      .then((items) => {
        setItems(items.data);
      });
  };

  return (
    <>
      <div ref={manageMenu} className="menuButtonContainer">
        {menus.map((menu, index) => {
          return (
            <Button
              className="menuButtons"
              onClick={() => {
                getCategories(menu.MenuID, menu);
              }}
              key={index}
            >{`Menu ${index + 1}`}</Button>
          );
        })}
      </div>

      {!isCustomer && (
        <ManageMenuActionButton
          manageMenu={manageMenu}
          addMenu={addMenu}
          setOpen={setOpen}
          open={open}
          setIsItemModalOpen={setIsItemModalOpen}
        />
      )}
      <CategoryModal show={open} handleClose={toggleModal} menu={menus} />
      <ItemModal
        show={isItemModalOpen}
        handleClose={toggleItemModal}
        menu={menus}
        categories={categories}
        getCategories={getCategories}
      />
      <div className="menuItemContainer">
        <div className="menuButtonContainer" ref={manageMenu}>
          {categories.map((element, index) => {
            return (
              <Button
                className="menuButtons"
                variant="warning"
                key={index}
                onClick={() => getItemsByCategories(element.categoryId)}
              >
                {element.type}
              </Button>
            );
          })}
        </div>
        {items.map((item, index) => (
          <div className="items" key={index}>
            <h6 style={{ margin: 0 }}>{item.itemName}</h6>
            <div
              style={{ display: "flex", display: "flex", alignItems: "center" }}
            >
              <h6 style={{ margin: 0 }}>&#8377; {item.price}</h6>
              {isCustomer && <Cart onClick={() => onClick(item)} />}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ManageMenu;
