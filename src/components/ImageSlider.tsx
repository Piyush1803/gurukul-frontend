import Slider from 'react-slick';
import { assets } from '../assets/assets';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from 'react';

const ImageSlider = () => {
  const sliderImages: string[] = [assets.homeSlider1, assets.homeSlider2, assets.homeSlider3];
  const [currentSlide, setCurrentSlide] = useState(0);


  const settings = {
  customPaging: (i: number) => (
    <div className="h-1 w-12 bg-gray-300 relative overflow-hidden">
      <div className={`absolute top-0 left-0 h-full bg-white transition-all duration-[3000ms] ease-linear ${currentSlide === i ? 'w-full' : 'w-0'}`} />
    </div>
  ),
  appendDots: (dots: React.ReactNode) => (
    <div className="flex gap-2 justify-center absolute bottom-5 w-full">
      {dots}
    </div>
  ),
  beforeChange: (_: number, next: number) => setCurrentSlide(next),
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};


  return (
    <div className="w-full h-[600px]">
      <Slider {...settings}>
        {sliderImages.map((image: string, idx: number) => (
          <div key={idx}>
            <img
              src={image}
              alt={`Slide ${idx + 1}`}
              className="w-full h-[600px] object-conatain"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
