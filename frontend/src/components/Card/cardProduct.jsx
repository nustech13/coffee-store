import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from 'react-paginate';
import './card.css';
import {Link} from 'react-router-dom';
import {addToCart} from '../../actions/cart.js';

function Card({products}) {
    const dispatch = useDispatch();
    function removeAccents(str) {
        return str.normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }
    const handleAddToCart = (product) => {
      dispatch(addToCart(product, 1));
      alert("Thêm vào giỏ hàng thành công")
    };
    return(
        <>
        {products && products.map((product) => (
        <div key={product._id} className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
            <div className="card">
                <div className="card-sale">-{product.sale}%</div>
                <Link className="img-link" to={'/san-pham/chi-tiet/' + String(removeAccents(product.name)).toLowerCase().trim().replace(/ /g,"-")}><img className="card-img-top" src={product.image} height={200} alt=""/></Link>
                <div className="card-body">
                    <p className="card-title d-flex justify-content-left"><Link className="img-link" to={'/san-pham/chi-tiet/' + String(removeAccents(product.name)).toLowerCase().trim().replace(/ /g,"-")}>{product.name}</Link></p>
                    <div className="card-text d-flex justify-content-left">
                        <div>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseInt(product.price)*(1-(parseInt(product.sale)/100)))}</div>
                        <div className="card-price-current">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseInt(product.price))}</div>
                    </div>
                    <div className="d-flex justify-content-center" style={{paddingTop: 15}}>
                        <button className="btn-add-cart" onClick={()=>handleAddToCart(product)}>Thêm Vào Giỏ Hàng</button>
                    </div>
                </div>
            </div>
        </div>
        
        ))}
        </>
    )
}
function PaginatedItems({ itemsPerPage ,isActiveUp}) {
    const products = useSelector((state) => state.product.listAll);
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
      let isMounted = true;
      if(isMounted ){
        setCurrentItems(products.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(products.length / itemsPerPage));
        if(isActiveUp !== 0){
          setCurrentItems(products.slice(itemOffset, endOffset));
        }
      }
      return () => {
        isMounted = false;
      };
    }, [itemOffset, itemsPerPage, isActiveUp, products]);
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % products.length;
      setItemOffset(newOffset);
    };
  
    return (
      <>
        <Card products={currentItems} />
        <div className="paginate">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          previousLabel="<" 
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          containerClassName={'pagination'} 
          subContainerClassName={'pages pagination'} 
          activeClassName={'active'} 
        />
        </div>
      </>
    );
  }

export default PaginatedItems;