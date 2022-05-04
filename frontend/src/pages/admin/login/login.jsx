import React, {Component}  from 'react'; 
import Cookies from 'universal-cookie';
import {Redirect, withRouter} from "react-router";
import './login.css';
const cookies = new Cookies();
class LoginAdmin extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: "",
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
      if(this.state.username === ""){
        alert("Username không được trống");
      }else if(this.state.password === ""){
        alert("Password không được trống");
      }else if(this.state.username !== "admin"){
        alert("Username không hợp lệ");
      }else if(this.state.password !== "123456"){
        alert("Password không hợp lệ");  
      }else{
        cookies.set('admin', "admin");
        alert("Đăng nhập thành công");
        this.props.history.push('/admin/category');
      }        
    }
    handleChange = (changeObject) => {
      this.setState(changeObject);
    }
    render() {
        return(
          <>
            {!cookies.get('admin') ? (
                <div className='wrapper-login'>
                    <form className='form-login'>
                            <h2>Login Admin</h2>
                            <div className="form-text">
                                <label>Username</label>
                                <input 
                                    type="text" 
                                    name="email" 
                                    value={this.state.username || ""}
                                    onChange={(e)=> this.handleChange({username: e.target.value})}
                                />
                            </div>
                            <div className="form-text">
                                <label>Password</label>
                                <input 
                                type="password" 
                                name="password"
                                value={this.state.password || ""}
                                onChange={(e)=> this.handleChange({password: e.target.value})}
                                autoComplete="on"
                                />
                            </div>
                            <div className='btn-item'>
                                <button onClick={(e)=> this.login(e)}>Login</button>
                            </div>
                        </form>        
                </div>
            
            ) : (<Redirect to={{pathname: "/admin/category"}}/>)}
        </>
        );
    }
}
export default withRouter(LoginAdmin);