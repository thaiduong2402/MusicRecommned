import React, { useEffect } from 'react';
import {useStore,actions} from '../../store'
import axios from 'axios'
function ItemBaiHat(props) {

    const [state,dispatch] = useStore()
    const param = window.location.pathname
    const user= param.split('/')
    const userName = user[2]
    const handleClick=(song)=>{
       dispatch(actions.setBaiHat(
           {
               ten:song.ten,
               ma:song.ma,
               caSi:song.caSi
            }
           ))
           axios({
            method: 'post',
            url: 'http://localhost:3000/user/userpost',
            data: {
                user:userName,
                song:song.ma,
                rating:5
            }
            })
            .then(function (response) {
                console.log("rated")
            })
            .catch((response)=>{
                console.log(response)
            })
    }


    const handleClickClose=(song)=>{

        
            axios({
             method: 'post',
             url: 'http://localhost:3000/user/userpost',
             data: {
                 user:userName,
                 song:song.ma,
                 rating:0
             }
             })
             .then(function (response) {
                 console.log("rated")
             })
             .catch((response)=>{
                 console.log(response)
             })
             


             dispatch(actions.setLoad(
                {
                    load:!state.load
                 }
                ))
     }



    


    return (
        <li className="baiHat" id={props.song.ma}>
            <div>
                        <span className="tenBai">{props.song.ten}</span> 
                        <p className="tenCaSi"><span>{props.song.caSi}</span></p>
            </div>
            <div>
                    <button onClick={() => handleClick(props.song)} className="btn_play"><i className="fas fa-play"></i></button>
                    <button onClick={() => handleClickClose(props.song)} className="btn_play"><i className="far fa-window-close"></i></button>
            </div>
        </li>
    );
}

export default ItemBaiHat;