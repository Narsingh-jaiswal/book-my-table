import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { baseUrl } from "../../../../../../constants/baseUrl";
import "./index.css";

const Slots = ({ manageSlots, restaurantId, socket }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [slots, setSlots] = useState([]);

  const getSortedSlots = (slots) => {
    return slots
      .filter((element) => {
        return element.time !== "0" && element;
      })
      .sort((slot1, slot2) => (slot1.time > slot2.time ? 1 : -1));
  };

  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem("userData"));

    if (restaurantId && socket) {
      socket?.emit("getSlot", restaurantId, socket.id, email);
      socket?.on("getSlot", (slots) => {
        const data = getSortedSlots(slots);
        setSlots(data);
      });
    }
  }, [restaurantId, socket]);

  const save = () => {
    axios
      .post(`${baseUrl}restaurant/addSlots`, {
        time: `${startTime}-${endTime}`,
        restaurantId
      })
      .then((response) => {
        socket?.emit("getSlot", restaurantId, socket.id);
      })
      .catch((err) => {
        console.log(err);
      });
    setEndTime("");
    setStartTime("");
  };

  return (
    <div className="slotContainer" ref={manageSlots}>
      {slots.map((element, index) => {
        return (
          <div className="slot" key={index}>
            <h6 className="slotTime">{element.time}</h6>
          </div>
        );
      })}
      <div className="slot" style={{ padding: 2 }}>
        <div className="input-group">
          <input
            type="time"
            className="form-control"
            value={startTime}
            onChange={(e) => {
              setStartTime(e.target.value);
            }}
          />
          <input
            type="time"
            className="form-control"
            value={endTime}
            onChange={(e) => {
              setEndTime(e.target.value);
            }}
          />
          <Button className="input-group-text" id="basic-addon2" onClick={save}>
            save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Slots;
