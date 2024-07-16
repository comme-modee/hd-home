import React, { useEffect } from 'react';
import CountUp from 'react-countup';
import './CountPage.css';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import Poster from '../../img/count-page-poster.png'

gsap.registerPlugin(MotionPathPlugin);

const CountPage = ({ show, isMobile, isTablet, countPageVideo, countPageTitle, countPageNum }) => {
  const fireflies = () => {
    let fireflies = isMobile ? 10 : isTablet ? 15: 25;
    let conWidth = countPageNum.current.offsetWidth;
    let conHeight = countPageNum.current.offsetHeight;

    for (let i = 0; i < fireflies; i++) {
      const firefly = document.createElement('div');
      firefly.className = 'firefly';
      gsap.set(firefly, {
        x: Math.random() * conWidth,
        y: Math.random() * conHeight
      });
      countPageNum.current.appendChild(firefly);
      flyTheFirefly(firefly);
    }

    function flyTheFirefly(elm) {
      let flyTl = gsap.timeline();
      let fadeTl = gsap.timeline({
        delay: Math.floor(Math.random() * 2) + 1,
        repeatDelay: Math.floor(Math.random() * 6) + 1,
        repeat: -1
      });

      fadeTl.to(
        [elm],
        {
          opacity: 0.25,
          yoyo: true,
          repeat: 1,
          repeatDelay: 0.02,
          duration: 0.25
        },
        Math.floor(Math.random() * 6) + 1
      );
      
      flyTl
        .set(elm, { scale: Math.random() * 0.75 + 0.5 })
        .to(elm, {
          duration: Math.random() * 100 + 100,
          motionPath: {
            path: [
              { x: Math.random() * conWidth, y: Math.random() * conHeight },
              { x: Math.random() * conWidth, y: Math.random() * conHeight }
            ],
            align: 'self' // optional
          },
          onComplete: flyTheFirefly,
          onCompleteParams: [elm]
        });
    }
  }
  useEffect(()=>{
      setTimeout(() => fireflies(), 1000);
  },[])

  return (
    <div id='count-page' className='section'>
      <div className='text-container'>
        <div className='title' ref={countPageTitle}>
          <p className='dangdanghae'>
          파트너의 목표 달성 위해<br/>
          밤낮없이 고민하는 햇님달님
          </p>
        </div>
        <div className='num-container' ref={countPageNum}>
          <div className='count1'>
            <span>{show && <CountUp end={12} duration={5}/>}<span className='small-text'>년</span></span>
            <p>업력</p>
          </div>

          <div className='line'></div>

          <div className='count2'>
            <span>{show && <CountUp end={3456} duration={5}/>}<span className='small-text'>+</span></span>
            <p>함께한 파트너</p>
          </div>

          <div className='line'></div>
          
          <div className='count3'>
            <span>{show && <CountUp end={789} duration={5}/>}<span className='small-text'>+</span></span>
            <p>진행 프로젝트</p>
          </div>
        </div>
      </div>

      <div className='dimmed'></div>
      <video
        loop
        data-autoplay
        data-keepplaying
        muted
        playsInline
        preload="metadata"
        ref={countPageVideo}
        poster={Poster}
      >
        <source data-src='/video/video-2.mp4' type='video/mp4'/>
      </video>
    </div>
  )
}

export default CountPage;