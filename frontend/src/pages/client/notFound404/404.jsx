import React from "react";
import { Link } from "react-router-dom";
import './404.css';
function NotFound404(){
    document.title = '404 - Page Not Found';
    return(
        <div className="container" style={{textAlign: 'center'}}>
                <div className="img-404">
                    <img src="/assets/404.png" alt="" />
                </div>
                <h2>Trang bạn tìm hiện không tìm thấy vui lòng trở lại trang chủ để thực hiện các dịch vụ tiếp tục</h2>
                <Link to = {""} className="link-back"><h3>Quay Lại Trang Chủ</h3></Link>
        </div>
    )
} 

export default NotFound404;