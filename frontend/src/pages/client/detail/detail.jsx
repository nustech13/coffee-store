import React, {useEffect, useState, useCallback} from 'react';
import { useDispatch } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import './detail.css';
import { withRouter } from "react-router";
import axios from "axios";
import * as moment from 'moment'
import Footer from '../../../components/Footer/footer';
import Loading from '../../../components/Loading/Loading';
import Header from '../../../components/Header/header.jsx';
import Cookies from 'universal-cookie';
import {addToCart} from '../../../actions/cart.js';
    const cookies = new Cookies();
    function ProductDetail(props){
        const [product, setProduct] = useState({});
        const [quantity, setQuantity] = useState(1);
        const [page, setPage] = useState(1);
        const [pageSize] = useState(6);
        const [totalCount, setTotalCount] = useState(0);
        const [offset, setOffset] = useState(0);
        const [feedbacks, setFeedbacks] = useState([]);
        const [userName, setUserName] = useState("");
        const [email, setEmail] = useState("");
        const [content, setContent] = useState("");
        const [isLoading, setIsLoading] = useState(false);
        const dispatch = useDispatch();
        const [id, setId] = useState(props.match.params.id);
        const [_id, set_Id] = useState('');
        const getFeedbacks = useCallback(async (pg = page, pgSize = pageSize, id) =>{
            const params = {
                page: pg,
                pageSize: pgSize,
            }
            try {
                const res = await axios.post('http://localhost:5000/v1/api/feedback/product/' + id, params);
                if(res.data){
                    setFeedbacks(res.data.feedbacks.reverse());
                    setTotalCount(res.data.numberOfResult);    
                    setOffset(res.data.offset);
                }
            } catch (error) {
                console.log("Call API Products Error:", error);
            }
            
        }, [page, pageSize])
        const getProductById = useCallback(async (id) =>{
            setId(id);
            axios.get('http://localhost:5000/v1/api/product/detail/' + id)
            .then(items => {
                setProduct(items.data[0]);
                getFeedbacks(page, pageSize, items.data[0]._id);
                set_Id(items.data[0]._id);
                setTimeout(() => {
                    setIsLoading(true);
                }, 2500);
            }).catch(error =>{
                console.log(error);
                props.history.push(props.match.params.id + '/notfound404');
            });
        }, [props.history, props.match.params.id, getFeedbacks, page, pageSize]);
        
        useEffect(()=>{
            let isMounted = true;
            if(isMounted ){
                getProductById(id);
                if(cookies.get('customer')){
                    setUserName(cookies.get('customer').name);
                    setEmail(cookies.get('customer').email);
                }
            }
            return () => {
                isMounted = false;
            };
        }, [id, getProductById]);
        const handleChange = (value, type) => {
            var valueNumber = parseInt(value);
            if(type === 'cong'){
                setQuantity(valueNumber);
            }else{
                if(quantity > 1){
                    setQuantity(valueNumber);
                }
            }
        }
        const prevPage = async () =>{
            const pg = page === 1 ? 1 : page - 1;
            setIsLoading(false);
            getProductById(id);
            setPage(pg);
        }
        const nextPage = async () =>{
            const pg = page < Math.ceil(totalCount / pageSize) ? page + 1 : page;
            setIsLoading(false);
            getProductById(id);
            setPage(pg);
        }
        const sendFeedback = async () =>{
            const params = {
                name: userName,
                email: email,
                content: content,
                product: product._id
            }
            if(content.localeCompare("") === 0){
                alert( "Nội dung không được để trống");
            }
            else if(userName.localeCompare("") === 0){
                alert( "Tên không được để trống");
            }
            else if(email.localeCompare("") === 0){
                alert( "Email không được để trống");
            }
            else if(validateEmail(email) === null){
                alert( "Email không hợp lệ");
            }else {
                axios.post('http://localhost:5000/v1/api/feedback/add/', params)
                .then(response => {
                    getFeedbacks(page, pageSize, _id);
                    setContent("");
                    setEmail(cookies.get('customer') ? cookies.get('customer').email : "");
                    setUserName(cookies.get('customer') ? cookies.get('customer').name : "");
                })
                .catch(error =>{
                    console.log(error);
                })
            }

        }
        const handleAddToCart = () => {
            dispatch(addToCart(product, quantity));
            alert("Thêm vào giỏ hàng thành công");
        };
        const validateEmail = (email) => {
            return email.match(
                // eslint-disable-next-line
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        };
        return(
            <div>
                <Header isLinkActive={'san-pham'}/>
                {isLoading ? (
                <div>
                <div className="container">
                    <div className="container">
                        <div className="heading-section">
                            <h2>Chi tiết sản phẩm</h2>
                        </div>
                        <div className="row" style={{margin: '0 15px'}}>
                            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                            <div className="product-img d-flex justify-content-center">
                                <img src={product.image} width={350} height={300} alt=''/>
                            </div>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                            <div className="product-dtl">
                                <div className="product-info">
                                <div className="product-name">{product.name}</div>
                                <div className="product-price-discount"><span style={{color:'red'}}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseInt(product.price)*(1-(parseInt(product.sale)/100)))}</span><span className="line-through">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseInt(product.price))}</span></div>
                                </div>
                                <div className="product-count">
                                    <label className="d-flex justify-content-center">Quantity</label>
                                    <form  className="d-flex justify-content-center">
                                    <div className="qtyminus" onClick={() => handleChange(quantity-1, 'tru')}>-</div>
                                    <input type="number" name="quantity" value={quantity || 1} onChange={(e) => setQuantity(parseInt(e.target.value))} className="qty"/>
                                    <div className="qtyplus" onClick={() => handleChange(quantity+1, 'cong')}>+</div>
                                    </form>
                                    <div className='d-flex justify-content-center ' style={{paddingTop: 20}}>
                                        <button className='round-black-btn' width={'100%'} onClick={()=> handleAddToCart()}>Thêm vào giỏ</button>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="product-info-tabs">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <p className="nav-link active" id="description-tab" data-toggle="tab" role="tab" aria-controls="description" aria-selected="true">Description</p>
                                </li>
                                </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
                                {product.description}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="feeback-boxed">
                        <p className="feedback-title">Nhận xét của khách hàng</p>
                        <div className="feedback-user">
                            <div className="row feedback-comment">
                                <textarea className="col-12 feedback-comment-input" value={content || ""} onChange={(e)=> setContent(e.target.value)} rows="5" placeholder="Nhận xét:"></textarea>
                                <input disabled={cookies.get('customer') ? "disabled" : ""} className="col-12 feedback-infor-name" value={userName || ""} onChange={(e)=> setUserName(e.target.value)} type="text" placeholder="Họ và Tên:"/>
                                <input disabled={cookies.get('customer') ? "disabled" : ""} className="col-12 feedback-infor-email" value={email || ""} onChange={(e)=> setEmail(e.target.value)} type="text" placeholder="Email:"/>
                                <button className="col-12 feedback-btn" onClick={()=> sendFeedback()}>Gửi</button>
                            </div>
                        </div>
                        <div className="feedback-list">
                        {feedbacks.map((item) =>(
                            <div key={item._id}  className="feedback-item">
                                <div className="row row-feedback">
                                    <div className="col-12 feedback-content">
                                        <div className="col-3 feedback-avatar">
                                            <img className="feedback-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/2048px-User_font_awesome.svg.png" alt=""/>
                                        </div>
                                        <div className='col-8'>
                                            <div className="feedback-top">
                                                <p className="feedback-name"><span>{item.name}</span></p>
                                                <p className="feedback-time"><span>{moment(moment(item.createdAt).format("YYYY-MM-DD[T]HH:mm:ss")).fromNow()}</span></p>
                                            </div>
                                            <div className="feedback-bottom">
                                                <span>{item.content}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>
                        <div style={{margin:'auto'}}>
                        <div>
                            <label>showing {totalCount === 0 ? 0 : offset + 1} to {offset + pageSize > totalCount ? totalCount : offset + pageSize} of {totalCount} feedbacks</label>
                        </div>
                        <div style={{display:'flex', margin: '0 80px'}}>
                            <button disabled={page === 1 ? "disabled" : ""} onClick={() => prevPage()} className="btn btn-secondary">Prev</button>
                            <button disabled={page === Math.ceil(totalCount / pageSize) || (totalCount === 0) ? "disabled" : ""} onClick={() => nextPage()} className="btn btn-secondary">Next</button>
                        </div>
                    </div>
                    </div>
                </div>
                <Footer/>
                </div>) : (<Loading/>)}
            </div>
        )
        

    }
export default withRouter(ProductDetail);