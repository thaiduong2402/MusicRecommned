import React from 'react';
import ItemBaiHat from './ItemBaiHat';
import { useEffect,useState ,useContext} from 'react';
import axios from 'axios';
import Timkiem from './Timkiem';
function Right(props) {

    const [songs,setSongs] = useState()
    useEffect(()=>{
        fetchData()
    },[])
    const fetchData = async () =>{
        axios({
            method: 'get',
            url : 'http://localhost:3000/user/nghenhieu'
        })
        .then(res =>{
            setSongs(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    var elements = songs?.map((item,i)=>{
        return (
            <ItemBaiHat song={item} key={i}></ItemBaiHat>
          );
    })

    return (
        <div className="right">

        <div className="ngheNhieu">
                <p className="textNgheNhieu">Top Nghe Nhieu</p>
                <ul className="ul_ngheNhieu">
                  {elements}
                </ul>
        </div>
       <Timkiem></Timkiem>
    </div>
    );
}

export default Right;