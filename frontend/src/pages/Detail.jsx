import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './detail.css';
import { withRouter } from "react-router";
import axios from "axios";
import { Link } from 'react-router-dom';
import * as ReactBootStrap from 'react-bootstrap';
class ProductDetail extends Component{
    constructor(){
        super();
        this.state = {
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
            is_loading: false
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount = async () =>{
        this.getProductById(this.props.match.params.id);
        this.getProductDefault();
    }
    getProductById = (id) =>{
        axios.get('http://localhost:5000/v1/api/product/detail/' + id)
          .then(items => {
              this.setState(items.data[0]);
        });
      }
    getProductDefault = async () => {
        axios.post('http://localhost:5000/v1/api/product/', {page: 1, pageSize: 4})
        .then(items => {
            this.setState({products: items.data.products});
            this.setState({is_loading: true});
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

    render =  () =>{
    return(
        <>
            {this.state.is_loading ? (
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
                            <div className="product-name d-flex justify-content-left">{this.state.name}</div>
                            <div className="product-price-discount d-flex justify-content-left "><span style={{color:'red'}}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseInt(this.state.price)*(1-(parseInt(this.state.sale)/100)))}</span><span className="line-through">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseInt(this.state.price))}</span></div>
                            </div>
                            <div className="product-count">
                                <label className="d-flex justify-content-left">Quantity</label>
                                <form  className="d-flex justify-content-left">
                                <div className="qtyminus" onClick={() => this.handleChange(this.state.quantity-1, 'tru')}>-</div>
                                <input type="text" name="quantity" value={this.state.quantity} onChange={(e) => this.setState({quantity: parseInt(e.target.value.replace(/\D/,''))})} className="qty"/>
                                <div className="qtyplus" onClick={() => this.handleChange(this.state.quantity+1, 'cong')}>+</div>
                                </form>
                                <div className='d-flex justify-content-left ' style={{paddingTop: 20}}>
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
                    <div className='row'>
                        <h2>Sản Phẩm Liên Quan</h2>
                            {this.state.products.map((item) => (
                                <div className='col-sm-6 col-md-4 col-lg-3' key={item._id}>
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
            </div>) : (<div className="d-flex justify-content-center" style={{paddingTop: 90}}><ReactBootStrap.Spinner animation='border'/></div>)}
        </>
    )
    }

}
export default withRouter(ProductDetail);