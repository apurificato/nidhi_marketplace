
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export default function ImageSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Adjust the speed as needed (milliseconds)
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="image-slider-container">
      <Slider {...settings}>
        <div>
          <img src="/Summer-hat.png" />
        </div>
        <div>
          <img src="/Jewelry-set.png" />
        </div>
        <div>
          <img src="/Laptop.png" />
        </div>
        <div>
          <img src="/Running-shoes.png" />
        </div>
      </Slider>
    </div>
  );
}