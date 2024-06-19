import React, { useEffect, useRef } from 'react'
import splitSentense from '../../hook/useSplitSentense';
import './CirclePage.style.css'

const CirclePage = ({show, scrollY, isMobile}) => {

    const circle = useRef('');
    const circleInnerLine1 = useRef('');
    const circleInnerLine2 = useRef('');
    const circleInnerLine2Wrapper = useRef('');

    useEffect(()=>{
        if(show) {

        }
    },[show, scrollY, isMobile])

    return (
        <div className='circle-wrapper'>
        <div className='inner-text'>
            <div className='line-1'><div ref={circleInnerLine1}>{splitSentense('We always shine bright')}</div></div>
            <div className='line-2' ref={circleInnerLine2Wrapper}><div ref={circleInnerLine2}>{splitSentense('For your business.')}</div></div>
        </div>
        <div className='bg-circle' ref={circle}></div>
        </div>
    )
}

export default CirclePage;