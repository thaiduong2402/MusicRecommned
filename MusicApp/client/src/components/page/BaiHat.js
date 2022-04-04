import React, { useEffect, useRef, useState ,useContext } from 'react';
import axios from 'axios'
import ItemBaiHat from './ItemBaiHat';
import {useStore,actions} from '../../store'
function BaiHat(props) {

    const [state,dispatch] = useStore()
    const [load,setLoad] = useState(0)
    
    const param = window.location.pathname
    const user= param.split('/')
    const userName = user[2]
    const [songs,setSongs] = useState()
    
    useEffect(()=>{
        fetchData()
    },[state.song,state.load])
    const fetchData =  async () =>{
        await axios({
            method: 'get',
            url : `http://localhost:3000/user/userget/${userName}`
        })
        .then(res =>{
            dispatch(actions.setSongs(res.data))
        })
        .catch(err=>{
            console.log(err)
        })
    }

    var element = state.songs.map((item,i)=>{
        return (
            <ItemBaiHat song={item} key={i} ></ItemBaiHat>
          );
    })
    return (
      <>
        {element}
      </>
    );
}

export default BaiHat;