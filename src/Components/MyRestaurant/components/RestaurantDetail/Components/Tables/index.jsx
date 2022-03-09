import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const RestaurantTables = ({ restaurantData, navigateUrl }) => {
  const navigate = useNavigate();
  const mock = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT7ofm66TfyuvJfNUULiGuL4WM_lgiHQZZ9UafSC5gWPycF9NEssKP65L4_4_w6oEL0Dw&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2VixFSul7MCfbx5P0O2ny-ncdwR2YZGHDIQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSecgzvweBj1jew4Ps13fWK9SEmNuiEB5CmDgYBp1Dn6qtdPeJ33oCIAgI1H7PaLjpfxac&usqp=CAU",
    "https://wallpapercave.com/wp/wp1874160.jpg"
  ];

  return (
    <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}>
      {restaurantData?.map((element, index) => (
        <div className="card" style={{ width: "45%", margin: 10 }} key={index}>
          <img src={mock[index]} className="card-img-top" alt="..." />
          <div className="card-body">
            <p className="card-text" style={{ height: 120, overflow: "auto" }}>
              {element.description}
            </p>
            <Button
              variant="success"
              style={{ width: "100%" }}
              onClick={() =>
                navigate(
                  `${navigateUrl}/${element.restaurantId}/${element?.tableId}`,
                  {
                    state: {
                      advancePayment: element.advancePayment
                    }
                  }
                )
              }
            >
              View
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantTables;
