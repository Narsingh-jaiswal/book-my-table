import Button from "react-bootstrap/esm/Button";
import "../../index.css";

const ManageMenuActionButton = ({
  manageMenu,
  addMenu,
  setOpen,
  open,
  setIsItemModalOpen
}) => {
  return (
    <div className="menuActionButton" ref={manageMenu}>
      <Button variant="success" onClick={addMenu} className="actionButtons">
        Add Menu
      </Button>
      <Button
        variant="success"
        onClick={() => setOpen(!open)}
        className="actionButtons"
      >
        Add Category
      </Button>
      <Button
        variant="success"
        onClick={() => setIsItemModalOpen(!open)}
        className="actionButtons"
      >
        Add Item
      </Button>
    </div>
  );
};

export default ManageMenuActionButton;
