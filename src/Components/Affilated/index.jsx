import axios from "axios";
import { useEffect } from "react";
import { baseUrl } from "../../constants/baseUrl";
import ViewPlan from "../viewPlan";
import "./index.css";

const Affiliate = () => {
  return (
    <>
      <h1 className="title">step into the bussiness</h1>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8iv-R8nS4A48Ylf-ancKbchTWggoaW4ob3Q&usqp=CAU"
        alt=""
        width={"100%"}
      />
      <ViewPlan />
    </>
  );
};

export default Affiliate;
