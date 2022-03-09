import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";

const RestaurantImagesCarousel = () => {
  return (
    <>
      <div>
        <Carousel>
          <Carousel.Item interval={3000}>
            <img
              className="d-block w-100"
              src="https://media-cdn.tripadvisor.com/media/photo-s/12/0f/3f/0e/zooris-bar-restaurant.jpg"
              alt="Image One"
            />
            <Carousel.Caption>
              <h3>Label for first slide</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img
              className="d-block w-100"
              src="https://media-cdn.tripadvisor.com/media/photo-s/1a/3f/4c/9e/dining-at-the-viewpoint.jpg"
              alt="Image Two"
            />
            <Carousel.Caption>
              <h3>Label for second slide</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img
              className="d-block w-100"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYXpLKlz5tqMpsfXCqsYlw3KELlXUz7fEQ1prgdK7q8QIE5FhT-0v3mvzBEQt-HduTpl0&usqp=CAU"
              alt="Image three"
            />
            <Carousel.Caption>
              <h3>Label for second slide</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
};

export default RestaurantImagesCarousel;
