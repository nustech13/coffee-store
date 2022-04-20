import React, { useEffect, useRef, useState, useCallback } from "react";
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {setAllProduct} from '../../../actions/product.js';
import PaginatedItems from "../../../components/Card/cardProduct.jsx";
import { withRouter } from "react-router";
import './product.css';
import Footer from '../../../components/Footer/footer.jsx';
import Loading from "../../../components/Loading/Loading.jsx";
import Header from "../../../components/Header/header.jsx";
function ListProduct(props){
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingChange, setIsLoadingChange] = useState(true);
    const [isActiveDrink, setActiveDrink] = useState(true);
    const [isActiveFood, setActiveFood] = useState(true);
    const [isActiveSort, setActiveSort] = useState(false);
    const [isActiveUp, setActiveUp] = useState(0);
    const dispatch = useDispatch();
    const [drinks, setDrinks] = useState([]);
    const [foods, setFoods] = useState([]);
    const [products, setProducts] = useState([]);
    const [id, setId] = useState("");
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [searchKey, setSearchKey] = useState("");
    const componentMounted = useRef(true);
    document.title = "Sản Phẩm";
    const getCategories = async () =>{
        const res = await axios.get('http://localhost:5000/v1/api/category/type/all');
        setDrinks(res.data.drinks);
        setFoods(res.data.foods);
    }
    const getProducts = useCallback(async (id) =>{
        try {
            setActiveUp(0);
            if(id === ""){
                if(search===""){
                    const res = await axios.get('http://localhost:5000/v1/api/product/');
                    dispatch(setAllProduct(res.data));
                    setProducts(res.data);
                }else{
                    const res = await axios.get('http://localhost:5000/v1/api/product/search/' + search);
                    dispatch(setAllProduct(res.data));
                    setProducts(res.data);
                    if(res.data.length < 1){
                        setError("Không có sản phẩm tìm kiếm");
                    }else{
                        setError("");
                    }
                }
            }
            else if(id === 'thuc-an' || id === 'thuc-uong'){
                const res = await axios.get('http://localhost:5000/v1/api/product/type/' + id);
                dispatch(setAllProduct(res.data));
                setProducts(res.data);
            }
            else{
                await axios.get('http://localhost:5000/v1/api/product/category/' + id)
                .then(res =>{
                    dispatch(setAllProduct(res.data));
                    setProducts(res.data);
                })
                .catch(err =>{
                    console.log(err);
                });
                
            }
            setIsLoading(true);
            setIsLoadingChange(true);
        } catch (error) {
            console.log(error);
        }
        
        
    }, [dispatch, search]);
    useEffect(()=>{
        if (componentMounted.current){
            getCategories();
            getProducts(id);
        }
        return () => {
            componentMounted.current = false;
        }
    }, [id, getProducts]);
    function removeAccents(str) {
        return str.normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }
    function getUrlName(name){
        return String(removeAccents(name)).toLowerCase().trim().replace(/ /g,"-");
    }
    function ChangeList(item){
        setSearchKey("");
        setId(item);
        setSearch("");
        setIsLoadingChange(false);
        getProducts(item);
    }
    function searchItem(){
        setSearchKey(search);
        setIsLoadingChange(false);
        setId("");
        getProducts(id);
    }
    function handleChange(e){
        setSearch(e.target.value);
    }
    function sortChange(str){
        dispatch(setAllProduct([]));
        if(str.localeCompare("up") === 0){
            var temp1 = products.sort((a,b) => ((a.price * (1 - a.sale/100)) > (b.price * (1 - b.sale/100))) ? 1 : ((b.price * (1 - b.sale/100)) > (a.price * (1 - a.sale/100))) ? -1 : 0);
            dispatch(setAllProduct(temp1));
            setActiveUp(1);
        }else if(str.localeCompare("down") === 0){
            var temp2 = products.sort((a,b) => ((a.price * (1 - a.sale/100)) < (b.price * (1 - b.sale/100))) ? 1 : ((b.price * (1 - b.sale/100)) < (a.price * (1 - a.sale/100))) ? -1 : 0);
            dispatch(setAllProduct(temp2));
            setActiveUp(-1);
        }else{
            dispatch(setAllProduct(products));
        }
        
    }
    return(
        <div>
            <Header isLinkActive={"san-pham"}/>
            {isLoading ? (
            <div>
                <div className="container list-product-container" style={{paddingTop: '100px', maxWidth: 1200}}>
                    {searchKey !== "" ? (<p style={{fontSize: '24px'}}>Tìm kiếm theo từ khóa: {searchKey}</p>) : (<p></p>)}
                        <div className="row" style={{paddingTop: '20px', marginLeft: '10px', marginRight: '10px'}}>
                            <div className="col-xs-12 col-sm-12 col-md-5 col-lg-3" style={{marginBottom: '20px'}}>
                                <div className="type-list">
                                    <p className="error">{error}</p>
                                    {id==="" ? (
                                        <div className='search'>
                                        <input type="text" className='search-input' value={search || ''} onKeyDown={(event) => {
                                            if (event.key === "Enter") {
                                                search.localeCompare("") ? searchItem() : setError("Ô tìm kiếm không để trống");
                                            }
                                        }} onChange={(e)=> handleChange(e)} placeholder="Nhập Tìm Kiếm"/>
                                        <button onClick={()=> {search.localeCompare("") ? searchItem() : setError("Ô tìm kiếm không để trống")}} className='search-btn'><i className="fa fa-search" aria-hidden="true"></i></button>
                                    </div>
                                    ) : (<></>)}
                                    <p className="category-list" onClick={()=> isActiveSort ? setActiveSort(false) : setActiveSort(true)}><i className="fa fa-sort" aria-hidden="true"></i> Sắp Xếp <i className="fa fa-caret-down dropdown__caret"></i></p>
                                    {isActiveSort ? (
                                        <div className="category-sort">
                                            <p className="sort-item" onClick={()=> sortChange("up")}><span className={isActiveUp === 1 ? "category-link category-active" : "category-link"}><i className="fa fa-sort-numeric-asc" aria-hidden="true"></i> Tăng Dần</span></p>
                                            <p className="sort-item" onClick={()=> sortChange("down")}><span className={isActiveUp === -1 ? "category-link category-active" : "category-link"}><i className="fa fa-sort-numeric-desc" aria-hidden="true"></i> Giảm Dần</span></p>
                                        </div>
                                    ) : (<></>)}
                                    <p className="category-list" onClick={() => ChangeList("")}><span className={("".localeCompare(id) === 0) ? "category-active" : "category-link"}><i className="fa fa-bars" aria-hidden="true"></i>   Tất Cả</span></p>
                                    <p className="category-list" onClick={()=> isActiveDrink ? setActiveDrink(false) : setActiveDrink(true)}><i className="fa fa-coffee"></i> Thức Uống <i className="fa fa-caret-down dropdown__caret"></i></p>
                                    {isActiveDrink ?
                                    (<div>
                                        <p className="category-item"><span className={("thuc-uong".localeCompare(String(id)) === 0) ? "category-link category-active" : "category-link"} onClick={() => ChangeList('thuc-uong')}><i className="fa fa-circle" aria-hidden="true"></i>  Tất Cả</span></p>
                                        {drinks?.map((item) => (
                                            <p className="category-item" key={item._id}><span className={(getUrlName(item.name).localeCompare(String(id)) === 0) ? "category-link category-active" : "category-link"} onClick={() => ChangeList(getUrlName(item.name))}><i className="fa fa-circle" aria-hidden="true"></i>  {item.name}</span></p>
                                        ))}
                                    </div>) : (<></>)}
                                    <p className="category-list" onClick={()=> isActiveFood ? setActiveFood(false) : setActiveFood(true)}><i className="fa fa-cutlery" aria-hidden="true"></i> Thức Ăn <i className="fa fa-caret-down dropdown__caret"></i></p>
                                    {isActiveFood ? 
                                    (<div>
                                        <p className="category-item"><span className={("thuc-an".localeCompare(String(id)) === 0) ? "category-link category-active" : "category-link"} onClick={() => ChangeList('thuc-an')}><i className="fa fa-circle" aria-hidden="true"></i>  Tất Cả</span></p>
                                        {foods?.map((item) => (
                                        <p className="category-item" key={item._id}><span className={(getUrlName(item.name).localeCompare(String(id)) === 0) ? "category-link category-active" : "category-link"} onClick={() => ChangeList(getUrlName(item.name))}><i className="fa fa-circle" aria-hidden="true"></i>  {item.name}</span></p>
                                    ))}
                                    </div>) : (<></>)}
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-7 col-lg-9">
                                <div className="row">
                                    {isLoadingChange ?  <PaginatedItems itemsPerPage={6} isActiveUp={isActiveUp}/> : <Loading/>}
                                   
                                </div>
                            </div>
                        </div>
                </div>
                <Footer/>
            </div>) : (
                <Loading/>
            )}
        </div>
    )
}

export default withRouter(ListProduct);