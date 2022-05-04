import React, { useEffect, useState, useCallback  } from "react";
import axios from "axios";
import Navigation from "../../../components/Navigation/navigation";
import './categories.css';
import * as ReactBootStrap from 'react-bootstrap';
import AddCategory from "./addCategory";
import EditCategory from "./editCategory";
const Categories = () => {
    document.title = "Category";
    const [types, setTypes] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(6);
    const [totalCount, setTotalCount] = useState(0);
    const [offset, setOffset] = useState(0);
    const [categories, setCategories] = useState([]);
    const [keySearch, setKeySearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [isAddActive, setIsAddActive] = useState(false);
    const [isEditActive, setIsEditActive] = useState(false);
    const [category, setCategory] = useState({});
    const getTypes = async () =>{
        try {
            const res = await axios.get('http://localhost:5000/v1/api/type/');
            if(res.data){
                setTypes(res.data);           
            }
        } catch (error) {
            console.log("Call API Products Error:", error);
        }
    }
    const getCategories = useCallback(async (pg = page, pgSize = pageSize, cateID = keySearch) =>{
        const params = {
            page: pg,
            pageSize: pgSize,
            id : cateID
        }
        if(keySearch===""){
            try {
                const res = await axios.post('http://localhost:5000/v1/api/category/', params);
                if(res.data){
                    setCategories(res.data.categories);
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
                const res = await axios.post('http://localhost:5000/v1/api/category/type/', params);
                if(res.data){
                    setCategories(res.data.categories);
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
        if(mounted) {getCategories(); getTypes();}
        return () => mounted = false;
    }, [getCategories]);

    const prevPage = async () =>{
        const pg = page === 1 ? 1 : page - 1;
        getCategories(pg);
        setPage(pg);
    }
    const nextPage = async () =>{
        const pg = page < Math.ceil(totalCount / pageSize) ? page + 1 : page;
        getCategories(pg);
        setPage(pg);
    }
    const deleteCategory = async (id) =>{
        if(window.confirm("Bạn có đồng ý xóa không??")){
            await axios.delete('http://localhost:5000/v1/api/category/' + id)
            .then(response => {
                setPage(1);
                alert("Xóa loại sản phẩm thành công!");
                getCategories(page);
            })
            .catch(error => {
                console.log(error);
                alert("Lỗi Server");
            })
        }else{
            alert("Xóa thất bại!");
        }
    }
    const handleChange = (changeObject) => {
        setKeySearch(changeObject);
    }
    
    return(
      <div>
        {isAddActive ? <AddCategory setIsAddActive={setIsAddActive} getCategories={getCategories} setLoading={setLoading} setPage={setPage}/> : <></>}
        {isEditActive ? <EditCategory setIsEditActive={setIsEditActive} getCategories={getCategories} setLoading={setLoading} category={category} setPage={setPage}/> : <></>}
        <Navigation/>    
        <div className="boxed-category">
            <h2>QUẢN LÝ CATEGORY</h2>
            <div style={{display:'flex'}}>
                    <div style={{paddingTop:25, paddingBottom: 25}}>
                        <label>Categories:</label>
                    </div>
                    <div style={{paddingTop:20, paddingBottom: 20, paddingLeft:10}}>
                        <select className="form-select" aria-label="Default select example"
                            name="categories"
                            id="categories"
                            value={keySearch}
                            onChange={(e) => {handleChange(e.target.value); setPage(1); setLoading(false)}}
                        >
                            <option value={""}>Tất Cả</option>
                            {types.map((item) =>(
                              <option key={item._id} value={item._id}>
                              {item.name}
                            </option>
                            ))}
                        </select>
                    </div>
                    <div style={{paddingTop:20, paddingBottom: 20, paddingLeft:10}}>
                        <button className="btn btn-success" onClick={()=> setIsAddActive(true)}>Add New</button>
                    </div>
                </div>
                {loading ?
                <div> 
                    <div>
                        <table className="table">
                            <tbody>
                                <tr style={{background:'rgb(145, 230, 230)'}}>
                                    <th scope="col">NAME</th>
                                    <th scope="col">TYPE</th>
                                    <th scope="col">ACTION</th>
                                </tr>
                                {categories.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.name}</td>
                                        <td>{item.type.name}</td>   
                                        <td><div style={{textAlign:'center'}}>
                                            <button onClick={() => {setCategory(item); setIsEditActive(true)}} className="btn btn-warning" style={{margin: '0 20px'}}><i className="fa fa-pencil" aria-hidden="true"></i></button>
                                            <button onClick={() => deleteCategory(item._id)} className="btn btn-danger" style={{margin:'auto'}}><i className="fa fa-trash" aria-hidden="true"></i></button>
                                        </div></td>
                                    </tr>
                                ))}
                                
                            </tbody>
                        </table>
                    </div>
                    <div style={{margin:'auto'}}>
                        <div>
                            <label>showing {totalCount === 0 ? 0 : offset + 1} to {offset + pageSize > totalCount ? totalCount : offset + pageSize} of {totalCount} Categories</label>
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
export default Categories;