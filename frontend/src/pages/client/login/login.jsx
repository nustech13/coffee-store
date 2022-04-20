import React, {Component}  from 'react'; 
import axios from 'axios';
import Cookies from 'universal-cookie';
import {Redirect, withRouter} from "react-router";
import { Link } from 'react-router-dom';
import './login.css';
const cookies = new Cookies();
class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }
    componentDidMount() {
      document.title = 'Login';
    }
    login = async (e) =>{
      e.preventDefault();
      axios.post('http://localhost:5000/v1/api/auth/login/', this.state)
        .then(data => {
            cookies.set('customer', data.data);
            alert("Đăng nhập thành công");
            this.props.history.goBack();       
        })
        .catch(error => {
            console.log(error);
            alert("Sai tài khoản hoặc mật khẩu");            
        })
        
    }
    handleChange = (changeObject) => {
      this.setState(changeObject);
    }
    render() {
        return(
          <>
            {!cookies.get('customer') ? (
                <div className='wrapper-login'>
                    <form className='form-login'>
                            <h1>Đăng Nhập</h1>
                            <div className="form-text">
                                <label>Email</label>
                                <input 
                                    type="text" 
                                    name="email" 
                                    value={this.state.email || ""}
                                    onChange={(e)=> this.handleChange({email: e.target.value})}
                                />
                            </div>
                            <div className="form-text">
                                <label>Mật Khẩu</label>
                                <input 
                                type="password" 
                                name="password"
                                value={this.state.password || ""}
                                onChange={(e)=> this.handleChange({password: e.target.value})}
                                autoComplete="on"
                                />
                            </div>
                            <span>Bạn chưa có tài khoản? Đăng ký ngay <Link to={'/dang-ky'} className='register-link'>tại đây</Link>.</span>
                            <div className='btn-item'>
                                <button onClick={(e)=> this.login(e)}>Đăng Nhập</button>
                            </div>
                            <div className='btn-item'>
                                <button onClick={()=> this.props.history.push('/')}>Trang Chủ</button>
                            </div>
                        </form>        
                </div>
            
            ) : (<Redirect to={{pathname: "/"}}/>)}
        </>
        );
    }
}
export default withRouter(Login);