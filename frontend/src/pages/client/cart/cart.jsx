import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {deleteFromCart} from '../../../actions/cart.js';
import Header from '../../../components/Header/header.jsx';
import Cookies from 'universal-cookie';
import './cart.css';
import axios from "axios";
const cookies = new Cookies();
const Cart = () => {
	const { cart } = useSelector(state => state.cart);
    const [total, setTotal] = useState(0);
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");
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
          if(cookies.get('customer')){
            setCustomerName(cookies.get('customer').name);
            setCustomerPhone(cookies.get('customer').phone);
        }
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
    const checkPhone = (phone) =>{
        var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        return vnf_regex.test(phone);
    }
    const checkout = async () =>{
        const params = {
            total: total,
            customerName: customerName,
            customerPhone: customerPhone,
            customerAddress: customerAddress
        }
        if(customerName.localeCompare("") === 0){
            alert("Tên khách hàng không được để trống!")
        }else if(customerPhone.localeCompare("") === 0){
            alert("Số điện thoại không được để trống!")
        }else if(customerAddress.localeCompare("") === 0){
            alert("Địa chỉ không được để trống!")
        }else if(!checkPhone(customerPhone) || customerPhone.length !== 10){
            alert("Số điện thoại không hợp lệ!")
        }else{
            axios.post('http://localhost:5000/v1/api/order/add/', params)
                .then(response => {
                    console.log(response);
                    cart.forEach(element => {
                        axios.post('http://localhost:5000/v1/api/order-detail/add/', {quantity: element.quantity, order: response.data._id, product: element._id});
                    });
                    localStorage.setItem('cart', JSON.stringify([]));
                    dispatch({
                        type: 'ADD_TO_CART',
                        payload: [],
                    });
                    alert("Đặt hàng thành công! Đơn hàng của bạn sẽ đến trong chốc lát!")
                })
                .catch(error =>{
                    console.log(error);
                })
        }  
    }
	return (
        <div>
            <Header isLinkActive={'gio-hang'}/>
            <div className="container-fluid" style={{paddingTop: "80px"}}>
                <div className="row justify-content-center">
                    <div className="col-12">
                        <h1 style={{paddingTop:20, paddingBottom:20, textAlign:'center'}}>Giỏ Hàng</h1>
                        {cart.length > 0 ?
                        <div>
                            <div className='col-12 cart-boxed cart-infor'>
                                <div>
                                    <label>Tên khách hàng:</label>
                                    <input disabled={cookies.get('customer') ? "disabled" : ""} type="text" value={customerName || ""} onChange={(e)=> setCustomerName(e.target.value)}/>
                                </div>
                                <div>
                                    <label>Số điện thoại:</label>
                                    <input disabled={cookies.get('customer') ? "disabled" : ""} type="text" value={customerPhone || ""} onChange={(e)=> setCustomerPhone(e.target.value)}/>
                                </div>
                                <div>
                                    <label>Địa chỉ:</label>
                                    <input type="text" value={customerAddress || ""} onChange={(e)=> setCustomerAddress(e.target.value)}/>
                                </div>
                            </div>
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
                                    <button onClick={()=> checkout()} className='btn-buy'>Thanh Toán</button>
                                </div>
                            </div>
                        </div> : <h2 style={{textAlign:'center'}}>Chưa thêm sản phẩm nào vào giỏ hàng, <Link to={'/san-pham'}>chọn sản phẩm ngay</Link></h2>}
                    </div>
                </div>
            </div> 
        </div>
    )

}
export default Cart;