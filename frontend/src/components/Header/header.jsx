import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Link, useHistory} from "react-router-dom";
import Cookies from 'universal-cookie';
import './header.css';
    const cookies = new Cookies();
    const menus = [
        {
            id:'trang-chu',
            name : 'Trang chủ',
            to : '/',
            exact : true
        },
        {
            id:'lien-he',
            name: 'Liên hệ',
            to: '/lien-he',
            exact: false
        },
        {
            id:'san-pham',
            name: 'Sản phẩm',
            to: '/san-pham/',
            exact: false
        }
        
    ];
    function Header({isLinkActive}) {
            const { cart } = useSelector(state => state.cart);
            const history = useHistory();
            const [isActive, setIsActive] = useState(isLinkActive);
            const MenuLink = ({
                label,
                to,
                activeOnlyWhenExact,
                className
            }) => {
                return (
                    <Route 
                        path={to}
                        exact={activeOnlyWhenExact}
                        children={ () => {
                            return (
                                <Link to={to} className={className} >{label}</Link>
                            );
                        }}
                    />
                );
            }
            const showMenus = (menus) => {
                var result = null;
        
                if (menus.length > 0) {
                    result = menus.map((menu) => {
                        return (
                                <li key={menu.id} onClick={()=>{history.push(menu.to); setIsActive(menu.id)}} className='nav-item'>
                                    <MenuLink
                                    label={menu.name} 
                                    to={menu.to} 
                                    activeOnlyWhenExact={menu.exact}
                                    className={(isActive.localeCompare(menu.id) === 0) ? "nav-link nav-link-active" : "nav-link"}
                                    />
                                </li>    
                            
                        );
                    });
                }
        
                return result;
            }
            return (
                <section>
                    <nav>
                        <input type="checkbox" id="check"/>
                        <label htmlFor="check" className="checkbtn">
                            <i className="fa fa-solid fa-align-justify"></i>
                        </label>
                        <label className="logo">COFFEE HOUSE <i className="fa fa-coffee" aria-hidden="true"></i></label>
                        <ul className="nav-list">
                            {showMenus(menus)}
                            {cookies.get('customer') ?
                            (<li className='nav-item dropdown'><Link to={'/dang-nhap'} className='nav-link'>{cookies.get('customer').name} <i className="fa fa-caret-down dropdown__caret"></i></Link>
                                <ul className="dropdown-list">
                                    <li className="dropdown-item" onClick={() => {cookies.remove('customer'); history.push('/')}}>Đăng Xuất <i className="fa fa-sign-out" aria-hidden="true"></i></li>
                                </ul>
                            </li>) : (<li className='nav-item'><Link to={'/dang-nhap'} className={(isActive.localeCompare("dang-nhap") === 0) ? "nav-link nav-link-active" : "nav-link"}>Đăng Nhập</Link></li>)}
                            <li className='nav-item'><Link to={'/gio-hang'} className='nav-cart'><i className="fa fa-shopping-cart cart-item" aria-hidden="true"> : <label className="cart-count">{cart.length}</label></i></Link></li>
                        </ul>
                    </nav>
                </section>         
            )        
    }
        
    
 export default Header;