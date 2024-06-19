import { useEffect, useRef, useState } from 'react';
import { ReactTyped } from "react-typed";
import ReactFullpage from '@fullpage/react-fullpage';

import setVh from './hook/useSetVh';
import Buttons from './component/Buttons/Buttons';
import ScrollIcon from './component/ScrollIcon/ScrollIcon';

import './css/Main.css';
import doubleQuotesLeft from './img/icon/double-quotes-left.png';
import doubleQuotesRight from './img/icon/double-quotes-right.png';
import trophy from './img/icon/trophy.png';
import btnLeft from './img/icon/btn-left.png';
import btnRight from './img/icon/btn-right.png';
import check from './img/icon/check.png';

//페이지
import Contact from './component/Contact/Contact';
import CountPage from './component/CountPage/CountPage';
import Footer from './component/Footer/Footer';
import Portfolio from './component/Portfolio/Portfolio';
import { useNavigate } from 'react-router-dom';


function App() {
  const [ isVideoReady, setIsVideoReady ] = useState(false);
  const [ isButtonsShow, setButtonsShow ] = useState(false);
  const [ isScrollIconShow, setIsScrollIconShow ] = useState(false);
  const [ showMainText2, setShowMainText2 ] = useState(false);
  const [ showAfterCountText, setShowAfterCountText ] = useState(false);
  const [ showCountPage, setShowCountPage ] = useState(false);
  const isMobile = window.innerWidth <= 480;
  const isTablet = window.innerWidth <= 768;

  const startDimmed = useRef(null)
  const mainText2Wrapper = useRef(null)
  const section2 = useRef(null)
  const section2Circle = useRef(null)
  const section2Bg = useRef(null)
  const section2CenterLine = useRef(null)
  const section2Text = useRef(null)
  const section3CenterLine1 = useRef(null)
  const section3Text = useRef(null)
  const section4CenterLine1 = useRef(null)
  const section4Text = useRef(null)
  const section5CenterLine = useRef(null)
  const section5 = useRef(null)
  const section5Text = useRef(null)
  const light = useRef(null)
  const section6Title = useRef(null);
  const section6ContentsLeft = useRef(null);
  const section6Trophy = useRef(null);
  const section6ContentsRight = useRef(null);
  const section7Top = useRef(null);
  const section7Bottom = useRef(null);
  const countPageVideo = useRef(null)
  const countPageTitle= useRef(null);
  const countPageNum= useRef(null);
  const fullpageApiRef = useRef(null)
  
  const navigate = useNavigate();

  window.addEventListener('resize', () => setVh())

  useEffect(()=>{
    console.log('Made with fullPage.js');
    setVh();
    window.scrollTo(0, 0);

    //새로고침하면 그 페이지에 머물러있는 현상이 있어서 리로드시 '/'로 가게끔 설정
    navigate('/')
    startDimmed.current.style.opacity = 0;
    setTimeout(() => setIsVideoReady(true), 1000);
  },[])

  const mainText2Motion = () => {
    mainText2Wrapper.current.style.animation = `mainText2Ani 1s cubic-bezier(0.590, 0.010, 0.170, 1.000) forwards`;
    setTimeout(() => {
      setShowMainText2(true);
    }, 1000);
  }

  const showIcons = () => {
    setButtonsShow(true)
    setIsScrollIconShow(true)
  }

  const handleLeave = async (origin, destination, direction) => {
      // origin: 떠날 섹션, destination: 도착할 섹션
      if (destination.index === 1) { 
        //사람들에게 닿을 수 있도록
        section2.current.classList.add('animated');
        section2Circle.current.classList.add('animated');
        section2Bg.current.classList.add('animated');
        section2CenterLine.current.style.animation = `centerLineShow 1s ease-in-out forwards`;
        setTimeout(() => {
          section2Text.current.style.opacity = 1;
        }, 1000);
      } 
      
      else if (destination.index === 2) {
        //밤낮으로 고민하는 햇님달님
        section3CenterLine1.current.style.animation = `centerLineShow-1 1s ease-in-out forwards`;
        setTimeout(() => {
          section3Text.current.style.opacity = 1;
        }, 800);
      } 
      
      else if (destination.index === 3) {
        //당신의 이야기를 담아
        section4CenterLine1.current.style.animation = `centerLineShow-1 1s ease-in-out forwards`;
        setTimeout(() => {
          section4Text.current.style.opacity = 1;
        }, 800);
      } 
      
      else if (destination.index === 4) {
        //전구 빛나는 섹션
        section5CenterLine.current.style.animation = `centerLineShow-3 1s ease-in-out forwards`;
        setTimeout(() => {
          light.current.style.animation = `light 1.5s ease forwards`;
        }, 1000);
        setTimeout(() => {
          section5CenterLine.current.style.opacity = 0;
          section5.current.style.background = `url('/src/pages/main/img/main/${isMobile ? 'img-4-m.png' : 'img-4.png'}') center/cover`;
        }, 1500);
        setTimeout(() => {
          section5Text.current.style.opacity = 1;
        }, 2000);
      } 
      
      else if (destination.index === 5) {
        //햇님달님 영업부 없이, 오직 기획과 실행력으로
        setTimeout(() => section6Title.current.style.opacity = 1, 800);
        setTimeout(() => section6Trophy.current.style.opacity = 1, 1000);
        if (!isMobile) {
          setTimeout(() => section6ContentsLeft.current.style.clipPath = 'inset(0 0 0 0)', 1500);
          setTimeout(() => section6ContentsRight.current.style.clipPath = 'inset(0 0 0 0)', 2000);
        }
      } 

      else if (isMobile && destination.index === 6) {
        //섹션7: mobile only
        setTimeout(() => section7Top.current.style.opacity = 1, 800);
        setTimeout(() => section7Bottom.current.style.opacity = 1, 1000);
      } 
      
      else if (!isMobile && destination.index === 7) {
        //카운팅 페이지: PC
        setShowCountPage(true)
        if(!isMobile && origin.index === 6 && destination.index === 7) {
          setTimeout(() => countPageVideo.current.classList.add('fadeIn'), 500);
          setTimeout(() => countPageTitle.current.style.opacity = 1, 1000);
          setTimeout(() => countPageNum.current.style.opacity = 1, 1500);
        }
      }

      else if (isMobile && destination.index === 8) {
        //카운팅 페이지: 모바일
        setShowCountPage(true)
        if(isMobile && origin.index === 7 && destination.index === 8) {
          setTimeout(() => countPageVideo.current.classList.add('fadeIn'), 500);
          setTimeout(() => countPageTitle.current.style.opacity = 1, 1000);
          setTimeout(() => countPageNum.current.style.opacity = 1, 1500);
        }
      }

      else if (!isMobile && destination.index === 8) {
        //카운팅 다음 페이지: PC
        setTimeout(() => setShowAfterCountText(true), 500);
      }

      else if (isMobile && destination.index === 9) {
        //카운팅 다음 페이지: 모바일
        setTimeout(() => setShowAfterCountText(true), 500);
      }
  };


  const fullPageAnchors = isMobile ? ['sec1', 'sec2', 'sec3', 'sec4', 'sec5', 'sec6', 'sec7', 'sec8', 'sec9', 'sec10', 'sec11', 'sec12'] 
                                    : ['sec1', 'sec2', 'sec3', 'sec4', 'sec5', 'sec6', 'sec7', 'sec8', 'sec9', 'sec10', 'sec11'];

  
  
  return (
    <>
      <Buttons show={isButtonsShow} isMobile={isMobile}/>
      
      <ReactFullpage
        //fullpage options
        licenseKey = {'gplv3-license'}
        scrollingSpeed = {800} /* Options here */
        onLeave={handleLeave}
        // navigation={true}
        anchors={fullPageAnchors}
        normalScrollElements='.portfolio-detail' //일부 요소를 스크롤 가능하게 함. 단, 섹션 자체에 적용하면 안됨.
        // touchSensitivity = {10} //터치민감도
        render={({ state, fullpageApi }) => {
          fullpageApiRef.current = fullpageApi;
          return (
            <ReactFullpage.Wrapper>

              <ScrollIcon show={isScrollIconShow} isMobile={isMobile}/>



              <div id="section-1" className="section">
                <div className='start-dimemd' ref={startDimmed}></div>
                <div className='main-text'>
                {isVideoReady &&
                  <ReactTyped
                    strings={["세상에 알리고 싶은"]}
                    typeSpeed={50}
                    onComplete={mainText2Motion}
                    showCursor={false}
                  />
                }
                  <div ref={mainText2Wrapper} className='main-text-2 dangdanghae'>
                    <span>[</span>
                    <span>]</span>
                    <span>
                      {showMainText2 && ( 
                        <ReactTyped
                          strings={["당신의 이야기"]}
                          typeSpeed={60}
                          onComplete={showIcons}
                          showCursor={false}
                        />
                      )}
                    </span>
                  </div>
                </div>
                <div className='dimmed'></div>
                <video
                  loop
                  data-autoplay
                  data-keepplaying //슬라이드를 벗어나도 일시정지 되지 않고 계속 재생됨.
                  muted
                  playsInline //영상이 사진처럼 글 안에서 재생되게끔 하는 속성. 안하면 페이지 로드시 영상이 자동으로 전체 모드가 된다.
                  preload="metadata"
                  // onLoadedMetadata={() => setIsVideoReady(true)}
                >
                  <source data-src='/video/video-1.mp4' type='video/mp4'/>
                </video>
                <button onClick={() => fullpageApi.moveSectionDown()}>
                  {/* Click me to move down */}
                </button>
              </div>



              <div id="section-2" className="section" ref={section2}>
                <p className='inner-text dangdanghae' ref={section2Text}>사람들에게 닿을 수 있도록</p>
                <div className='section-2-circle-wrapper'>
                  <div className='section-2-circle' ref={section2Circle}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="section-2-bg" ref={section2Bg}>
                    <span className="cir01"></span>
                    <span className="cir02"></span>
                    <span className="cir03"></span>
                  </div>
                </div>
                <span className='center-line' ref={section2CenterLine}></span>
              </div>



              <div id="section-3" className="section">
                <div className='inner-text dangdanghae' ref={section3Text}>
                  <div className='text-1'>밤낮으로 고민하는</div>
                  <div className='text-2'>햇님달님</div>
                </div>
                <span className='center-line-1' ref={section3CenterLine1}></span>
                {/* <span className='center-line-2' ref={section3CenterLine2}></span> */}
              </div>



              <div id="section-4" className="section">
                <p className='inner-text dangdanghae' ref={section4Text}>
                  당신의 이야기를 담아
                </p>
                <span className='center-line-1' ref={section4CenterLine1}></span>
                {/* <span className='center-line-2' ref={section4CenterLine2}></span> */}
              </div>



              <div id="section-5" className="section" ref={section5}>
                <div className='inner-text dangdanghae' ref={section5Text}>
                  <div>효과적인 스토리텔링으로</div>
                  <span className='point-text'>[당신의 이야기]</span>
                  <span>널리 알립니다.</span>
                </div>
                <div className='light' ref={light}></div>
                <span className='center-line' ref={section5CenterLine}></span>
              </div>



              <div id='section-6' className='section'>
                  <div className='title dangdanghae' ref={section6Title}>
                    <div className='text-wrapper'>
                      <img src={doubleQuotesLeft} alt='' className='double-quotes-left'/>
                      <div className='text'>햇님달님 영업부 없이,</div>
                      <div className='text'>오직 기획과 실행력으로</div>
                      <img src={doubleQuotesRight} alt='' className='double-quotes-right'/>
                    </div>
                  </div>
                  <div className='contents'>
                    <div className='left' ref={section6ContentsLeft}>
                      <div className='text'>
                        <div className='title'>
                          <img src={check} alt='' className='check'/>
                          <span className='dangdanghae'>첫 이야기</span>
                        </div>
                        <div className='inner-text'>
                          <span className='bold'>2012년 광고를 좋아하는 사람</span>들이<br/>모여 시작된 <span className='bold'>햇님달님의 이야기.</span><br/>
                          <span className='bold'>영업부 없이</span> 기획과 실행력으로<br/>쌓아 올린 <span className='bold'>탄탄한 경험과 성과.</span>
                        </div>
                      </div>
                      <img src={btnLeft} alt='' className='btn btn-left'/>
                    </div>
                    <div className='trophy' ref={section6Trophy}><img src={trophy} alt=''/><span>*2012년부터 쌓아온 광고 경험과 비즈니스 파트너쉽</span></div>
                    <div className='right' ref={section6ContentsRight}>
                      <img src={btnRight} alt='' className='btn btn-right'/>
                      <div className='text'>
                        <div className='title'>
                          <img src={check} alt='' className='check'/>
                          <span className='dangdanghae'>성장하는 동행</span>
                        </div>
                        <div className='inner-text'>
                          단순 광고 대행으로 그치지 않고<br/><span className='bold'>밤낮없이 고민하며 함께한 성장.</span><br/>
                          과정과 결과를 기반으로 이어지는<br/><span className='bold'>햇님달님 비즈니스 파트너쉽.</span>
                        </div>
                      </div>
                      </div>
                  </div>
              </div>



              {isMobile && (<div id='section-7' className='section'>
                <div className='contents'>
                    <div className='top' ref={section7Top}>
                      <div className='title'>
                        <img src={check} alt='' className='check'/>
                        <span className='dangdanghae'>첫 이야기</span>
                      </div>
                      <div className='inner-text'>
                        <span className='bold'>2012년 광고를 좋아하는 사람</span>들이<br/>모여 시작된 <span className='bold'>햇님달님의 이야기.</span><br/>
                        <span className='bold'>영업부 없이</span> 기획과 실행력으로<br/>쌓아 올린 <span className='bold'>탄탄한 경험과 성과.</span>
                      </div>
                    </div>
                    <div className='bottom' ref={section7Bottom}>
                        <div className='title'>
                          <img src={check} alt='' className='check'/>
                          <span className='dangdanghae'>성장하는 동행</span>
                        </div>
                        <div className='inner-text'>
                          단순 광고 대행으로 그치지 않고<br/><span className='bold'>밤낮없이 고민하며 함께한 성장.</span><br/>
                          과정과 결과를 기반으로 이어지는<br/><span className='bold'>햇님달님 비즈니스 파트너쉽.</span>
                        </div>
                      </div>
                  </div>
              </div>)}



              <Portfolio isMobile={isMobile}/>



              <CountPage show={showCountPage} isMobile={isMobile} isTablet={isTablet} countPageVideo={countPageVideo} countPageTitle={countPageTitle} countPageNum={countPageNum}/>



              <div id='after-count-page' className='section'>
                <div className='text-container'>
                  <div className='title'>
                    <p className='dangdanghae'>
                      {showAfterCountText &&
                        <ReactTyped
                          strings={["당신이 알리고 싶은<br/>이야기는 무엇인가요?"]}
                          typeSpeed={40}
                          showCursor={false}
                        />}
                    </p>
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
                >
                  <source data-src='/video/video-2.mp4' type='video/mp4'/>
                </video>
              </div>



              <Contact/>



              <Footer/>



            </ReactFullpage.Wrapper>
          );
        }}
      />
    </>
  );
}

export default App;
