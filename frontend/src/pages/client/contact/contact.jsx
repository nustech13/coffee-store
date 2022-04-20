import React from 'react'; 
import Footer from "../../../components/Footer/footer";
import emailjs from 'emailjs-com';
import Header from '../../../components/Header/header';
const Contact = () => {

    document.title = "Liên hệ";  
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('gmail', 'template_bvekkbb', e.target, 'v_zxIHzNzh1kn17Y3')
          .then((result) => {
              console.log(result.text);
              window.confirm("Gửi tin nhắn thành công, Chúng tôi sẽ cố gắn hồi đáp lại bạn sớm nhất có thể.");
          }, (error) => {
              console.log(error.text);
          });
    };

    
        return(
            <div>
                <Header isLinkActive={"lien-he"}/>
                <div className='container' style={{textAlign:'center', height: '140vh', padding: '80px 0', overflow: 'hidden'}}>
                    <div style={{padding: '52px 0px', display:'inline-flex'}}>
                        <div className='row'>
                            <div className='col-md-12 col-lg-6'>
                                <div style={{margin: "20px"}}>
                                    <div className='d-flex justify-content-center'>
                                        <img src='assets/logo.png' alt='' width={300} height={160}/>
                                    </div>
                                    <h6><b>Trải qua hơn 15 năm hoạt động và phát triển, Coffee House đã từng bước khẳng đinh và tạo 
                                        sự tín nhiệm trong lòng khách hàng, trở thành một trong những tiệm Cà Phê chuyên nghiệp nhất cung cấp 
                                        các loại thức uống, thức ăn và nơi gặp gỡ, giải trí cho khách hàng</b></h6>
                                    <h6><b>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"/></svg>
                                        Coffee House Man Thiện: Số 97, Man Thiện, Hiệp Phú, Thủ Đức, Hồ Chí Minh
                                    </b></h6>
                                    <h6><b>Điện thoại: (024) 35737348 - Fax: (024) 35737347</b></h6>
                                    <h6><b>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                        Bộ phận tư vấn khách hàng: Hotline: 1900 6750 - Email: support@bonq.vn
                                    </b></h6>
                                </div>
                            </div>
                            <div className='col-md-12 col-lg-6'>
                                <div>
                                    <h6><b>
                                        Gửi tin nhắn cho chúng tôi:
                                    </b></h6>
                                    <form onSubmit={sendEmail} className="d-flex flex-column" style={{maxWidth:'80%', margin:'0 auto'}}>
                            
                                        <label htmlFor="name" style={{paddingTop:20, paddingBottom:20}}>
                                        Họ và tên:
                                        <input 
                                            name="name"
                                            id="name"
                                            type="text"
                                            className="form-control"
                                            required
                                            />
                                        </label>
                                        <label htmlFor="id" style={{paddingTop:20, paddingBottom:20}}>
                                        Email:
                                        <input
                                            name="email"
                                            id="email"
                                            type="text"
                                            className="form-control"
                                            required
                                        />
                                        </label>
                                        <label htmlFor="id" style={{paddingTop:20, paddingBottom:20}}>
                                        Nội Dung:
                                        <textarea
                                            name="message"
                                            id="message"
                                            type="text"
                                            className="form-control"
                                            rows={4}
                                            required
                                        />
                                        </label>
                                        <button type='submit' style={{display:'inline-block'}} className="btn btn-warning btn-lg">
                                        Send
                                        </button>
                                        
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    
}
export default Contact;