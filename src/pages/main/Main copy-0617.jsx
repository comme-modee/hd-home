import { useEffect, useRef, useState } from 'react';
import { ReactTyped } from "react-typed";
import ReactFullpage from '@fullpage/react-fullpage';

import setVh from './hook/useSetVh';
import Buttons from './component/Buttons/Buttons';
import ScrollIcon from './component/ScrollIcon/ScrollIcon';

import './css/Main.css';
import graph from './img/gif/graph.gif';
import hands from './img/section-8-img.png';

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
  const [ showSection3TextWrapper, setShowSection3TextWrapper ] = useState(false);
  const [ showSection3Text, setShowSection3Text ] = useState(false);
  const [ showSection4Text, setShowSection4Text ] = useState(false);
  const [ showSection5Text, setShowSection5Text ] = useState(false);
  const [ showSection6Text, setShowSection6Text ] = useState(false);
  const [ showSection7Text, setShowSection7Text ] = useState(false);
  const [ showAfterCountText, setShowAfterCountText ] = useState(false);
  const [ showCountPage, setShowCountPage ] = useState(false);
  const isMobile = window.innerWidth <= 480;

  const mainText2Wrapper = useRef(null)
  const section2 = useRef(null)
  const section2Circle = useRef(null)
  const section2Bg = useRef(null)
  const section2CenterLine = useRef(null)
  const section2Text = useRef(null)
  const section3TextWrapper = useRef(null)
  const section3CenterLine1 = useRef(null)
  const section3Text = useRef(null)
  const section4CenterLine1 = useRef(null)
  const section4Text = useRef(null)
  const section5CenterLine = useRef(null)
  const section5 = useRef(null)
  const section5Text = useRef(null)
  const light = useRef(null)
  const section6Bg = useRef(null)
  const section6left = useRef(null)
  const section6RightTopText = useRef(null)
  const section6RightBottomTextWrapper = useRef(null)
  const section6RightBottomSmallText = useRef(null)
  const graphRef = useRef(null)
  const section7right = useRef(null)
  const section7Bg = useRef(null)
  const section7LeftTopText = useRef(null)
  const section7LeftBottomTextWrapper = useRef(null)
  const handsRef = useRef(null)
  const countPageVideo = useRef(null)
  const fullpageApiRef = useRef(null)
  
  const navigate = useNavigate();

  window.addEventListener('resize', () => setVh())

  useEffect(()=>{
    console.log('Made with fullPage.js');
    setVh();
    window.scrollTo(0, 0);

    //새로고침하면 그 페이지에 머물러있는 현상이 있어서 리로드시 '/'로 가게끔 설정
    navigate('/')
  },[])

  const mainText2Motion = () => {
    mainText2Wrapper.current.style.animation = `mainText2Ani 1s cubic-bezier(0.590, 0.010, 0.170, 1.000) forwards`;
    setTimeout(() => {
      setShowMainText2(true);
    }, 1000);
  }

  const section3TextMotion = () => {
    section3TextWrapper.current.style.animation = `section3TextAni 1s cubic-bezier(0.590, 0.010, 0.170, 1.000) forwards`;
    setTimeout(() => {
      setShowSection3Text(true);
    }, 1000);
  }

  const section6TextMotion = () => {
    section6RightBottomTextWrapper.current.style.animation = `section6TextAni 1s cubic-bezier(0.590, 0.010, 0.170, 1.000) forwards`;
    setTimeout(() => {
      setShowSection6Text(true);
    }, 1000);
  }

  const section7TextMotion = () => {
    section7LeftBottomTextWrapper.current.style.animation = `section7TextAni 1s cubic-bezier(0.590, 0.010, 0.170, 1.000) forwards`;
    setTimeout(() => {
      setShowSection7Text(true);
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
          light.current.style.animation = `light 1s ease forwards`;
        }, 1000);
        setTimeout(() => {
          section5CenterLine.current.style.opacity = 0;
          section5.current.style.background = `url('/src/pages/main/img/main/img-4.png') center/cover`;
        }, 1500);
        setTimeout(() => {
          section5Text.current.style.opacity = 1;
        }, 2000);
      } 
      
      else if (destination.index === 5) {
        //첫 이야기
        if(isMobile) {
          setTimeout(() => {
            section6left.current.style.opacity = 1;
          }, 1000);
          setTimeout(() => {
            section6RightTopText.current.style.clipPath = `inset(0 0 0 0)`
            setTimeout(() => {
              section6TextMotion();
            }, 500);
          }, 1300);
        } else {
          section6Bg.current.classList.add('animated');
          setTimeout(() => {
            section6left.current.style.opacity = 1;
          }, 1200);
          setTimeout(() => {
            section6RightTopText.current.style.clipPath = `inset(0 0 0 0)`
            setTimeout(() => {
              section6TextMotion();
            }, 500);
          }, 1500);
        }
      } 
      
      else if (destination.index === 6) {
        //성장하는 동행
        if(isMobile) {
          setTimeout(() => {
            section7right.current.style.opacity = 1;
          }, 1000);
          setTimeout(() => {
            section7LeftTopText.current.style.clipPath = `inset(0 0 0 0)`
            setTimeout(() => {
              section7TextMotion();
            }, 500);
          }, 1300);
        } else {
          section7Bg.current.classList.add('animated');
          setTimeout(() => {
            section7right.current.style.opacity = 1;
          }, 1200);
          setTimeout(() => {
            section7LeftTopText.current.style.clipPath = `inset(0 0 0 0)`
            setTimeout(() => {
              section7TextMotion();
            }, 500);
          }, 1500);
        }
      } 
      
      else if (destination.index === 8) {
        //카운팅 페이지
        setShowCountPage(true)
        if(origin.index === 7 && destination.index === 8) {
          setTimeout(() => {
            countPageVideo.current.classList.add('fadeIn');
            }, 500);
          }
      }

      else if (destination.index === 9) {
        //카운팅 다음 페이지
        setTimeout(() => {
          setShowAfterCountText(true)
        }, 500);
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
                  onLoadedMetadata={() => setIsVideoReady(true)}
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
                <div className='content-left' ref={section6left}>
                  <div className='text'>
                    <div className='dangdanghae'>첫 이야기</div>
                    <div>2012년</div>
                  </div>
                </div>
                <div className='content-right'>
                  <div className='text'>
                    <div className='top' ref={section6RightTopText}>
                      <div>영업부 없이 오직 기획과 실행력으로</div>
                      <div>2012년부터 쌓아온 경험과 성과</div>
                    </div>
                    <div className='bottom'>
                      <div ref={section6RightBottomTextWrapper}>
                        <span>[</span>
                        <span>]</span>
                        <div>
                          {showSection6Text &&                          
                            <ReactTyped
                              strings={["광고 경력 12년, 함께한 파트너 3,456"]}
                              typeSpeed={30}
                              onComplete={() => setTimeout(() => {
                                section6RightBottomSmallText.current.style.opacity = 1;
                                setTimeout(() => {
                                  graphRef.current.style.opacity = 1;
                                }, 500);
                              }, 300)}
                              showCursor={false}
                            />
                          }
                        </div>
                      </div>
                      <div ref={section6RightBottomSmallText}>2024년 기준</div>
                    </div>
                  </div>
                  <img className='graph' ref={graphRef} src={graph} alt='그래프'/>
                </div>
                <div className='background' ref={section6Bg}></div>
              </div>
              {isMobile && (<div id='section-7' className='section'>
                <div className='content-left'>
                  <div className='text'>
                    <div className='top' ref={section7LeftTopText}>
                      <div>단순히 광고 대행에서 그치지 않고</div>
                      <div>밤낮없이 고민하며 함께 성장하는</div>
                    </div>
                    <div className='bottom' ref={section7LeftBottomTextWrapper}>
                      <span>[</span>
                      <span>]</span>
                      <div>
                          {showSection7Text &&                          
                            <ReactTyped
                              strings={["비지니스 파트너"]}
                              typeSpeed={60}
                              onComplete={() => handsRef.current.style.opacity = 1}
                              showCursor={false}
                            />
                          }
                      </div>
                    </div>
                  </div>
                  <img className='hands' ref={handsRef} src={hands} alt='악수'/>
                </div>
                <div className='content-right' ref={section7right}>
                  <div className='text'>
                    <div className='dangdanghae'>성장하는 동행</div>
                  </div>
                </div>
                <div className='background' ref={section7Bg}></div>
              </div>)}
              <Portfolio isMobile={isMobile}/>
              <CountPage show={showCountPage} countPageVideo={countPageVideo}/>
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
