import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import { useEffect } from "react";
import DropdownField from "../Dropdown";
import { addNewItem } from "../../../../../../../../api";

const ItemModal = ({ show, handleClose, menu, categories, getCategories }) => {
  const [itemData, setItemData] = useState({
    name: "",
    selectedMenu: "",
    menuId: "",
    selectedCategory: "",
    categoryId: "",
    price: ""
  });

  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    if (itemData?.menuId) {
      const category = categories?.filter(
        (element) => element.menuId === itemData.menuId
      );

      const categoryValue = category?.map((element) => ({
        ...element,
        displayValue: element.type
      }));

      setCategoryData(categoryValue);
    }
  }, [itemData?.menuId, categories]);

  const onSave = () => {
    addNewItem().then(() => handleClose());
  };

  const onSelectMenu = (value, index) => {
    getCategories(value.MenuID);
    setItemData({
      ...itemData,
      selectedMenu: index + 1,
      menuId: value.MenuID
    });
  };

  const onSelectCategory = (value, index) => {
    setItemData({
      ...itemData,
      selectedCategory: value.type,
      categoryId: value.categoryId
    });
  };

  const displayValue = menu?.map((element, index) => ({
    ...element,
    displayValue: `Menu ${index + 1}`
  }));

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Item Name"
            onChange={(e) => setItemData({ ...itemData, name: e.target.value })}
            value={itemData.name}
          />
        </div>

        <div className="input-group" style={{ marginTop: 10 }}>
          <input
            type="number"
            className="form-control"
            placeholder="Price"
            onChange={(e) =>
              setItemData({ ...itemData, price: e.target.value })
            }
            value={itemData.price}
          />
        </div>

        <DropdownField
          options={displayValue}
          title="Choose Menu"
          value={itemData.selectedMenu && `Menu ${itemData.selectedMenu}`}
          onClick={onSelectMenu}
          placeHolder="Menu"
        />
        <DropdownField
          options={categoryData}
          title="Choose Category"
          value={itemData.selectedCategory}
          onClick={onSelectCategory}
          placeHolder="Category"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ItemModal;
