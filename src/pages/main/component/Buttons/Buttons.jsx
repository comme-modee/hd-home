import React, { useEffect, useRef } from 'react'
import './Buttons.css'
import downloadIcon from '../../img/icon/icon-download.png';
import contactIcon from '../../img/icon/icon-contact.png';
import CompanyIntroduction from '../../download/Company-Introduction.pdf'
import { useState } from 'react';

const Buttons = ({ show, fullpageController }) => {
    const Buttons = useRef(null);
    const headerBtn = useRef(null);
    const headerBtn1 = useRef(null);
    const headerBtn2 = useRef(null);
    const headerBtn3 = useRef(null);
    const sidePage = useRef(null);
    const [ isSidePageOpen, setIsSidePageOpen ] = useState(false)

    useEffect(()=>{
        if(show) { 
            Buttons.current.style.animation = `show-btns 0.7s cubic-bezier(0.590, 0.010, 0.170, 1.000) forwards`
            headerBtn.current.style.opacity = 1;
            headerBtn.current.style.visibility = 'visible';
        }
    },[show])

    const openSidePage = () => {
        sidePage.current.style.right = 0;
        headerBtn1.current.style.animation = 'headerBtn1 0.5s ease forwards'
        headerBtn2.current.style.animation = 'headerBtn2 0.5s ease forwards'
        headerBtn3.current.style.animation = 'headerBtn3 0.5s ease forwards'
    }

    const closeSidePage = () => {
        headerBtn1.current.style.animation = 'headerBtn1Reverse 0.5s ease forwards'
        headerBtn2.current.style.animation = 'headerBtn2Reverse 0.5s ease forwards'
        headerBtn3.current.style.animation = 'headerBtn3Reverse 0.5s ease forwards'
        sidePage.current.style.right = '-200%';
    }

    useEffect(() => {
        if(isSidePageOpen) {
            openSidePage()
        } else {
            closeSidePage()
        }
    },[isSidePageOpen])


    return (
        <React.Fragment>
            <div ref={Buttons} className='fixed-btns'>
                <a className='link' href={CompanyIntroduction} download="(주)햇님달님 회사소개서"><img src={downloadIcon} alt='다운로드 아이콘'/></a>
                <div className='link' onClick={() => fullpageController.silentMoveTo(11)}><img src={contactIcon} alt='문의 아이콘'/></div>
            </div>
            <div className='header-btn' ref={headerBtn} onClick={() => setIsSidePageOpen(prev => !prev)}>
                <span ref={headerBtn1}></span>
                <span ref={headerBtn2}></span>
                <span ref={headerBtn3}></span>
            </div>
            <div className='side-page dangdanghae' ref={sidePage}>
                <div className='menu'>
                    <a href='/' className='link'>햇님달님</a>
                    <div className='link' onClick={() => { fullpageController.silentMoveTo(8); setIsSidePageOpen(false); closeSidePage() }}>함께한 이야기</div>
                    <div className='link' onClick={() => { fullpageController.silentMoveTo(11);  setIsSidePageOpen(false); closeSidePage() }}>문의하기</div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Buttons