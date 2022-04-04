import React, { useEffect, useMemo, useRef, useState,useContext } from 'react';
import ReactAudioPlayer from 'react-audio-player';

import {useStore,actions} from '../../store'





function TrinhPhat(props) {

    const [audioIndex, setAudioIndex] = useState(0);
    const [currentTimes, setCurrentTimes] = useState(0);
    const [currentTimem, setCurrentTimem] = useState(0);
    const [durations, setDurations] = useState(0);
    const [durationm, setDurationm] = useState(0);
    const [state,dispatch] = useStore()
    const [play,setPlay] = useState(false)
    const [mute,setMute] = useState(false)
    const [song,setSong] = useState()
    const audioRef = useRef()
    //const audio =useRef( new Audio(ccbb))
    var Progress = document.querySelector("Progress")
    useEffect(()=>{
        audioRef.current.load()
        setPlay(false)
        state.allSongs.forEach((item)=>{
            if(item['ma']==state.song['ma'])
                {
                    console.log(item['url'])
                    audioRef.current.src = item['url']
                }

        },[state.song])

    },[state.song])

    useEffect(()=>{
      setTimeout(()=>{
        if(audioRef.current.duration==undefined ||audioRef.current.duration==NaN)
        {
            setDurations(0)
        }
        else{
           
            var time = Math.floor(audioRef.current.duration)
            var mind = time % (60 * 60);
            var minutes = Math.floor(mind / 60);
         
            var secd = mind % 60;
            var seconds = Math.ceil(secd);
            setDurations(seconds)
            setDurationm(minutes)
        }
      },500)
    },[currentTimes])

    
    useEffect(()=>{
      setInterval(()=>{
        if(audioRef.current.currentTime==undefined)
        {
            setCurrentTimes(0)
            setCurrentTimem(0)
        }
        else{
            var time = Math.floor(audioRef.current.currentTime)
            var mind = time % (60 * 60);
            var minutes = Math.floor(mind / 60);
         
            var secd = mind % 60;
            var seconds = Math.ceil(secd);
            setCurrentTimes(seconds)
            setCurrentTimem(minutes)
        }
      },1000)
    },[currentTimes])

    
    const Phat= ()=>{
        if(play)
        {
            
            audioRef.current.pause();
            setPlay(false)
        }
        else{
                        
            
            audioRef.current.play();
            setPlay(true)
            
        }
    }


    const handleValumn=()=>{
        if(mute)
        {
            setMute(false)
            audioRef.current.muted = false
        }
        else{
            setMute(true)
            audioRef.current.muted = true    
        }
    }
    return (
        <div className="trinhPhat">   

        <audio ref={audioRef} >
            <source /> 
        </audio>     
                <button onClick={Phat}>{play ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}</button>
                        
                        <div className="trinhPhatThongTin">
                            <p>ten bai hat : <span>{state.song['ten']}</span></p> 
                            <p>ten ca si : <span>{state.song['caSi']}</span></p> 
                        </div>
                        <div className="thoiGian">
                            <span className="thoiGianPhat">{currentTimem} : {currentTimes}</span>
                            /
                            <span className="thoiGianTong">{durationm}:{durations}</span> 
                        </div> 
                        <button onClick={handleValumn}>{mute ? <i className="fas fa-volume-mute"></i> : <i className="fas fa-volume-up"></i> }</button>
                    </div>
    );
}

export default TrinhPhat;