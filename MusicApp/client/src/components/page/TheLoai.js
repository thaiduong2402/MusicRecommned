import React from 'react';
import axios from 'axios'
import {useStore,actions} from '../../store'
function TheLoai(props) {


    const [state,dispatch] = useStore()
    const handleClick=(e)=>{
        axios({
            method: 'post',
            url : 'http://localhost:3000/search/theloai',
            data:{
                search:e.target.value
            }
        })
        .then(res =>{
            //console.log(res.data)
            dispatch(actions.setSongs(res.data))
        })
        .catch(err=>{
            console.log(err)
        })
    }


    return (
<div className="theLoai">
                        <div className="textTheLoai">The Loai Nhac</div>
                        <ul className="ul_theLoai">
                            <li><button value="thieunhi" onClick={handleClick}>Nhac Thieu Nhi</button></li>
                            <li><button value="nhactre" onClick={handleClick}>Nhac Tre</button></li>
                            <li><button value="rap" onClick={handleClick}>Nhac Rap</button></li>
                            <li><button value="bolero" onClick={handleClick}>Nhac Bolero</button></li>
                        </ul>
                </div>
    );
}

export default TheLoai;