import React, {Component}  from 'react'; 
import axios from 'axios';
import Cookies from 'universal-cookie';
import {Redirect, withRouter} from "react-router";
import { Link } from 'react-router-dom';
import './register.css';
const cookies = new Cookies();
class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            phone: "",
            image:"sdsdsdsdsđsd"
        };
        this.register = this.register.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }
    componentDidMount() {
      document.title = 'Login';
    }
    validateEmail = (email) => {
        return email.match(
            // eslint-disable-next-line
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    checkPhone = (phone) =>{
        var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        return vnf_regex.test(phone);
    }
    register = async (e) =>{
        e.preventDefault();
        if(this.state.name.localeCompare("") === 0){
            alert( "Tên không được để trống");
        }
        else if(this.state.email.localeCompare("") === 0){
            alert( "Email không được để trống");
        }
        else if(this.state.password.localeCompare("") === 0){
            alert( "Password không được để trống");
        }
        else if(this.state.phone.localeCompare("") === 0){
            alert( "Số điện thoại không được để trống");
        }else if(this.validateEmail(this.state.email) === null){
            alert( "Email không hợp lệ");
        }else if(this.state.phone.length !== 10 || !this.checkPhone(this.state.phone)){
            alert( "Số điện thoại không hợp lệ");
        }else{
            axios.post('http://localhost:5000/v1/api/auth/register/', this.state)
                .then(data => {
                    alert(data.data.mess);
                    if(data.data.success){
                        this.props.history.goBack();     
                    }
                })
                .catch(error => {
                    console.log(error);            
                })  
        }
    }
    handleChange = (changeObject) => {
      this.setState(changeObject);
    }
    render() {
        return(
          <>
            {!cookies.get('customer') ? (
                <div className='wrapper-register'>
                    <form className='form-register'>
                            <h1>Đăng Ký</h1>
                            <div className="form-text">
                                <label>Họ Tên</label>
                                <input 
                                    type="text" 
                                    onChange={(e)=> this.handleChange({name: e.target.value})}
                                />
                            </div>
                            <div className="form-text">
                                <label>Email</label>
                                <input 
                                    type="text" 
                                    onChange={(e)=> this.handleChange({email: e.target.value})}
                                />
                            </div>
                            <div className="form-text">
                                <label>Mật Khẩu</label>
                                <input 
                                type="password" 
                                onChange={(e)=> this.handleChange({password: e.target.value})}
                                />
                            </div>
                            <div className="form-text">
                                <label>Điện Thoại</label>
                                <input 
                                    type="text"
                                    onChange={(e)=> this.handleChange({phone: e.target.value})}
                                />
                            </div>
                            <span>Bạn đã có tài khoản? Đăng nhập ngay <Link to={'/dang-nhap'} className='register-link'>tại đây</Link>.</span>
                            <div className='btn-item'>
                                <button onClick={(e)=> this.register(e)}>Đăng Ký</button>
                            </div>
                        </form>        
                </div>
            
            ) : (<Redirect to={{pathname: "/"}}/>)}
        </>
        );
    }
}
export default withRouter(Register);