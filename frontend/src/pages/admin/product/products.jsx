import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Navigation from "../../../components/Navigation/navigation";
import { Link } from "react-router-dom";
import * as ReactBootStrap from 'react-bootstrap';
import './products.css';
const Products = () => {
    document.title = "Product";
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [offset, setOffset] = useState(0);
    const [categories, setCategories] = useState([]);
    const [keySearch, setKeySearch] = useState('');
    const [loading, setLoading] = useState(false);
    
    const getCategories = useCallback(async () =>{
        try {
            const res = await axios.get('http://localhost:5000/v1/api/category/');
            if(res.data){
                setCategories(res.data);           
            }
        } catch (error) {
            console.log("Call API Products Error:", error);
        }
    }, [])
    const getProducts = useCallback(async (pg = page, pgSize = pageSize, cateID = keySearch) =>{
        const params = {
            page: pg,
            pageSize: pgSize,
            id : cateID
        }
        if(keySearch===""){
            try {
                const res = await axios.post('http://localhost:5000/v1/api/product/', params);
                if(res.data){
                    setProducts(res.data.products);
                    setTotalCount(res.data.numberOfResult);    
                    setOffset(res.data.offset);    
                    setLoading(true);        
                }
            } catch (error) {
                console.log("Call API Products Error:", error);
            }
        }else{
            try {
                const res = await axios.post('http://localhost:5000/v1/api/product/category/', params);
                if(res.data){
                    setProducts(res.data.products);
                    setTotalCount(res.data.numberOfResult);    
                    setOffset(res.data.offset); 
                    setLoading(true);                    
                }
            } catch (error) {
                console.log("Call API Products Error:", error);
            }
        }
        
    }, [keySearch, page, pageSize]);

    useEffect(() =>{
        let mounted = true;
        if(mounted) {getCategories(); getProducts();}
        return () => mounted = false;
    }, [getProducts, getCategories]);
    const prevPage = async () =>{
        const pg = page === 1 ? 1 : page - 1;
        getProducts(pg);
        setPage(pg);
    }
    const nextPage = async () =>{
        const pg = page < Math.ceil(totalCount / pageSize) ? page + 1 : page;
        getProducts(pg);
        setPage(pg);
    }
    const deleteProduct = async (id) =>{
        if(window.confirm("Có đồng ý xóa không?")){
            await axios.delete('http://localhost:5000/v1/api/product/' + id)
            .then(response => {
                setLoading(false);
                alert("Xóa sản phẩm thành công!");
                getProducts(page);
            })
            .catch(error => {
                console.log(error);
                alert("Lỗi Server");
            })
        }else{
            alert("Xóa thất bại");
        }
        
    }
    
    const handleChange = (changeObject) => {
        setKeySearch(changeObject);
    }
    return(
      <div>
        <Navigation/>
        <div className="boxed-product">
            <h2>QUẢN LÝ PRODUCT</h2>
            <div>
                <div style={{display:'flex'}}>
                    <div style={{paddingTop:25, paddingBottom: 25}}>
                        <label>Categories:</label>
                    </div>
                    <div style={{paddingTop:20, paddingBottom: 20, paddingLeft:10}}>
                        <select className="form-select" aria-label="Default select example"
                            name="categories"
                            id="categories"
                            value={keySearch}
                            onChange={(e) => {handleChange(e.target.value); setLoading(false); setPage(1)}}
                        >
                            <option value={""}>Tất Cả</option>
                            {categories.map((item) =>(
                              <option key={item._id} value={item._id}>
                              {item.name}
                            </option>
                            ))}
                        </select>
                    </div>
                    <div style={{paddingTop:20, paddingBottom: 20, paddingLeft:10}}>
                        <Link className="btn btn-success" to={'/admin/addProduct'} style={{textDecoration: 'none'}}>Add New</Link>
                    </div>
                </div>
                {loading ?
                <div>
                    <div>
                        <table className="table">
                            <tbody>
                                <tr style={{background:'rgb(145, 230, 230)'}}>
                                    <th scope="col">NAME</th>
                                    <th scope="col">IMAGE</th>
                                    <th scope="col">PRICE</th>
                                    <th scope="col">SALE</th>
                                    <th scope="col">DESCRIPTION</th>
                                    <th scope="col">CATEGORY</th>
                                    <th scope="col">ACTION</th>
                                </tr>
                                {products.map((item) => (
                                    
                                    <tr key={item._id}>
                                        <td>{item.name}</td>
                                        <td><img src={item.image} style={{height:100, width:150}} alt={""} /></td>
                                        <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseInt(item.price))}</td>
                                        <td>{item.sale + ' %'}</td>
                                        <td>{item.description}</td>
                                        <td>{item.categories.name}</td>
                                        <td><div style={{textAlign:'center'}}>
                                            <Link to={"/admin/editProduct/" + item._id} className="btn btn-warning" style={{textDecoration: 'none', marginRight: '20px'}}>Edit</Link>
                                            <button onClick={() => {deleteProduct(item._id)}} className="btn btn-danger" style={{margin:'auto'}}>Delete</button>
                                        </div></td>
                                    </tr>
                                ))}
                                
                            </tbody>
                        </table>
                    </div>
                    <div style={{margin:'auto'}}>
                        <div>
                            <label>showing {totalCount === 0 ? 0 : offset + 1} to {offset + pageSize > totalCount ? totalCount : offset + pageSize} of {totalCount} Products</label>
                        </div>
                        <div style={{display:'inline-flex', marginBottom: '20px'}}>
                            <button disabled={page === 1 ? "disabled" : ""} onClick={() => {prevPage(); setLoading(false);}} className="btn btn-secondary">Prev</button>
                            <button disabled={page === Math.ceil(totalCount / pageSize) ? "disabled" : ""} onClick={() => {nextPage(); setLoading(false);}} className="btn btn-secondary">Next</button>
                        </div>
                    </div>
                </div> : <div><ReactBootStrap.Spinner animation='border' variant="success"/></div>}
            </div>
        </div>
     </div>
    )
}
export default Products;