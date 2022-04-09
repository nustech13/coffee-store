import { hover } from '@testing-library/user-event/dist/hover';
import React, { useState } from 'react';
import { Route, Link, useHistory} from "react-router-dom";
import './header.css';
    const menus = [
        {
            id:'1',
            name : 'Trang chủ',
            to : '/',
            exact : true
        },
        {
            id:'2',
            name: 'Liên hệ',
            to: '/lien-he',
            exact: false
        },
        {
            id:'3',
            name: 'Sản phẩm',
            to: '/san-pham/tat-ca',
            exact: false
        }
        
    ];
    function Header() {
            const history = useHistory();
            const [isActive, setIsActive] = useState('1');
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
                <div>
                <nav>
                    <input type="checkbox" id="check"/>
                    <label htmlFor="check" className="checkbtn">
                        <i className="fa fa-solid fa-align-justify"></i>
                    </label>
                    <label className="logo">COFFE HOUSE <i className="fa fa-coffee" aria-hidden="true"></i></label>
                    <ul className="nav-list">
                        {showMenus(menus)}
                        <li className='nav-item dropdown'><Link to={''} className='nav-link'>Nguyễn Minh Thuận <i className="fa fa-caret-down dropdown__caret"></i></Link>
                            <ul className="dropdown-list">
                                <li className="dropdown-item">Thông tin <i className="fa fa-info" aria-hidden="true"></i></li>
                                <li className="dropdown-item">Đăng Xuất <i className="fa fa-sign-out" aria-hidden="true"></i></li>
                            </ul>
                        </li>
                        <li className='nav-item'><Link to={''} className='nav-cart'><i className="fa fa-shopping-cart cart-item" aria-hidden="true"> : <label className="cart-count">100</label></i></Link></li>
                    </ul>
                </nav>
                </div>
                </section>         
            )        
    }
        
    
 export default Header;