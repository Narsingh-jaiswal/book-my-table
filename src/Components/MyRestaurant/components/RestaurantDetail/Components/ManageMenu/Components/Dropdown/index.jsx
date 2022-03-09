import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/esm/Button";
import "./index.css";

const DropdownField = ({ options, value, onClick, title, placeHolder }) => {
  return (
    <div className="dropdownContainer">
      <Dropdown as={ButtonGroup}>
        <Button variant="success">{title}</Button>
        <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
        <Dropdown.Menu>
          {options?.length &&
            options?.map((element, index) => {
              return (
                <Dropdown.Item
                  onClick={() => onClick(element, index)}
                  key={index}
                >{`${element?.displayValue}`}</Dropdown.Item>
              );
            })}
        </Dropdown.Menu>
      </Dropdown>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder={placeHolder}
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={value}
          readOnly
        />
      </div>
    </div>
  );
};

export default DropdownField;
