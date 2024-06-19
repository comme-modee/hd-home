import React, { useEffect, useRef } from 'react'
import scrollIconImg from '../../img/icon/main_scroll_icon.png';
import './ScrollIcon.css';

const ScrollIcon = ({show}) => {
    const scrollIcon = useRef('');

    useEffect(()=>{
        if(show) {
            scrollIcon.current.style.animation = `show 0.7s cubic-bezier(0.590, 0.010, 0.170, 1.000) forwards`
        }
    },[show])
    
    return (
        <div className='scroll-icon' ref={scrollIcon}>
            <img src={scrollIconImg} alt='scroll-icon'/>
        </div>
    )
}

export default ScrollIcon