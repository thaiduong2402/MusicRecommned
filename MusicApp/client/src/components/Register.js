import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import {
    useHistory
   } from "react-router-dom";
function Register(props) {

    let history = useHistory();
    const [userName,setUserName] = useState("")
    const [name,setName] = useState("")
    const [passWord,setPassWord] = useState("")


    const handleSubmit=()=>{
        axios({
            method: 'post',
            url: 'http://localhost:3000/user/register',
            data: {
                name,
                userName,
                passWord
            }
        })
        .then(function (response) {
           if(response.data.status && response.data['status'] === 400)
           {
                console.log(response.data['thongbao'])
                alert('loi')
                console.log(response)
           }
           else if(response.status === 200)
           {
                console.log(response.data['userName'] + "day la tai khoan da duoc dang ky")
                console.log(response)
                alert('Dang ky thanh cong')
                history.push("/login")
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
              <h3>Dang Ky</h3>
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
                  <input type="text" className="form-control" placeholder="tên" value={name} onChange = {e=>setName(e.target.value) }/>
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-user" /></span>
                  </div>
                  <input type="text" className="form-control" placeholder="tên tài khoản" value={userName} onChange = {e=>setUserName(e.target.value) }/>
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-key" /></span>
                  </div>
                  <input type="password" className="form-control" placeholder="mật khẩu" value={passWord} onChange = {e=>setPassWord(e.target.value)}/>
                </div>
            
                <div className="form-group">
                  <input  defaultValue="Register" className="btn float-right login_btn" onClick={handleSubmit}/>
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Da co tai khoan<a href="/login">Dang Nhap</a>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    );
}

export default Register;