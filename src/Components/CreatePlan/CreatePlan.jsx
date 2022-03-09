import { useState } from "react";
import axios from "axios";

const CreatePlan = ({ setOpen }) => {
  const [planData, setPlanData] = useState({
    planName: "",
    amount: 0,
    validDate: new Date()
  });

  const onChange = (e) => {
    setPlanData({ ...planData, [e.target.name]: e.target.value });
  };

  const onSave = () => {
    axios
      .post("http://localhost:3000/razorpay/createPlan", planData)
      .then((response) => {
        console.log({ response: response.data });
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  return (
    <>
      <div className="modal-body">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Plan Name"
            aria-label="Plan Name"
            aria-describedby="basic-addon1"
            onChange={onChange}
            name="planName"
          />
        </div>

        <label htmlFor="basic-url" className="form-label">
          Valid days
        </label>
        <div className="input-group mb-3">
          <input
            type="date"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={onChange}
            name="validDate"
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text">&#8377;</span>
          <input
            type="text"
            className="form-control"
            aria-label="Amount (to the nearest dollar)"
            onChange={onChange}
            name="amount"
          />
          <span className="input-group-text">.00</span>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            type="button"
            className="btn btn-outline-primary"
            style={{ marginRight: 10 }}
            onClick={onSave}
          >
            save
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setOpen(false)}
          >
            cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default CreatePlan;
