import React, { useContext, useEffect, useState } from 'react'
import Loading from '../Loading/Loading'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { cartcontext } from '../../context/CartContextProvider';
import { Helmet } from 'react-helmet';

export default function Cart() {
    let {  setcounter ,checkout, getUserCart ,RemoveFromCart ,CleraCart,updateCount } = useContext(cartcontext)
    let [items, setItem] = useState([])
    
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [btnLoading, setBtnLoading] = useState(false); // Initially set to false



    async function updateProductQuantity(id, newCount) {
        let res = await updateCount(id, newCount);
        // console.log(res.data.data)
        if (res?.data?.status === 'success') {
            setItem(res.data.data)
            setcounter(res?.data?.numOfCartItems);
            toast.success('Quantity updated Successfuly');
        }
    }

    async function createcheckout(id) {
        let data = await checkout(id);
        console.log(data.session.url)
        window.location.href=data.session.url;

    }
    async function deleteProduct(id) {
        let res = await RemoveFromCart(id);
        setItem(res?.data)
        if (res?.data?.status === 'success') {
            toast.success('Product removed Successfuly');
        }
    };

    async function clearCart() {
        setBtnLoading(true); // Set loading state to true before clearing cart
        try {
            const response = await CleraCart();
            if (response.status === "success") {
                setItem([]);
                setTotalCartPrice(0);
                // Delay navigation by 2 seconds
            }
        } catch (error) {
            console.error("Error clearing cart:", error);
            setBtnLoading(false); // Set loading state back to false in case of error
        }
    };

    useEffect(() => {
        getUserCart().then(data => {
            setItem(data?.data );
            console.log(data)
            
        })
    }, []);

    return (
        <>
            {items !== null && items?.products?.length > 0 ?
                <div className="container bg-main-light my-2 p-3">
                     <Helmet>
                <meta charSet="utf-8" />
                <title>Cart</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
                   <div className="header d-flex justify-content-between flex-wrap ">
                        <div className="content">
                        <h2>Shop Cart :</h2>
                    <p className='text-main'>Total Cart Price : {items?.totalCartPrice} EGP </p>
                        </div>
                        <div className="butt m-5">
                            <button onClick={()=>createcheckout(items._id)} className='btn bg-main text-white'>Pay out</button>
                        </div>
                    </div>
                    {items?.products?.map(item => {
                        return <div key={item._id} className="row border-bottom p-2">
                            <div className="col-md-1 ">
                                <img src={item.product.imageCover} class='w-100' alt="" />
                            </div>
                            <div className="col-md-11 d-flex justify-content-between ">
                                <div>
                                    <p className='m-0'>{item.product.title}</p>
                                    <p className='text-main m-0'>Price: {item.price} EGP</p>
                                    <button onClick={() => deleteProduct(item.product._id)} className='btn text-red m-0 mt-2 p-0'><i class="fa-solid fa-trash-can  "></i> Remove</button>
                                </div>
                                <div>
                                    <button onClick={() => { updateProductQuantity(item.product._id, item.count + 1) }} className='btn border-main btn-sm' style={{ height: 'fit-content' }}>+</button>
                                    <span className='mx-3'>{item.count}</span>
                                    <button disabled={item.count==1} onClick={() => { updateProductQuantity(item.product._id, item.count - 1) }} className='btn border-main btn-sm' style={{ height: 'fit-content' }}>-</button>
                                </div>
                            </div>
                        </div>
                    })}

                    
                    {btnLoading ? (
                        <button className='btn bg-main text-white w-25 mb-3 mt-2' disabled>Clearing Cart...</button>
                    ) : (
                        <Link to="/Home">
                            <button onClick={clearCart} className='btn bg-main text-white w-25 mb-3 mt-2'>Clear your Cart</button>
                        </Link>
                    )}

                </div> :<div className='container bg-main-light my-5 p-3'>
                    <div className="content">
                        <h2 className='fw-bold'>Cart Shop </h2>
                        <h3 className='fw-bolder'>Your cart is Empty</h3>
                    </div>
                </div>
                }

        </>
    )
}
//{ item.count > 1 ? updateProductQuantity(item.item._id, item.count - 1) : deleteItem(item.item._id) }}