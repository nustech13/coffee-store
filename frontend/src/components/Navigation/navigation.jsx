import React , {useState} from 'react';
import './navigation.css';
import { useHistory } from 'react-router-dom';
import {Redirect, withRouter} from "react-router";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const Navigation = () =>{
    const history = useHistory();
    const [isToggleActive, setIsToggleActive] = useState(false);
    const [isNavigationActive, setIsNavigationActive] = useState(false);
    return(
        <div>
            {cookies.get('admin') ?
            <div className={isNavigationActive ? "navigation active" : "navigation"}>
                <ul>
                    <li onClick={()=> history.push('/')}><i className="fa fa-home" aria-hidden="true"></i> <span>Home</span></li>
                    <li onClick={()=> history.push('/admin/category')}><i className="fa fa-list-alt" aria-hidden="true"></i> <span>Category</span></li>
                    <li onClick={()=> history.push('/admin/product')}><i className="fa fa-product-hunt" aria-hidden="true"></i> <span>Prodcut</span></li>
                    <li onClick={()=> history.push('/admin/order')}><i className="fa fa-shopping-cart" aria-hidden="true"></i> <span>Order</span></li>
                    <li onClick={()=> history.push('/admin/customer')}><i className="fa fa-user-circle-o" aria-hidden="true"></i> <span>Customer</span></li>
                    <li onClick={()=> {cookies.remove('admin');history.push('/admin/login')}}><i className="fa fa-sign-out" aria-hidden="true"></i> <span>Logout</span></li>
                </ul>
                <div className={isToggleActive ? "toggle active" : "toggle"} onClick={()=> isToggleActive ? (setIsToggleActive(false), setIsNavigationActive(false)) : (setIsToggleActive(true), setIsNavigationActive(true))}></div>
            </div> : <Redirect to={{pathname: "/admin/login"}}/>}
        </div>
    )
}
export default withRouter(Navigation);