import React, {useState} from "react";
import { Carousel } from 'react-bootstrap';
import './home.css';
import { Link } from 'react-router-dom';
import Footer from "../../../components/Footer/footer";
import Header from "../../../components/Header/header";
function Home(){
    const [index, setIndex] = useState(0);
    document.title = "Trang chủ";  
    const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
    };
  
    return (
      <div>
        <Header isLinkActive={"trang-chu"}/>
        <div className="wrapper">
          <div className="slide-show" style={{margin:'0 auto'}}>
          <Carousel fade activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item interval={3000}>
              <img
                className="d-block w-100"
                src="/assets/w3.jpg"
                alt="First slide"
                height={600}
              />
              <Carousel.Caption>
                <h3>Thức Uống Thơm Ngon</h3>
                <p>Đa dạng mọi đồ uống với nhiều hương vị đặc biệt.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={3000}>
              <img
                className="d-block w-100"
                src="/assets/w4.jpg"
                alt="Second slide"
                height={600}
              />
      
              <Carousel.Caption>
                <h3>Không Giang Rộng Rãi</h3>
                <p>Không gian rộng rãi thoáng mát đầy đủ tiện nghi.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/assets/w1.jpg"
                alt="Third slide"
                height={600}
              />
      
              <Carousel.Caption>
                <h3>Thức Ăn Đa Dạng</h3>
                <p>
                  Nhiều loại bánh và các món đa dạng thơm ngon.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          </div>
          <div className="container" style={{maxWidth: 1440}}>
                <div className="layout">
                    <div className="layout-item">
                        <Link to={'/san-pham/'} className="link-img"><img src="https://1.bp.blogspot.com/-yU8Noafg11w/X27qECGJL1I/AAAAAAAAAok/d1P9ZbHZ2P8UiDpanG1IpndT6IYOo_27gCLcBGAsYHQ/s2048/Ca%25CC%2580%2BPhe%25CC%2582%2BCaCao%2BSu%25CC%259B%25CC%2583a%2BDu%25CC%259B%25CC%2580a%2B%25283%2529.jpg" alt="" className="layout-img"/></Link>
                    </div>
                    <div className="layout-item">
                        <Link to={'/san-pham/'} className="link-img"><img src="https://img4.thuthuatphanmem.vn/uploads/2020/05/07/hinh-anh-pha-tra-sua-dep_062228340.jpg" alt="" className="layout-img"/></Link>
                    </div>
                    <div className="layout-item">
                        <Link to={'/san-pham/'} className="link-img"><img src="https://cdn.tgdd.vn/Files/2017/04/24/975816/bi-quyet-pha-sinh-to-ngon-dung-dieu-ngay-tai-nha-1_760x507.jpg" alt="" className="layout-img"/></Link>
                    </div>
                    <div className="layout-item">
                        <Link to={'/san-pham/'} className="link-img"><img src="https://dulichvietnam.com.vn/vnt_upload/File/Image/quan_ca_vien_chien_o_tphcm.jpg" alt="" className="layout-img"/></Link>
                    </div>
                    <div className="layout-item">
                        <Link to={'/san-pham/'} className="link-img"><img src="https://chupanhmonan.com/wp-content/uploads/2019/01/b54a019c4280a63d91eee760059d7357.jpg" alt="" className="layout-img"/></Link>
                    </div>
                    <div className="layout-item">
                        <Link to={'/san-pham/'} className="link-img"><img src="https://traicayvuongtron.vn/resources/uploads/hinh_bai_top_5/toptiemtenbanh/banhphap/lt_patisserie.jpg" alt="" className="layout-img"/></Link>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
      </div>
      );
}

export default Home;