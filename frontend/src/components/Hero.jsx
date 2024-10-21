import React from 'react';
import Slider from 'react-slick';
import { assets } from '../assets/assets'; 
import { Link } from 'react-router-dom';

// Array of images for the slider
const sliderImages = [
    // { src: assets.shop_banner1, alt: "Image 1" },
    // { src: assets.shop_banner2, alt: "Image 2" },
    // { src: assets.shop_banner3, alt: "Image 3" }, 
    // { src: assets.shop_banner4, alt: "Image 3" }, 
    // { src: assets.shop_banner5, alt: "Image 3" }, 
    { src: assets.shop_banner6, alt: "Image 3" }, 
    { src: assets.shop_banner7, alt: "Image 3" }, 
    // { src: assets.shop_banner8, alt: "Image 3" }, 
    // { src: assets.shop_banner9, alt: "Image 3" }, 
    // { src: assets.shop_banner10, alt: "Image 3" }, 

];

const Hero = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div>
            <Slider {...settings}>
                {sliderImages.map((image, index) => (
                    <div key={index} className="w-full relative overflow-hidden">
                        <Link to="/shop" className='group'>
                            <img
                                className="w-full h-[50vh] md:h-[80vh] lg:h-[100vh] object-cover transition-transform duration-500 group-hover:scale-110"
                                src={image.src}
                                alt={image.alt}
                            />
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Hero;
