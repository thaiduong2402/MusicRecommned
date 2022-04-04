import React, { useState } from 'react';
import axios from "axios"
import {useStore,actions} from '../../store'
import ItemBaiHat from './ItemBaiHat';
function Timkiem(props) {

    const [search,setSearch] = useState()
    const [state,dispatch] = useStore()
    const handleClick=()=>{
        axios({
            method: 'post',
            url : 'http://localhost:3000/search',
            data:{
                search
            }
        })
        .then(res =>{
            console.log(res.data)
            dispatch(actions.setResultSearch(res.data))
        })
        .catch(err=>{
            console.log(err)
        })



    }
    var element = state.resultSearch?.map((item,i)=>{
        return (
            <ItemBaiHat song={item} key={i} ></ItemBaiHat>
          );
    })

    return (
        <div className="timKiem">
        
        <div className="timKiemBar">
            <input type="text" name="textTiemKiem" valua={search} onChange={e=>setSearch(e.target.value)}/>
            <button><i className="fas fa-search" onClick={handleClick}></i></button>
        </div>
        <div className="kq">
            <ul>
               {element}
            </ul>
        </div>
    </div>
    );
}

export default Timkiem;