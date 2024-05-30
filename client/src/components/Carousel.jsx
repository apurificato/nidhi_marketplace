
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
          <img src="https://www.shrm.org/topics-tools/news/hr-magazine/ask-expert-whiff-weed/_jcr_content/_cq_featuredimage.coreimg.jpeg/1703128193176/istock-1442479025-nrh1c9.jpeg" />
        </div>
        <div>
          <img src="https://bloximages.newyork1.vip.townnews.com/stltoday.com/content/tncms/assets/v3/editorial/7/f6/7f649ede-22a6-5735-a4fa-9307f0fe9cd8/63ea615255ded.preview.jpg?crop=1763%2C926%2C0%2C124&resize=1200%2C630&order=crop%2Cresize" />
        </div>
        <div>
          <img src="https://media.post.rvohealth.io/wp-content/uploads/sites/3/2024/01/Marijuana-joints-with-cannabis-laying-on-wooden-tray-header-1024x575.jpg" />
        </div>
        <div>
          <img src="https://josephhollander.com/cdn-cgi/image/quality=90,gravity=auto,sharpen=1,metadata=none,format=auto,onerror=redirect/wp-content/uploads/2022/10/marijuana.jpg" />
        </div>
      </Slider>
    </div>
  );
}