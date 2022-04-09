import React from "react";
import { useSelector } from "react-redux";
import './card.css';
import {Link} from 'react-router-dom';
function Card() {
    const products = useSelector((state) => state.product.listAll);
    function removeAccents(str) {
        return str.normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }
    return(
        products.map((product) => (
        <div key={product._id} className="col-xs-8 col-sm-6 col-md-12 col-lg-4">
            <div className="card">
                <div className="card-sale">-{product.sale} %</div>
                <Link to={'/san-pham/chi-tiet/' + new String(removeAccents(product.name)).toLowerCase().trim().replace(/ /g,"-")}><img className="card-img-top" src={product.image} height={200} alt=""/></Link>
                <div className="card-body">
                    <p className="card-title d-flex justify-content-left">{product.name}</p>
                    <div className="card-text d-flex justify-content-left">
                        <div>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseInt(product.price)*(1-(parseInt(product.sale)/100)))}</div>
                        <div className="card-price-current">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseInt(product.price))}</div>
                    </div>
                    <div className="d-flex justify-content-center" style={{paddingTop: 15}}>
                        <button className="btn-add-cart">Thêm Vào Giỏ Hàng</button>
                    </div>
                </div>
            </div>
        </div>
        
        ))
        
    )
}

export default Card;