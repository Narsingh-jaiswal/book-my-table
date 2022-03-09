import Button from "react-bootstrap/esm/Button";
import "./index.css";

const ActionButton = ({
  newTableFormref,
  manageSlots,
  manageMenu,
  manageStaff
}) => {
  const scrollInto = (ref) => {
    const element = ref.current;
    element.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest"
    });
  };

  return (
    <div className="actionButtonContainer">
      <Button
        variant="success"
        className="addButton actionButton"
        onClick={() => scrollInto(newTableFormref)}
      >
        Add Tables
      </Button>
      <Button
        variant="success"
        className="addButton actionButton"
        onClick={() => scrollInto(manageSlots)}
      >
        manage Slots
      </Button>
      <Button
        variant="success"
        className="addButton actionButton"
        onClick={() => scrollInto(manageMenu)}
      >
        manage Menu Card
      </Button>
      <Button
        variant="success"
        className="addButton actionButton"
        onClick={() => scrollInto(manageStaff)}
      >
        Add Staff
      </Button>
    </div>
  );
};

export default ActionButton;
