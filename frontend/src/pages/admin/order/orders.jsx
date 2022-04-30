import React, { useEffect, useState, useCallback  } from "react";
import axios from "axios";
import Navigation from "../../../components/Navigation/navigation";
import * as moment from 'moment';
import './orders.css';
import * as ReactBootStrap from 'react-bootstrap';
const Orders = () => {
    document.title = "Order";
    const [page, setPage] = useState(1);
    const [pageSize] = useState(3);
    const [totalCount, setTotalCount] = useState(0);
    const [offset, setOffset] = useState(0);
    const [orders, setOrders] = useState([]);
    const [keySearch, setKeySearch] = useState("");
    const [loading, setLoading] = useState(false);
    
    const getOrders = useCallback(async (pg = page, pgSize = pageSize, status = keySearch) =>{
        const params = {
            page: pg,
            pageSize: pgSize,
            status: status
        }
        if(keySearch === ""){
            try {
                const res = await axios.post('http://localhost:5000/v1/api/order/', params);
                if(res.data){
                    setOrders(res.data.orders);
                    setTotalCount(res.data.numberOfResult);    
                    setOffset(res.data.offset);
                    setTimeout(() => {
                        setLoading(true);         
                    }, 1000);
                }
            } catch (error) {
                console.log("Call API Products Error:", error);
            }
        }else{
            try {
                const res = await axios.post('http://localhost:5000/v1/api/order/status', params);
                if(res.data){
                    setOrders(res.data.orders);
                    setTotalCount(res.data.numberOfResult);    
                    setOffset(res.data.offset);
                    setTimeout(() => {
                        setLoading(true);         
                    }, 1000);     
                }
            } catch (error) {
                console.log("Call API Products Error:", error);
            }
        }
        
    }, [keySearch, page, pageSize])
    
    useEffect(() =>{
        let mounted = true;
        if(mounted) {getOrders();}
        return () => mounted = false;
    }, [getOrders]);

    const prevPage = async () =>{
        const pg = page === 1 ? 1 : page - 1;
        getOrders(pg);
        setPage(pg);
    }
    const nextPage = async () =>{
        const pg = page < Math.ceil(totalCount / pageSize) ? page + 1 : page;
        getOrders(pg);
        setPage(pg);
    }
    const deleteOrder = async (id) =>{
        if(window.confirm("Bạn có đồng ý xóa không??")){
            await axios.delete('http://localhost:5000/v1/api/order/' + id)
            .then(response => {
                console.log(response);
                alert("Xóa loại sản phẩm thành công!");
                getOrders(page);
            })
            .catch(error => {
                console.log(error);
                alert("Lỗi Server");
            })
        }else{
            alert("Xóa thất bại!");
        }
    }
    const handleChange = async (changeObject) => {
        setKeySearch(changeObject);
    }
    const changeStatus = (order) =>{
        if(order.status){
            order.status = false;
        }else{
            order.status = true;
        }
        axios.put('http://localhost:5000/v1/api/order/' + order._id, order)
        .then(response => {
            alert("Cập nhật đơn hàng thành công!");
            getOrders(page);
        })
        .catch(error => {
            console.log(error);
            alert("Lỗi Server");
        })
    }
    return(
      <div>
        <Navigation/>    
        <div className="boxed-order">
            <h2>QUẢN LÝ ORDER</h2>
            <div style={{display:'flex'}}>
                    <div style={{paddingTop:25, paddingBottom: 25}}>
                        <label>status:</label>
                    </div>
                    <div style={{paddingTop:20, paddingBottom: 20, paddingLeft:10}}>
                        <select className="form-select" aria-label="Default select example"
                            name="status"
                            id="status"
                            value={keySearch}
                            onChange={(e) => {handleChange(e.target.value); setPage(1); setLoading(false)}}
                        >
                            <option value={""}>Tất Cả</option>
                            <option value={true}>Đã Giao</option>
                            <option value={false}>Chưa Giao</option>
                        </select>
                    </div>
                </div>
                {loading ?
                <div> 
                    <div>
                        <table className="table">
                            <tbody>
                                <tr style={{background:'rgb(145, 230, 230)'}}>
                                    <th scope="col">CUTOMER NAME</th>
                                    <th scope="col">PHONE</th>
                                    <th scope="col">ADDRESS</th>
                                    <th scope="col">DATE</th>
                                    <th scope="col">STATUS</th>
                                    <th scope="col">TOTAL</th>
                                    <th scope="col">ACTION</th>
                                </tr>
                                {orders && orders.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.customerName}</td>
                                        <td>{item.customerPhone}</td>
                                        <td>{item.customerAddress}</td>
                                        <td>{moment(item.createdAt).format("HH:mm DD/MM/YYYY")}</td>
                                        <td>{item.status ? <button className="btn btn-success" onClick={() => changeStatus(item)}>Đã Giao</button> : <button onClick={() => changeStatus(item)} className="btn btn-warning">Chưa giao</button>}</td> 
                                        <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.total)}</td> 
                                        <td>
                                            <button onClick={() => deleteOrder(item._id)} className="btn btn-primary" style={{margin:'auto 10px'}}><i className="fa fa-eye" aria-hidden="true"></i></button>
                                            <button onClick={() => deleteOrder(item._id)} className="btn btn-danger" style={{margin:'auto'}}><i className="fa fa-trash" aria-hidden="true"></i></button>
                                        </td>
                                    </tr>
                                ))}
                                
                            </tbody>
                        </table>
                    </div>
                    <div style={{margin:'auto'}}>
                        <div>
                            <label>showing {totalCount === 0 ? 0 : offset + 1} to {offset + pageSize > totalCount ? totalCount : offset + pageSize} of {totalCount} orders</label>
                        </div>
                        <div style={{display:'inline-flex'}}>
                            <button disabled={page === 1 ? "disabled" : ""} onClick={() => prevPage()} className="btn btn-secondary">Prev</button>
                            <button disabled={page === Math.ceil(totalCount / pageSize) ? "disabled" : ""} onClick={() => nextPage()} className="btn btn-secondary">Next</button>
                        </div>
                    </div>
                </div> : <div><ReactBootStrap.Spinner animation='border' variant="success"/></div>}                         
        </div>
     </div>
    )
}
export default Orders;