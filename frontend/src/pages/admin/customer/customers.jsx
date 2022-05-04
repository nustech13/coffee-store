import React, { useEffect, useState, useCallback  } from "react";
import axios from "axios";
import Navigation from "../../../components/Navigation/navigation";
import './customers.css';
import * as ReactBootStrap from 'react-bootstrap';
const Customers = () => {
    document.title = "Customer";
    const [page, setPage] = useState(1);
    const [pageSize] = useState(3);
    const [totalCount, setTotalCount] = useState(0);
    const [offset, setOffset] = useState(0);
    const [customers, setcustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const getcustomers = useCallback(async (pg = page, pgSize = pageSize) =>{
        const params = {
            page: pg,
            pageSize: pgSize,
        }
        try {
            const res = await axios.post('http://localhost:5000/v1/api/customer/', params);
            if(res.data){
                setcustomers(res.data.customers);
                setTotalCount(res.data.numberOfResult);    
                setOffset(res.data.offset);
                setTimeout(() => {
                    setLoading(true);         
                }, 1000);
            }
        } catch (error) {
            console.log("Call API Products Error:", error);
        }
        
    }, [page, pageSize])
    
    useEffect(() =>{
        let mounted = true;
        if(mounted) {getcustomers();}
        return () => mounted = false;
    }, [getcustomers]);

    const prevPage = async () =>{
        const pg = page === 1 ? 1 : page - 1;
        getcustomers(pg);
        setPage(pg);
    }
    const nextPage = async () =>{
        const pg = page < Math.ceil(totalCount / pageSize) ? page + 1 : page;
        getcustomers(pg);
        setPage(pg);
    }
    const deleteCustomer = async (id) =>{
        if(window.confirm("Bạn có đồng ý xóa không??")){
            await axios.delete('http://localhost:5000/v1/api/customer/' + id)
            .then(response => {
                setPage(1);
                alert("Xóa khách hàng thành công!");
                getcustomers(page);
            })
            .catch(error => {
                console.log(error);
                alert("Lỗi Server");
            })
        }else{
            alert("Xóa thất bại!");
        }
    }
    
    return(
      <div>
        <Navigation/>    
        <div className="boxed-category">
            <h2>QUẢN LÝ CUSTOMER</h2>
                {loading ?
                <div> 
                    <div>
                        <table className="table">
                            <tbody>
                                <tr style={{background:'rgb(145, 230, 230)'}}>
                                    <th scope="col">NAME</th>
                                    <th scope="col">EMAIL</th>
                                    <th scope="col">PHONE</th>
                                    <th scope="col">ACTION</th>
                                </tr>
                                {customers && customers.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>   
                                        <td><button onClick={() => deleteCustomer(item._id)} className="btn btn-danger" style={{margin:'auto'}}><i className="fa fa-trash" aria-hidden="true"></i></button></td>
                                    </tr>
                                ))}
                                
                            </tbody>
                        </table>
                    </div>
                    <div style={{margin:'auto'}}>
                        <div>
                            <label>showing {totalCount === 0 ? 0 : offset + 1} to {offset + pageSize > totalCount ? totalCount : offset + pageSize} of {totalCount} customers</label>
                        </div>
                        <div style={{display:'inline-flex'}}>
                            <button disabled={page === 1 ? "disabled" : ""} onClick={() => prevPage()} className="btn btn-secondary">Prev</button>
                            <button disabled={page === Math.ceil(totalCount / pageSize) || (totalCount === 0) ? "disabled" : ""} onClick={() => nextPage()} className="btn btn-secondary">Next</button>
                        </div>
                    </div>
                </div> : <div><ReactBootStrap.Spinner animation='border' variant="success"/></div>}                         
        </div>
     </div>
    )
}
export default Customers;