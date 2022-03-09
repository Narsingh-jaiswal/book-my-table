import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import { baseUrl } from "../../../../../../constants/baseUrl";

const AddEmployee = ({ restaurantId, manageStaff }) => {
  const initialEmployeeObject = {
    employeeId: "",
    employeeName: "",
    password: "",
    restaurantId
  };
  const [employeeData, setEmployeeData] = useState(initialEmployeeObject);

  const onChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const onSave = () => {
    axios
      .post(`${baseUrl}restaurant/addEmployee`, employeeData)
      .then((response) => {
        setEmployeeData(initialEmployeeObject);
      });
  };

  return (
    <div style={{ padding: 10 }}>
      <h6 className="title timeSlotHeading">Add Staff</h6>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
        <FormControl
          placeholder="employee id"
          aria-label="Username"
          aria-describedby="basic-addon1"
          name="employeeId"
          value={employeeData.employeeId}
          onChange={onChange}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <FormControl
          placeholder="employee name"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          name="employeeName"
          value={employeeData.employeeName}
          onChange={onChange}
        />
      </InputGroup>

      <InputGroup className="mb-3" ref={manageStaff}>
        <FormControl
          placeholder="Password"
          aria-describedby="basic-addon2"
          name="password"
          type="password"
          value={employeeData.password}
          onChange={onChange}
        />
      </InputGroup>
      <Button style={{ width: "100%" }} onClick={onSave}>
        Add Staff
      </Button>
    </div>
  );
};
export default AddEmployee;
