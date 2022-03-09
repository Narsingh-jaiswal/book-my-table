import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import DropdownField from "../Dropdown";
import { baseUrl } from "../../../../../../../../constants/baseUrl";

const CategoryModal = ({ show, handleClose, menu }) => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    selectedMenu: "",
    menuId: ""
  });

  const onSave = () => {
    axios
      .post(`${baseUrl}menu/addCategory`, categoryData)
      .then(() => handleClose());
  };

  const onSelectMenu = (value, index) => {
    setCategoryData({
      ...categoryData,
      selectedMenu: index + 1,
      menuId: value.MenuID
    });
  };
  const displayValue = menu?.map((element, index) => ({
    ...element,
    displayValue: `Menu ${index + 1}`
  }));

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Category Name"
            onChange={(e) =>
              setCategoryData({ ...categoryData, name: e.target.value })
            }
            value={categoryData.name}
          />
        </div>
        <DropdownField
          options={displayValue}
          onClick={onSelectMenu}
          title="Choose Menu"
          value={
            categoryData.selectedMenu && `Menu ${categoryData.selectedMenu}`
          }
          placeHolder="Menu"
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

export default CategoryModal;
