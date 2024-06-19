import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// img src
import mainImg1 from './img/main/img-1.jpg'
import mainImg2 from './img/main/img-2.jpg'
import mainImg3 from './img/main/img-3.jpg'
import mainImg4 from './img/main/img-4.jpg'

import './css/Main.css';
import CountPage from './component/CountPage/CountPage';
import splitSentense from './hook/useSplitSentense';
import Header from './component/Header/Header';
import ScrollIcon from './component/ScrollIcon/ScrollIcon';
import setVh from './hook/useSetVh';
import Contact from './component/Contact/Contact';
import Buttons from './component/Buttons/Buttons';

function Main() {
  const [ isVideoReady, setIsVideoReady ] = useState(false);

  const container = useRef('');
  const section1 = useRef('');

  const mainText = useRef('');
  const circle = useRef('');
  const circleInnerLine = useRef('');
  const imgSection = useRef('');
  const img1 = useRef('');
  const img1TextWrapper = useRef('');
  const img1Text1 = useRef('');
  const img1Text2 = useRef('');
  const img1Text3 = useRef('');
  const img2 = useRef('');
  const img3 = useRef('');
  const light = useRef('');
  const img4 = useRef('');

  let [ scrollY, setScrollY ] = useState('');

  const [ isAni1Start, setAni1Start ] = useState(false);
  const [ isAni2Start, setAni2Start ] = useState(false);
  const [ isCircleLineShow, setIsCircleLineShow ] = useState(false);
  const [ isImgSectionStart, setIsImgSectionStart ] = useState(false);

  const isMobile = window.innerWidth <= 480;

  const [ isScrollIconShow, setIsScrollIconShow ] = useState(false);
  const [ isButtonsShow, setButtonsShow ] = useState(false);
  const [ isHeaderShow, setIsheaderShow ] = useState(false);
  const [ isCountPageShow, setIsCountPageShow ] = useState(false);

  
  window.addEventListener('resize', () => setVh())

  useEffect(()=>{
    setVh()
    window.scrollTo(0, 0);
  },[])

  //메인 텍스트 애니 끝나기 전에는 스크롤숨기기
  useEffect(()=> {
    document.body.style.cssText = 'overflow: hidden;'
    
    window.addEventListener('scroll', function(){
      setScrollY(window.scrollY);
    });
  },[])

  //메인 첫화면 텍스트 애니
  useEffect(()=>{
    if(isVideoReady) {
        let tl = gsap.timeline();
        let mainline = mainText.current.children;

        tl.from(mainline, {
          opacity: 0,
          y: 30,
          delay: 0.3,
          duration: 0.8,
          stagger: 0.04,
          ease: "power3.out",
          onComplete: () => {
            document.body.style.overflowY = 'scroll'
            setIsScrollIconShow(true);
            setButtonsShow(true);
            setAni1Start(true);
          }
        })
      }

  },[isVideoReady, isMobile])

  
  useEffect(()=>{
    let ctx2;
    if(isCircleLineShow) {
      ctx2 = gsap.context(() => {
        let split = circleInnerLine.current.children;
        gsap.from(split, {
          opacity: 0, 
          y: 30, 
          duration: 0.3, 
          stagger: 0.02, // 각 문자가 차례대로 나타나는 지연 시간
          ease: "power3.out", // 애니메이션 효과
          onComplete: () => {
            setIsImgSectionStart(true)
          }
        })
      })
      return () => ctx2.revert();
    } else {
      ctx2 = gsap.context(() => {
        let split = circleInnerLine.current.children;
        gsap.to(split, {
          opacity: 0, 
          y: 30,
          duration: 0.2, 
          stagger: 0.02, // 각 문자가 차례대로 나타나는 지연 시간
          ease: "power3.out", // 애니메이션 효과
          onComplete: () => {
            setIsImgSectionStart(false)
          }
        })
      })
      return () => ctx2.revert();
    }
  },[isCircleLineShow])


  //메인 텍스트 애니 끝난 뒤 circle + 텍스트 애니
  useEffect(() => {
    console.log(scrollY)

    if (isAni1Start) {
      circle.current.style.transform = `scale(${scrollY*2})`;
      setAni2Start(true)
    }
    if(scrollY >= 1000) {
      setIsCircleLineShow(true)
    } else {
      setIsCircleLineShow(false)
    }

    let responsibleScrollY2 = isMobile ? 1100 : 2200;
    let imgSectionScale= Math.max(0, Math.min(100, (scrollY - responsibleScrollY2)*0.06));
    if(isImgSectionStart) {
      imgSection.current.style.clipPath = `circle(${imgSectionScale}% at 50% 50%)`;
    } else {
      imgSection.current.style.clipPath = 'circle(0% at 50% 50%)';
    }

    let responsibleScrollY3 = isMobile ? 2200 : 4600;
    let img1TextWrapperOpacity = Math.max(0, Math.min(1, (scrollY - responsibleScrollY3) * 0.005));
    if(imgSectionScale >= 70) {
      img1TextWrapper.current.style.opacity = `${img1TextWrapperOpacity}`
    } else {
      img1TextWrapper.current.style.opacity = `0`
    }

    let responsibleScrollY4 = isMobile ? 3800 : 5300;
    let textX = Math.max(0, Math.min(93, (scrollY - responsibleScrollY4) * 0.07));
    if(img1TextWrapperOpacity >= 1) {
      img1Text1.current.style.transform = `translateX(${textX}%)`
      img1Text3.current.style.transform = `translateX(-${textX}%)`
    } else {
      img1Text1.current.style.transform = `translateX(0px)`
      img1Text3.current.style.transform = `translateX(0px)`
    }
    
    let responsibleScrollY5 = isMobile ? 4600 : 6800;
    let img2Height = Math.max(0, Math.min(100, (scrollY - responsibleScrollY5) * 0.05));
    if(textX >= 93) {
      img1TextWrapper.current.style = `opacity: 0`
      img2.current.style.clipPath = `inset(${100-img2Height}% 0 0 0)`
    } else {
      img2.current.style.clipPath = `inset(100% 0 0 0)`
    }
    
    let responsibleScrollY6 = isMobile ? 5800 : 8800;
    let img3Height = Math.max(0, Math.min(100, (scrollY - responsibleScrollY6) * 0.05));
    if(img2Height >= 100) {
      setIsheaderShow(true)
      img3.current.style.clipPath = `inset(${100-img3Height}% 0 0 0)`
    } else {
      img3.current.style.clipPath = `inset(100% 0 0 0)`
      setIsheaderShow(false)
    }

    let responsibleScrollY7 = isMobile ? 8800 : 12000;
    let lightScale = Math.max(1, Math.min(10000, (scrollY - responsibleScrollY7)*0.5));
    if(img3Height >= 100 && scrollY >= 12000) {
      light.current.style.transform = `scale(${lightScale})`
      light.current.style.opacity = `1`
      if (scrollY >= 12700) {
        console.log('ee')
        light.current.style.transform = `scale(${lightScale*2.5})`
      } 
    } else {
      light.current.style.transform = `scale(1)`
      light.current.style.opacity = `0`
    }
    if(lightScale*2.5 >= 2800) {
      img4.current.style.opacity = `1`
    } else {
      img4.current.style.opacity = `0`
    }

    // let responsibleScrollY8 = isMobile ? 11000 : 14000;
    // let img4Height = Math.max(0, Math.min(100, (scrollY - responsibleScrollY8) * 0.05));
    // if(whyHeight >= 100) {
    //   img4.current.style.clipPath = `inset(${100-img4Height}% 0 0 0)`
    // } else {
    //   img4.current.style.clipPath = `inset(100% 0 0 0)`
    // }

    // let responsibleScrollY9 = isMobile ? 13000 : 16000;
    // let img4Text1ClipPath = Math.max(0, Math.min(100, (scrollY - responsibleScrollY9) * 0.05));
    // if(img4Height >= 100) {
    //   img4Text1.current.style.clipPath = `inset(0 ${100-img4Text1ClipPath}% 0 0)`
    // }
    
    // if(img4Text1ClipPath >= 100 && scrollY >= 20585) {
    //   setIsCountPageShow(true)
    // } else {
    //   setIsCountPageShow(false)
    // }
    
  }, [isVideoReady, scrollY, isAni1Start, isAni2Start, isImgSectionStart, isMobile]);


  return (
    <>
      <div className={`loading-bg ${!isVideoReady ? 'loading-bg-active' : ''}`}></div>
      
      <Header show={isHeaderShow}/>

      <Buttons show={isButtonsShow} isMobile={isMobile}/>

      <div className="main-container" ref={container}>
        <ScrollIcon show={isScrollIconShow} isMobile={isMobile}/>
        <div id='section-1' ref={section1}>
          <div className='main-text'>
            <div ref={mainText}>{splitSentense('세상에 알리고 싶은 [ 당신의 이야기 ]')}</div>
          </div>
          <div className='dimmed'></div>
          <video
            muted
            autoPlay
            loop
            onLoadedMetadata={() => setIsVideoReady(true)}
          >
            <source src='/video/video-1.mp4' type='video/mp4'/>
          </video>
          

          <div className='circle-wrapper'>
            <div className='inner-text'>
              <div className='line'><div ref={circleInnerLine}>{splitSentense('사람들에게 닿을 수 있도록')}</div></div>
            </div>
            <div className='bg-circle' ref={circle}></div>
          </div>

          <div className='img-section' ref={imgSection}>
            <div className='img1-wrapper'>
              <div className='img1-text' ref={img1TextWrapper}>
                <p ref={img1Text1}>밤낮으로</p>
                <p ref={img1Text2}>고민하는</p>
                <p ref={img1Text3}>햇님달님</p>
              </div>
              <img className='img1' src={mainImg1} ref={img1} alt='img1'/>
            </div>
            <div className='img2-wrapper' ref={img2}>
              <img className='img2' src={mainImg2} alt='img2'/>
            </div>
            <div className='img3-wrapper' ref={img3}>
              <div ref={light} className='light'></div>
              <p>당신의 이야기를 담아</p>
              <img className='img3' src={mainImg3} alt='img3'/>
            </div>
            <div className='img4-wrapper' ref={img4}>
              <p>모두에게 비추는 햇님달님</p>
              <img className='img4' src={mainImg4} alt='img4'/>
            </div>
          </div>
        </div>


        <CountPage show={isCountPageShow} scrollY={scrollY} isMobile={isMobile}/>

        <Contact/>

        
      </div>
    </>
  );
}

export default Main;
