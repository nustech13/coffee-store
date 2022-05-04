import React, { useEffect, useState, useCallback  } from "react";
import axios from "axios";
import Navigation from "../../../components/Navigation/navigation";
import { withRouter } from "react-router";
import './feedbacks.css';
import * as moment from 'moment';
import * as ReactBootStrap from 'react-bootstrap';
const Feedbacks = (props) => {
    document.title = "Category";
    const [page, setPage] = useState(1);
    const [pageSize] = useState(6);
    const [totalCount, setTotalCount] = useState(0);
    const [offset, setOffset] = useState(0);
    const [feedbacks, setfeedbacks] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const getfeedbacks = useCallback(async (pg = page, pgSize = pageSize) =>{
        const params = {
            page: pg,
            pageSize: pgSize,
        }
        try {
            const res = await axios.post('http://localhost:5000/v1/api/feedback/product/' + props.match.params.id, params);
            if(res.data){
                setfeedbacks(res.data.feedbacks);
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
        if(mounted) {getfeedbacks();}
        return () => mounted = false;
    }, [getfeedbacks]);

    const prevPage = async () =>{
        const pg = page === 1 ? 1 : page - 1;
        getfeedbacks(pg);
        setPage(pg);
    }
    
    const nextPage = async () =>{
        const pg = page < Math.ceil(totalCount / pageSize) ? page + 1 : page;
        getfeedbacks(pg);
        setPage(pg);
    }
    const deleteFeedback = async (id) =>{
        if(window.confirm("Bạn có đồng ý xóa không??")){
            await axios.delete('http://localhost:5000/v1/api/feedback/' + id)
            .then(response => {
                setPage(1);
                alert("Xóa thành công!");
                getfeedbacks(page);
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
            <h2>QUẢN LÝ FEEDBACK</h2>
                {loading ?
                <div> 
                    <div>
                        <table className="table">
                            <tbody>
                                <tr style={{background:'rgb(145, 230, 230)'}}>
                                    <th scope="col">CUSTOMER NAME</th>
                                    <th scope="col">EMAIL</th>
                                    <th scope="col">CONTENT</th>
                                    <th scope="col">DATE</th>
                                    <th scope="col">ACTION</th>
                                </tr>
                                {feedbacks && feedbacks.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.content}</td>
                                        <td>{moment(item.createdAt).format("HH:mm DD/MM/YYYY")}</td>   
                                        <td><button onClick={() => deleteFeedback(item._id)} className="btn btn-danger" style={{margin:'auto'}}><i className="fa fa-trash" aria-hidden="true"></i></button></td>
                                    </tr>
                                ))}
                                
                            </tbody>
                        </table>
                    </div>
                    <div style={{margin:'auto'}}>
                        <div>
                            <label>showing {totalCount === 0 ? 0 : offset + 1} to {offset + pageSize > totalCount ? totalCount : offset + pageSize} of {totalCount} feedbacks</label>
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
export default withRouter(Feedbacks);