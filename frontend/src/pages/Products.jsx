import React, { useEffect, useRef, useState } from "react";
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {setAllProduct} from '../actions/product.js';
import Card from "../containers/Product/cardProduct.jsx";
import { withRouter } from "react-router";
import {useHistory, useLocation} from 'react-router-dom';
import './product.css';
import Footer from '../containers/Footer/footer.jsx';
import Loading from "../containers/Loading/Loading.jsx";
function ListProduct(props){
    const [isLoading, setIsLoading] = useState(false);
    const [isActiveDrink, setActiveDrink] = useState(true);
    const [isActiveFood, setActiveFood] = useState(true);
    const [isActiveSort, setActiveSort] = useState(false);
    const [isActiveUp, setActiveUp] = useState(0);
    const dispatch = useDispatch();
    const [drinks, setDrinks] = useState([]);
    const [foods, setFoods] = useState([]);
    const [products, setProducts] = useState([]);
    const [id, setId] = useState(props.match.params.id);
    const [error, setError] = useState("");
    let query = useQuery();
    const [search, setSearch] = query.get('name') === null ? useState("") : useState(query.get('name'));
    const history = useHistory();
    const componentMounted = useRef(true);
    document.title = "Sản Phẩm";
    const getCategories = async () =>{
        const res = await axios.get('http://localhost:5000/v1/api/category/type/all');
        setDrinks(res.data.drinks);
        setFoods(res.data.foods);
    }
    const getProducts = async (id) =>{
        if(id === "tat-ca"){
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
            setIsLoading(true);
        }
        else if(id === 'thuc-an' || id === 'thuc-uong'){
            const res = await axios.get('http://localhost:5000/v1/api/product/type/' + id);
            dispatch(setAllProduct(res.data));
            setProducts(res.data);
            setIsLoading(true);
        }
        else{
            const res = await axios.get('http://localhost:5000/v1/api/product/category/' + id);
            dispatch(setAllProduct(res.data.products));
            setProducts(res.data.products);
            setIsLoading(true);
            
        }
        setActiveUp(0);
        setSearch("");
    }
    useEffect(()=>{
        if (componentMounted.current){
            getCategories();
            getProducts(id);
        }
        return () => {
            componentMounted.current = false;
        }
    }, []);
    function useQuery() {
        const { search } = useLocation();
      
        return React.useMemo(() => new URLSearchParams(search), [search]);
      }
    function removeAccents(str) {
        return str.normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }
    function getUrlName(name){
        return new String(removeAccents(name)).toLowerCase().trim().replace(/ /g,"-");
    }
    function ChangeList(item){
        history.push(item);
        setIsLoading(false);
        getProducts(item);
    }
    function searchItem(){
        setIsLoading(false);
        history.push('/san-pham/tat-ca?name=' + search);
        getProducts(id);
    }
    function handleChange(e){
        setSearch(e.target.value);
    }
    function sortChange(str){
        dispatch(setAllProduct([]));
        if(str.localeCompare("up") === 0){
            var temp = products.sort((a,b) => ((a.price * (1 - a.sale/100)) > (b.price * (1 - b.sale/100))) ? 1 : ((b.price * (1 - b.sale/100)) > (a.price * (1 - a.sale/100))) ? -1 : 0);
            dispatch(setAllProduct(temp));
            setActiveUp(1);
        }else if(str.localeCompare("down") === 0){
            var temp = products.sort((a,b) => ((a.price * (1 - a.sale/100)) < (b.price * (1 - b.sale/100))) ? 1 : ((b.price * (1 - b.sale/100)) < (a.price * (1 - a.sale/100))) ? -1 : 0);
            dispatch(setAllProduct(temp));
            setActiveUp(-1);
        }else{
            dispatch(setAllProduct(products));
        }
        
    }
    return(
        <div>
            {isLoading ? (
            <div>
                <div className="container list-product-container" style={{paddingTop: '100px', maxWidth: 1200}}>
                    {query.get('name') !== null ? (<p style={{fontSize: '24px'}}>Tìm kiếm theo từ khóa: {query.get('name')}</p>) : (<p></p>)}
                        <div className="row" style={{paddingTop: '20px', marginLeft: '10px', marginRight: '10px'}}>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3" style={{marginBottom: '20px'}}>
                                <div className="type-list">
                                    <p className="error">{error}</p>
                                    <div className='search'>
                                        <input type="text" className='search-input' onKeyDown={(event) => {
                                            if (event.key === "Enter") {
                                                search.localeCompare("") ? searchItem() : setError("Ô tìm kiếm không để trống");
                                            }
                                        }} onChange={(e)=> handleChange(e)} placeholder="Nhập Tìm Kiếm"/>
                                        <button onClick={()=> {search.localeCompare("") ? searchItem() : setError("Ô tìm kiếm không để trống")}} className='search-btn'><i className="fa fa-search" aria-hidden="true"></i></button>
                                    </div>
                                    <p className="category-list" onClick={()=> isActiveSort ? setActiveSort(false) : setActiveSort(true)}><i className="fa fa-sort" aria-hidden="true"></i> Sắp Xếp <i className="fa fa-caret-down dropdown__caret"></i></p>
                                    {isActiveSort ? (
                                        <div className="category-sort">
                                            <p className="sort-item" onClick={()=> sortChange("up")}><span className={isActiveUp === 1 ? "category-link category-active" : "category-link"}><i className="fa fa-sort-numeric-asc" aria-hidden="true"></i> Tăng Dần</span></p>
                                            <p className="sort-item" onClick={()=> sortChange("down")}><span className={isActiveUp === -1 ? "category-link category-active" : "category-link"}><i className="fa fa-sort-numeric-desc" aria-hidden="true"></i> Giảm Dần</span></p>
                                        </div>
                                    ) : (<></>)}
                                    <p className="category-list" onClick={() => ChangeList('tat-ca')}><span className={("tat-ca".localeCompare(new String(props.match.params.id)) === 0) ? "category-active" : "category-link"}><i className="fa fa-bars" aria-hidden="true"></i>   Tất Cả</span></p>
                                    <p className="category-list" onClick={()=> isActiveDrink ? setActiveDrink(false) : setActiveDrink(true)}><i className="fa fa-coffee"></i> Thức Uống <i className="fa fa-caret-down dropdown__caret"></i></p>
                                    {isActiveDrink ?
                                    (<div>
                                        <p className="category-item"><span className={("thuc-uong".localeCompare(new String(props.match.params.id)) === 0) ? "category-link category-active" : "category-link"} onClick={() => ChangeList('thuc-uong')}><i className="fa fa-circle" aria-hidden="true"></i>  Tất Cả</span></p>
                                        {drinks?.map((item) => (
                                            <p className="category-item" key={item._id}><span className={(getUrlName(item.name).localeCompare(new String(props.match.params.id)) === 0) ? "category-link category-active" : "category-link"} onClick={() => ChangeList(getUrlName(item.name))}><i className="fa fa-circle" aria-hidden="true"></i>  {item.name}</span></p>
                                        ))}
                                    </div>) : (<></>)}
                                    <p className="category-list" onClick={()=> isActiveFood ? setActiveFood(false) : setActiveFood(true)}><i className="fa fa-cutlery" aria-hidden="true"></i> Thức Ăn <i className="fa fa-caret-down dropdown__caret"></i></p>
                                    {isActiveFood ? 
                                    (<div>
                                        <p className="category-item"><span className={("thuc-an".localeCompare(new String(props.match.params.id)) === 0) ? "category-link category-active" : "category-link"} onClick={() => ChangeList('thuc-an')}><i className="fa fa-circle" aria-hidden="true"></i>  Tất Cả</span></p>
                                        {foods?.map((item) => (
                                        <p className="category-item" key={item._id}><span className={(getUrlName(item.name).localeCompare(new String(props.match.params.id)) === 0) ? "category-link category-active" : "category-link"} onClick={() => ChangeList(getUrlName(item.name))}><i className="fa fa-circle" aria-hidden="true"></i>  {item.name}</span></p>
                                    ))}
                                    </div>) : (<></>)}
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-9">
                                <div className="row">
                                    <Card/>
                                    <p>{props.match.params.id}</p>
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