import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import shortid from "shortid";
import axios from "axios";
import { baseUrl } from "../../../../../../constants/baseUrl";
import "./index.css";

const AddTableForm = ({ newTableFormref, restaurantId }) => {
  const [tableData, setTableData] = useState({
    tableId: "",
    advancePayment: "",
    description: ""
  });

  const onChange = (e) => {
    setTableData({ ...tableData, [e.target.name]: e.target.value });
  };

  const autoGenerate = () => {
    setTableData({ ...tableData, tableId: shortid.generate() });
  };

  const addTable = () => {
    axios
      .post(`${baseUrl}restaurant/addTable`, {
        restaurantId,
        ...tableData
      })
      .then((response) => {
        console.log(response.data);
        setTableData({});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div ref={newTableFormref} className="container">
      <h6 className="title">Add New Table</h6>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control inputField"
          placeholder="Table id"
          name="tableId"
          value={tableData.tableId}
          onChange={onChange}
        />
        <button
          className="btn btn-outline-secondary autoGenerateButton"
          type="button"
          id="button-addon2"
          onClick={autoGenerate}
        >
          auto generate
        </button>
      </div>
      <div className="input-group mb-3">
        <input
          type="number"
          className="form-control inputField"
          placeholder="Advance payment"
          name="advancePayment"
          onChange={onChange}
          value={tableData.advancePayment}
        />
      </div>
      <div className="input-group">
        <textarea
          placeholder="description"
          className="form-control inputField"
          aria-label="With textarea"
          name="description"
          value={tableData.description}
          onChange={onChange}
        />
      </div>
      <Button onClick={addTable} className="addRestaurantButton">Add</Button>
    </div>
  );
};

export default AddTableForm;
