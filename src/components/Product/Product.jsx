import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cartcontext } from '../../context/CartContextProvider';
import { toast } from 'react-toastify';
import { wishcontext } from '../../context/WishlistContextProvider';

export default function Product({ item }) {
  const { counter, setcounter, addToCart } = useContext(cartcontext);
  const { addToWishList, getUserWish } = useContext(wishcontext);
  const [btnLoading, setBtnLoading] = useState(true);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);

  useEffect(() => {
    (async () => {
      let data = await getUserWish();
      let wishlistItems = data?.data;
      setIsAddedToWishlist(wishlistItems.some((wishlistItem) => wishlistItem._id === item._id));
      // if (data.status === 'success') {
      //   let wishlistItems = data?.data;
      //   setIsAddedToWishlist(wishlistItems.some((wishlistItem) => wishlistItem._id === item._id));
      // }
    })();
  }, [item]);

  async function addProductToCart(id) {
    setBtnLoading(false);
    let data = await addToCart(id);
    if (data.status === 'success') {
      toast.success('Product added successfully');
      setcounter(data.numOfCartItems);
      setBtnLoading(true);
    }
  }

  async function addProductToWish(id) {
    let data = await addToWishList(id);
    if (data.status === 'success') {
      toast.success('Product added successfully to wishlist');
      setIsAddedToWishlist(true);
    }
  }

  

  return (
    <>
    
      <div key={item._id} className="col-md-3 mb-3">
        <div className={`product p-2 px-3 rounded-3 cursor-pointer boxtext`}>
          <Link to={'/product-details/' + item._id}>
            <img src={item.imageCover} className="w-100" alt="" />
            <span className={`text-main spantext `}>{item.category.name}</span>
            <p className={` ptext `}>{item.title.split(' ').slice(0, 2).join(' ')}</p>
            <div className="d-flex justify-content-between">
              <div>
                <p>{item.price} EGP</p>
              </div>
              <div>
                <p>
                  <i className="fa-solid fa-star rating-color"></i>
                  {item.ratingsAverage}
                </p>
              </div>
            </div>
          </Link>

          <div className="content">
            <button
              disabled={!btnLoading}
              onClick={() => addProductToCart(item._id)}
              className="btn bg-main w-75 text-white"
            >
              {btnLoading ? 'Add To Cart' : <i className="fa fa-spinner fa-spin"></i>}
            </button>
            <span
              className={`fs-3 ms-3 ${isAddedToWishlist ? 'text-red' : ''}`}
              onClick={() => addProductToWish(item._id)}
            >
              <i className="fa-solid fa-heart"></i>{' '}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}