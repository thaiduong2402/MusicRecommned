import react from 'react';
import './Login.css';
import { useEffect,useState } from 'react';
import {
   useHistory
  } from "react-router-dom";
  

import axios from 'axios';
function Login(props) {

    
    let history = useHistory();
    const [userName,setUserName] = useState('');
    const [passWord,setPassWord] = useState('');

    const handleSubmit=()=>{
        axios({
            method: 'post',
            url: 'http://localhost:3000/user/login',
            data: {
                userName,
                passWord
            }
        })
        .then(function (response) {
           if(response.data.status && response.data['status'] === 400)
           {
                console.log(response.data['thongbao'])
                alert('sai mat khau hoac tai khoan')
           }
           else if(response.data.status && response.data['status'] === 200)
           {
                
                console.log(response.data['userName'] + "day la tai khoan")
                history.push(`/home/${response.data['userName']}`)
               
           }
           
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return ( 
        <div className="container">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <h3>Đăng Nhập</h3>
              <div className="d-flex justify-content-end social_icon">
                <span><i className="fab fa-facebook-square" /></span>
                <span><i className="fab fa-google-plus-square" /></span>
                <span><i className="fab fa-twitter-square" /></span>
              </div>
            </div>
            <div className="card-body">
              <form>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-user" /></span>
                  </div>
                  <input type="text" className="form-control" placeholder="tên đăng nhập" value={userName} 
                  onChange = {(e)=>{
                      setUserName(e.target.value);
                    }
                  }/>
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-key" /></span>
                  </div>
                  <input type="password" className="form-control" placeholder="mật khẩu" value={passWord} onChange = {e=>setPassWord(e.target.value)}/>
                </div>
                <div className="row align-items-center remember">
                  <input type="checkbox" />Nhớ mật khẩu
                </div>
                <div className="form-group">
                  <input  defaultValue="Login" className="btn float-right login_btn" onClick={handleSubmit}/>
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Chưa có tài khoản?<a href="/register">Đăng Ký</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Login;
