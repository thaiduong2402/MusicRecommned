
import React, { useEffect, useMemo, useState,useContext } from 'react';
import './home.css';
import axios from 'axios'
import TheLoai from './page/TheLoai';
import Right from './page/Right';
import Menu from './page/Menu';
import BaiHat from './page/BaiHat';
import TrinhPhat from './page/TrinhPhat';
import {StoreProvider}  from '../store'
function Home(props) {

    /*
    lay all song
    */
    /*useEffect(()=>{
        axios({
            method: 'get',
            url: 'http://localhost:3000/user/allsong',
        })
        .then(res =>{
            setSongs(res)  
        })
        .catch(err =>{
            console.log(err)
        })
      
    },[])*/
    const [ma,setMa] = useState()
    const getMa=(data)=>[
        setMa(data)
    ]

    return(
        <StoreProvider>
        <div className="app">
        
        
        <div className="row">
            <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                <div className="header">    
                </div>

                <Menu></Menu>
                
            </div>
        </div>
        
        <div className="row">
            
            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                <TheLoai></TheLoai>
            </div>
            
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                
                <div className="row">
                    <TrinhPhat ma={ma}></TrinhPhat>
                   
                    
                </div>
                
                <div className="row">
                <div className="goiY">
                        <p className="textDS">danh sach phat</p>
                        <ul className="DSBaiHat">
                           
                            <BaiHat></BaiHat>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                <Right></Right>
            </div>    
        </div>
    </div>
    </StoreProvider>
    )
    



    

    /*axios({
        method: 'post',
        url: 'http://localhost:3000/home',
        data: {
            userName,
            passWord
        }
    })
    const param = window.location.pathname
    const user= param.split('/')
    const userName = user[2]
    return (
        <div className="main">
            <h1>day la home {userName}</h1>
        </div>
    );*/
}

export default Home;