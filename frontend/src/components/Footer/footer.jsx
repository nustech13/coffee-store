import React from 'react';
import './footer.css'
import {Row, Col, Container} from 'react-bootstrap';
function Footer(){
    return(
        <div className='footer'>
                <Container>
                    <Row>
                        <Col>
                            <div>
                                <div>
                                    <h6>COFFE HOUSE</h6>
                                </div>
                                <div>
                                    <ul className='infor' style={{listStyle:'none'}}>
                                        <li className='infor-item'>Địa chỉ: 97 Man Thiện, Hiệp Phú, Thủ Đức, Hồ Chí Minh</li>
                                        <li className='infor-item'>Điện thoại: (024) 35737348 - Fax: (024) 35737347</li>
                                        <li className='infor-item'>Bộ phận tư vấn khách hàng: Hotline: 1900 6750 - Email: support@bonq.vn</li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <div>
                                    <h6>INFORMATION</h6>
                                </div>
                                <div>
                                    <ul className='infor' style={{listStyle:'none'}}>
                                        <li className='infor-item'>Developer: Nguyễn Minh Thuận</li>
                                        <li className='infor-item'>Điện thoại: 0367840318</li>
                                        <li className='infor-item'>Email: nguyenminhthuan24420@gmail.com</li>
                                        <li className='infor-item'>©2022 Design By MinhThuan </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            
        </div>
    )
    
        
    
}
export default Footer;
