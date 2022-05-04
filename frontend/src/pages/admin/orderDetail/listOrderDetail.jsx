import React, { useEffect, useState, useCallback  } from "react";
import axios from "axios";
import Navigation from "../../../components/Navigation/navigation";
import './orderDetail.css';
import * as ReactBootStrap from 'react-bootstrap';
import { withRouter } from "react-router";
const OrderDetails = (props) => {
    document.title = "Category";
    const [page, setPage] = useState(1);
    const [pageSize] = useState(6);
    const [totalCount, setTotalCount] = useState(0);
    const [offset, setOffset] = useState(0);
    const [orderDetails, setOrderDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const getOrderDetails = useCallback(async (pg = page, pgSize = pageSize) =>{
        const params = {
            page: pg,
            pageSize: pgSize,
        }
        try {
            const res = await axios.post('http://localhost:5000/v1/api/order-detail/order/' + props.match.params.id, params);
            if(res.data){
                setOrderDetails(res.data.orderDetail);
                setTotalCount(res.data.numberOfResult);    
                setOffset(res.data.offset);
                setTimeout(() => {
                    setLoading(true);         
                }, 1000);
            }
        } catch (error) {
            console.log("Call API Products Error:", error);
        }
        
    }, [page, pageSize, props.match.params.id])
    
    useEffect(() =>{
        let mounted = true;
        if(mounted) {getOrderDetails();}
        return () => mounted = false;
    }, [getOrderDetails]);

    const prevPage = async () =>{
        const pg = page === 1 ? 1 : page - 1;
        getOrderDetails(pg);
        setPage(pg);
    }
    const nextPage = async () =>{
        const pg = page < Math.ceil(totalCount / pageSize) ? page + 1 : page;
        getOrderDetails(pg);
        setPage(pg);
    }
    return(
      <div>
        <Navigation/>    
        <div className="boxed-orderDetail">
            <h2>QUẢN LÝ ORDER DETAIL</h2>
                {loading ?
                <div> 
                    <div>
                        <table className="table">
                            <tbody>
                                <tr style={{background:'rgb(145, 230, 230)'}}>
                                    <th scope="col">PRODUCT NAME</th>
                                    <th scope="col">IMAGE</th>
                                    <th scope="col">PRICE</th>
                                    <th scope="col">QUANTITY</th>
                                    <th scope="col">TOTAL</th>
                                </tr>
                                {orderDetails && orderDetails.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.product.name}</td>
                                        <td><img src={item.product.image} alt="" height={100} width={200}/></td>
                                        <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseInt(item.product.price)*(1-(parseInt(item.product.sale)/100)))}</td>  
                                        <td>{item.quantity}</td>
                                        <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.quantity*parseInt(item.product.price)*(1-(parseInt(item.product.sale)/100)))}</td>
                                    </tr>
                                ))}
                                
                            </tbody>
                        </table>
                    </div>
                    <div style={{margin:'auto'}}>
                        <div>
                            <label>showing {totalCount === 0 ? 0 : offset + 1} to {offset + pageSize > totalCount ? totalCount : offset + pageSize} of {totalCount} orders detail</label>
                        </div>
                        <div style={{display:'inline-flex', marginBottom: '20px'}}>
                            <button disabled={page === 1 ? "disabled" : ""} onClick={() => prevPage()} className="btn btn-secondary">Prev</button>
                            <button disabled={page === Math.ceil(totalCount / pageSize) || (totalCount === 0) ? "disabled" : ""} onClick={() => nextPage()} className="btn btn-secondary">Next</button>
                        </div>
                    </div>
                </div> : <div><ReactBootStrap.Spinner animation='border' variant="success"/></div>}                         
        </div>
     </div>
    )
}
export default withRouter(OrderDetails);