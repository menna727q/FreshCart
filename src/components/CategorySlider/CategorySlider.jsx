import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Slider from 'react-slick';

export default function CategorySlider() {
  function getCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }

  const { data } = useQuery('categorySlider', getCategories);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
  };

  return (
    <div className="category-slider-container">
      {data?.data.data ? (
        <div className="py-3 m-0">
          <Slider {...settings}>
            {data?.data.data.map((item) => (
                <div className='col-md-2 '>
                    <div className="content text-center">
                    <img height={250} key={item._id} src={item.image} className="w-100" alt="" />
                     <p className='ptext fitcontent ms-2 '>{item.name.slice('').split(0,1).join('')}</p>
                    </div>

                </div>              
            ))}
          </Slider>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}