import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {deleteFromCart} from '../actions/cart.js';
import Header from '../containers/Header/header.jsx';
import './cart.css';
const Cart = () => {
	const { cart } = useSelector(state => state.cart);
    const [total, setTotal] = useState(0);
	const dispatch = useDispatch();
    const getTotal = () =>{
        setTotal(0);
        var num = 0;
        const cart = localStorage.getItem('cart')
			? JSON.parse(localStorage.getItem('cart'))
			: [];
        cart.forEach(cartItem => {
            num += parseInt(cartItem.quantity) *  parseInt(cartItem.price)*(1-(parseInt(cartItem.sale)/100));
        });
        setTotal(num);
    }
    useEffect(() => {
        let isMounted = true;
        if(isMounted ){
          getTotal();
        }
        return () => {
          isMounted = false;
        };
      }, []);
	const handleQtyChange = (value, product) => {
		const cart = localStorage.getItem('cart')
			? JSON.parse(localStorage.getItem('cart'))
			: [];
        var quantity = value > 0 ? value : 1; 
		cart.forEach(cartItem => {
			if (cartItem._id === product._id) {
				cartItem.quantity = parseInt(quantity);
			}
		});

		localStorage.setItem('cart', JSON.stringify(cart));

		dispatch({
			type: 'ADD_TO_CART',
			payload: cart,
		});
        getTotal();
	};
	return (
        <div>
            <Header isLinkActive={'gio-hang'}/>
            <div className="container-fluid" style={{paddingTop: "80px"}}>
                <div className="row justify-content-center">
                    <div className="col-12">
                        <h1 style={{paddingTop:20, paddingBottom:20, textAlign:'center'}}>Giỏ Hàng</h1>
                        {cart.length > 0 ?
                        <div className='col-12 cart-boxed'>
                            {cart && cart.map((product) =>
                                <div key={product._id} className='product-cart-item'>
                                    <div className='cart-product-image'><img src={product.image} alt={""}/></div>
                                    <div className='cart-product-name'><span className='name-product'>{product.name}</span></div>
                                    <div className='cart-product-quantity'>
                                        <div className="qtyminus" onClick={() => handleQtyChange(product.quantity - 1, product)}>-</div>
                                            <input 
                                                type='number'
                                                min={1}
                                                value={product.quantity || 1}
                                                onChange={e =>
                                                handleQtyChange(e.target.value,	product)} 
                                                className="qty"
                                            />                
                                        <div className="qtyplus" onClick={() =>	handleQtyChange(product.quantity + 1, product)}>+</div>
                                    </div>
                                    <div className='cart-product-price'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseInt(product.price)*(1-(parseInt(product.sale)/100)))}</div>
                                    <div className='cart-product-remove'>
                                        <i onClick={() => {dispatch(deleteFromCart(product)); getTotal()}} className="fa fa-trash icon-remove" aria-hidden="true"></i>
                                    </div>
                                </div>
                            )}
                            <div className='product-toltal-all'>
                                <p>Tổng tiền: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}</p>
                            </div>
                            <div className='btn-buy-cart'>
                                <button disabled={cart.length > 0 ? "" : "disabled"} onClick={()=> console.log('ngu')} className='btn-buy'>Thanh Toán</button>
                            </div>
                        </div> : <h2 style={{textAlign:'center'}}>Chưa thêm sản phẩm nào vào giỏ hàng, <Link to={'/san-pham'}>chọn sản phẩm ngay</Link></h2>}
                    </div>
                </div>
            </div> 
        </div>
    )

}
export default Cart;