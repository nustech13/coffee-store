import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './detail.css';
import { withRouter } from "react-router";
import axios from "axios";
import { Link } from 'react-router-dom';
import * as moment from 'moment'
import Footer from '../containers/Footer/footer';
import Loading from '../containers/Loading/Loading';

const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
class ProductDetail extends Component{
    constructor(){
        super();
        this.state = {
            _id: '',
            name: '',
            price: '',
            sale: '',
            description: '',
            image:'',
            categories: '',
            quantity: 0,
            products: [{
                _id: '',
                name: '',
                price: '',
                sale: '',
                description: '',
                image:'',
                categories: ''
            }],
            feedbacks: [],
            userName: '',
            email: '',
            content: '',
            is_loading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeFeedback = this.handleChangeFeedback.bind(this);
        this.sendFeedback = this.sendFeedback.bind(this);
        this.getFeedback = this.getFeedback.bind(this);
    }
    componentDidMount = async () =>{
        this.getProductById(this.props.match.params.id);
    }
    getProductById = async (id) =>{
        axios.get('http://localhost:5000/v1/api/product/detail/' + id)
          .then(items => {
              this.setState(items.data[0]);
              this.getProductDefault();
              this.getFeedback(items.data[0]._id);
              this.setState({is_loading: true});
        });
    }
    getFeedback = async (id) =>{
        axios.get('http://localhost:5000/v1/api/feedback/' + id)
          .then(items => {
              this.setState({feedbacks: items.data});
        });
    }
    getProductDefault = async () => {
        axios.post('http://localhost:5000/v1/api/product/category/', {page: 1, pageSize: 4, id:this.state.categories})
        .then(items => {
            this.setState({products: items.data.products});
        })
    }
    handleChange = (value, type) => {
        var valueNumber = parseInt(value);
        if(type === 'cong'){
            this.setState({quantity: valueNumber});
        }else{
            if(this.state.quantity > 1){
                this.setState({quantity: valueNumber});
            }
        }
    }
    handleChangeFeedback = (obj) =>{
        this.setState(obj);
    }
    sendFeedback = async () =>{
        const params = {
            name: this.state.userName,
            email: this.state.email,
            content: this.state.content,
            product: this.state._id
        }
        if(this.state.content.length < 1){
            alert( "Nội dung không được để trống");
        }
        else if(this.state.userName.length < 1){
            alert( "Tên không được để trống");
        }
        else if(this.state.email.length < 1){
            alert( "Email không được để trống");
        }
        else if(validateEmail(this.state.email) === null || this.state.email.length < 10){
            alert( "Email không hợp lệ");
        }else {
            axios.post('http://localhost:5000/v1/api/feedback/add/', params)
            .then(response => {
                console.log(response);
                this.setState({feedbacks: response.data});
            })
            .catch(error =>{
                console.log(error);
            })
        }

    }
    render =  () =>{
    return(
        <div>
        {this.state.is_loading ? (
            <div>
            <div className="container">
                <div className="container">
                    <div className="heading-section">
                        <h2>Chi tiết sản phẩm</h2>
                    </div>
                    <div className="row" style={{margin: '0 15px'}}>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                        <div className="product-img d-flex justify-content-center">
                            <img src={this.state.image} width={350} height={300} alt=''/>
                        </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                        <div className="product-dtl">
                            <div className="product-info">
                            <div className="product-name">{this.state.name}</div>
                            <div className="product-price-discount"><span style={{color:'red'}}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseInt(this.state.price)*(1-(parseInt(this.state.sale)/100)))}</span><span className="line-through">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseInt(this.state.price))}</span></div>
                            </div>
                            <div className="product-count">
                                <label className="d-flex justify-content-center">Quantity</label>
                                <form  className="d-flex justify-content-center">
                                <div className="qtyminus" onClick={() => this.handleChange(this.state.quantity-1, 'tru')}>-</div>
                                <input type="text" name="quantity" value={this.state.quantity} onChange={(e) => this.setState({quantity: parseInt(e.target.value.replace(/\D/,''))})} className="qty"/>
                                <div className="qtyplus" onClick={() => this.handleChange(this.state.quantity+1, 'cong')}>+</div>
                                </form>
                                <div className='d-flex justify-content-center ' style={{paddingTop: 20}}>
                                    <button className='round-black-btn' width={'100%'}>Mua Ngay</button>
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
                            {this.state.description}
                            </div>
                        </div>
                    </div>
                    <div className='row' style={{marginTop: "30px"}}>
                        <div className="heading-section">
                            <h2>Sản phẩm liên quan</h2>
                        </div>
                            {this.state.products.map((item) => (
                                <div className='col-sm-6 col-md-6 col-lg-3' key={item._id}>
                                    <ul className='product-default'>
                                        <li><Link to={'/san-pham/chi-tiet/' + item._id} onClick={() => window.location.reload()} style={{textDecoration: 'none'}}><img className='img-default' src={item.image} alt="" width={200} height={200}/></Link></li>
                                        <li><Link className='product-name' to={'/detail/' + item._id} onClick={() => window.location.reload()} style={{textDecoration: 'none'}}>{item.name}</Link></li>
                                        <li style={{textDecoration:'line-through'}}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseInt(item.price))}</li>
                                        <li style={{color:'red'}}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseInt(item.price)*(1-(parseInt(item.sale)/100)))}</li>
                                    </ul>
                                </div>
                            ))}
                    </div>
                </div>
                <div className="feeback-boxed">
                    <p className="feedback-title">Nhận xét của khách hàng</p>
                    <div className="feedback-user">
                        <div className="row feedback-comment">
                            <textarea className="col-12 feedback-comment-input" value={this.state.content} onChange={(e)=> this.handleChangeFeedback({content: e.target.value})} rows="5" placeholder="Nhận xét:"></textarea>
                            <input className="col-12 feedback-infor-name" value={this.state.userName} onChange={(e)=> this.handleChangeFeedback({userName: e.target.value})} type="text" placeholder="Họ và Tên:"/>
                            <input className="col-12 feedback-infor-email" value={this.state.email} onChange={(e)=> this.handleChangeFeedback({email: e.target.value})} type="text" placeholder="Email:"/>
                            <button className="col-12 feedback-btn" onClick={()=> this.sendFeedback()}>Gửi</button>
                        </div>
                    </div>
                    <div className="feedback-list">
                    {this.state.feedbacks.reverse().map((item) =>(
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
                </div>
            </div>
            <Footer/>
            </div>) : (<Loading/>)}
        </div>
    )
    }

}
export default withRouter(ProductDetail);