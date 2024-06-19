import React, { useEffect, useRef } from 'react'
import './Buttons.css'
import downloadIcon from '../../img/icon/icon-download.png';
import contactIcon from '../../img/icon/icon-contact.png';
import { useNavigate } from 'react-router-dom';

const Buttons = ({ show, isMobile }) => {
    const navigate = useNavigate();
    const Buttons = useRef('');

    useEffect(()=>{
        if(show) { 
            Buttons.current.style.animation = `show-btns 0.7s cubic-bezier(0.590, 0.010, 0.170, 1.000) forwards`
        }
    },[show])
    return (
        <div ref={Buttons} className='fixed-btns'>
            <a href='' download><img src={downloadIcon} alt='다운로드 아이콘'/></a>
            <a href={`${isMobile ? '#sec11' : '#sec10'}`}><img src={contactIcon} alt='문의 아이콘'/></a>
        </div>
    )
}

export default Buttons