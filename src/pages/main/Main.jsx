import { useEffect, useRef, useState } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';

import setVh from './hook/useSetVh';
import Buttons from './component/Buttons/Buttons';
import ScrollIcon from './component/ScrollIcon/ScrollIcon';
import Poster from './img/count-page-poster.png'
import MainPoster from './img/main-poster.png'
import Img4Bg from './img/main/img-4.png'

import './css/Main.css';

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
  const [ showCountPage, setShowCountPage ] = useState(false);
  const [ isMobile, setIsMobile ] = useState(window.innerWidth <= 480);
  const [ isTablet, setIsTablet ] = useState(window.innerWidth <= 768);
  const [ fullpageController, setFullpageController ] = useState(null);

  const startDimmed = useRef(null)
  const mainText1 = useRef(null)
  const mainText2 = useRef(null)
  const mainText2Wrapper = useRef(null)
  const section2 = useRef(null)
  const section2Circle = useRef(null)
  const section2Bg = useRef(null)
  const section2CenterLine = useRef(null)
  const section2Text = useRef(null)
  const section3CenterLine = useRef(null)
  const section3Text = useRef(null)
  const section4 = useRef(null)
  const section4Text = useRef(null)
  const section4CenterLine = useRef(null)
  const light = useRef(null)
  const section5 = useRef(null)
  const section5Title = useRef(null)
  const section5Description = useRef(null)
  const section6 = useRef(null)
  const section6Title = useRef(null)
  const section6Description = useRef(null)
  const section6Department = useRef(null)
  const section7 = useRef(null)
  const section7Title = useRef(null)
  const section7Description = useRef(null)
  const countPageVideo = useRef(null)
  const countPageTitle= useRef(null);
  const countPageNum= useRef(null);
  const afterCountPageText= useRef(null);
  const contact = useRef(null)
  
  const navigate = useNavigate();

  window.addEventListener('resize', () => {
    setVh()
    if(window.innerWidth <= 768) {
      setIsTablet(true)
    } else {
      setIsTablet(false)
    }
    if(window.innerWidth <= 480) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
    
  })

  useEffect(()=>{
    console.log('Made with fullPage.js');
    setVh();
    window.scrollTo(0, 0);

    //새로고침하면 그 페이지에 머물러있는 현상이 있어서 리로드시 '/'로 가게끔 설정
    navigate('/')
    if(isMobile) {
      setTimeout(() => {
        startDimmed.current.style.opacity = 0;
      }, 500);
    } else {
      startDimmed.current.style.opacity = 0;
    }
    setTimeout(() => setIsVideoReady(true), 1000);
  },[])

  const mainText2Motion = () => {
    mainText2Wrapper.current.style.animation = `mainText2Ani 1s cubic-bezier(0.590, 0.010, 0.170, 1.000) forwards`;
    setTimeout(() => {
      mainText2.current.style.opacity = 1;
      setTimeout(() => {
        showIcons();
      }, 700);
    }, 1000);
  }

  const showIcons = () => {
    setButtonsShow(true)
    setIsScrollIconShow(true)
  }

  useEffect(() => {
    if(isVideoReady) {
      mainText1.current.style.opacity = 1;
      setTimeout(() => {
        mainText2Motion()
      }, 500);
    }
  },[isVideoReady])

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
        //당신의 이야기를 담아
        section3CenterLine.current.style.animation = `centerLineShow 1s ease-in-out forwards`;
        setTimeout(() => {
          section3Text.current.style.opacity = 1;
        }, 800);
      } 
      
      else if (destination.index === 3) {
        //전구 빛나는 섹션
        section4CenterLine.current.style.animation = `centerLineShow-short 1s ease-in-out forwards`;
        setTimeout(() => {
          light.current.style.animation = `light 1.5s ease forwards`;
        }, 1000);
        setTimeout(() => {
          section4CenterLine.current.style.opacity = 0;
          section4.current.style.background = `url(${Img4Bg}) center/cover`;
        }, 1500);
        setTimeout(() => {
          section4Text.current.style.opacity = 1;
        }, 2000);
      } 
      
      else if (destination.index === 4) {
        //영업부 없이, 기획과 실행력으로
        setTimeout(() => {
          section5Title.current.style.opacity = 1;
          setTimeout(() => {
            section5Description.current.style.opacity = 1;
          }, 200);
        }, 500);
      } 

      else if (destination.index === 5) {
        //세분화된 부서, 유연한 협업 시너지
        setTimeout(() => {
          section6Title.current.style.opacity = 1;
          setTimeout(() => {
            section6Description.current.style.opacity = 1;
            setTimeout(() => {
              section6Department.current.style.opacity = 1;
            }, 200);
          }, 200);
        }, 500);
      } 

      else if (destination.index === 6) {
        //햇님달님 함께한 이야기
        setTimeout(() => {
          section7Title.current.style.opacity = 1;
          setTimeout(() => {
            section7Description.current.style.opacity = 1;
          }, 200);
        }, 500);
      } 

      
      else if (destination.index === 8) {
        //카운팅 페이지: PC
        setShowCountPage(true)

        setTimeout(() => countPageVideo.current.classList.add('fadeIn'), 500);
        setTimeout(() => countPageTitle.current.style.opacity = 1, 1000);
        setTimeout(() => countPageNum.current.style.opacity = 1, 1500);
      }

      else if (destination.index === 9) {
        //카운팅 다음 페이지
        setTimeout(() => afterCountPageText.current.style.opacity = 1, 500);
      }

  }; 

  const handleFullpageApi = (fullpageApi) => {
    setFullpageController(fullpageApi);
  }
  
  return (
    <>
      <Buttons show={isButtonsShow} fullpageController={fullpageController}/>
      
      <ReactFullpage
        //fullpage options
        licenseKey = {'gplv3-license'}
        scrollingSpeed = {800} /* Options here */
        onLeave={handleLeave}
        // navigation={true}
        // anchors={fullPageAnchors}
        normalScrollElements='.privacy-policy-inner-text' //일부 요소를 스크롤 가능하게 함. 단, 섹션 자체에 적용하면 안됨.
        // touchSensitivity = {10} //터치민감도
        render={({ state, fullpageApi }) => {
          handleFullpageApi(fullpageApi)
          return (
            <ReactFullpage.Wrapper>


              <ScrollIcon show={isScrollIconShow} isMobile={isMobile}/>



              <div id="section-1" className="section">
                <div className='start-dimemd' ref={startDimmed}></div>
                <div className='main-text'>
                  <span ref={mainText1}>세상에 알리고 싶은</span>
                  <div ref={mainText2Wrapper} className='main-text-2 dangdanghae'>
                    <span>[</span>
                    <span>]</span>
                    <span ref={mainText2}>당신의 이야기</span>
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
                  poster={MainPoster}
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
                <p className='inner-text dangdanghae' ref={section3Text}>
                  효과적인 스토리와 {isMobile && <br/>} 기획을 더해
                </p>
                <span className='center-line' ref={section3CenterLine}></span>
              </div>



              <div id="section-4" className="section" ref={section4}>
                <div className='inner-text' ref={section4Text}>
                  <div className='dangdanghae'>당신의 이야기 온 세상에 비춥니다.</div>
                  <span>“막막한 홍보, 마케팅의 빛을 밝히는 햇님달님”</span>
                </div>
                <div className='light' ref={light}></div>
                <span className='center-line' ref={section4CenterLine}></span>
              </div>

              <div id="section-5" className='section' ref={section5}>
                <div className='text'>
                  <div className='title dangdanghae' ref={section5Title}>
                    <p>영업부 없이,</p>
                    <p>기획과 실행력으로</p>
                  </div>
                  <div className='description' ref={section5Description}>
                    <p>
                    2012년, 광고를 사랑하는 사람들이 모여<br/>
                    시작하게 된 햇님달님의 이야기.
                    </p>

                    <p>
                    오직 기획과 실행력으로 쌓아올린<br/>
                    탄탄한 마케팅 경험과 성과.
                    </p>

                    <p>
                    단순 대행에서 멈추지 않고,<br/>
                    함께 성장하는 파트너가 되겠습니다.
                    </p>
                  </div>
                </div>
              </div>

              <div id="section-6" className='section' ref={section6}>
                <div className='text'>
                  <div className='title dangdanghae' ref={section6Title}>
                    <p>세분화된 부서,</p>
                    <p>유연한 협업 시너지</p>
                  </div>
                  <div className='description' ref={section6Description}>
                    <p>
                    유기적인 부서간 협업 진행으로<br/>
                    효율 증대 및 마케팅 목표 달성
                    </p>
                  </div>
                </div>
                <div className='department' ref={section6Department}>
                  <div></div>
                  <div>
                    <div className='dangdanghae'>마케팅 기획부</div>
                    <span>
                      브랜드 컨설팅<br/>
                      통합 마케팅 기획&제안<br/>
                      온/오프라인 광고 대행
                    </span>
                  </div>
                  <div></div>
                  <div>
                    <div className='dangdanghae'>개발사업부</div>
                    <span>
                    웹페이지 제작/운영<br/>
                    웹페이지 관리/보수<br/>
                    프로그램 개발&협업
                    </span>
                  </div>
                  <div>
                    <div className='dangdanghae'>마케팅 관리부</div>
                    <span>
                    콘텐츠 상위노출<br/>
                    백그라운드 작업<br/>
                    목표 타겟  침투
                    </span>
                  </div>
                  <div></div>
                  <div>
                    <div className='dangdanghae'>미디어 촬영부</div>
                    <span>
                    전용 스튜디오<br/>
                    각종 이미지 촬영<br/>
                    영상 기획 및 제작
                    </span>
                  </div>
                  <div></div>
                </div>
              </div>

              <div id="section-7" className='section' ref={section7}>
                <div className='text'>
                  <div className='title dangdanghae' ref={section7Title}>
                    <p>햇님달님</p>
                    <p>함께한 이야기</p>
                  </div>
                  <div className='description' ref={section7Description}>
                    <p>
                    클라이언트의 목표 달성을 위한<br/>
                    차별화된 기획과 실행 이야기
                    </p>
                  </div>
                </div>
              </div>




              <Portfolio isMobile={isMobile} isTablet={isTablet} />



              <CountPage show={showCountPage} isMobile={isMobile} isTablet={isTablet} countPageVideo={countPageVideo} countPageTitle={countPageTitle} countPageNum={countPageNum}/>



              <div id='after-count-page' className='section'>
                <div className='text-container'>
                  <div className='title dangdanghae' ref={afterCountPageText}>
                      당신이 알리고 싶은<br/>
                      이야기는 무엇인가요?
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
                  poster={Poster}
                >
                  <source data-src='/video/video-2.mp4' type='video/mp4'/>
                </video>
              </div>



              <Contact fullpageApi={fullpageApi} contact={contact}/>



              <Footer/>



            </ReactFullpage.Wrapper>
          );
        }}
      />
    </>
  );
}

export default App;
