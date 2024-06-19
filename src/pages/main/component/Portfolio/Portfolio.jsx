import React, { useEffect, useRef, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Portfolio.css';
import usePortfolio from '@/pages/admin/Portfolio/usePortfolio';


const chunk = (array, size) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
        chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
};

const Portfolio = ({ isMobile }) => {
    const { portfolioList, getPortfolioList } = usePortfolio();
    const [ chunkedPortfolioList, setChunkedPortfolioList ] = useState([]);
    const [ detailPage, setDetailPage ] = useState(null);
    const detailPageRef = useRef();
    const closeBtnRef = useRef();
    const settings = {
        dots: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        draggable: false, //PC에서 슬라이드 드래그할수있는지 여부
        // touchMove: false, //모바일 터치로 슬라이드 드래그할수있는지 여부
        ...(isMobile && { centerMode: true, centerPadding: '20px' })
    };
    
    useEffect(() => {
        getPortfolioList();
    },[])

    useEffect(() => {
        if(portfolioList && portfolioList.length > 0) {
            if(isMobile) {
                setChunkedPortfolioList(chunk(portfolioList, 1));
            } else {
                setChunkedPortfolioList(chunk(portfolioList, 6))
            }
        }
    },[portfolioList])
    
    useEffect(()=>{
        if(detailPage !== null) {
            detailPageRef.current.scrollTo({ top: 0 }); //디테일 페이지 닫았다 열면 다시 스크롤을 위로 올림.
            closeBtnRef.current.style.opacity = '1';
            closeBtnRef.current.style.visibility = 'visible';
            detailPageRef.current.style.opacity = '1';
            detailPageRef.current.style.visibility = 'visible';
        } 
    },[detailPage])
    
    const closeDetailPage = () => {
        closeBtnRef.current.style.opacity = '0';
        closeBtnRef.current.style.visibility = 'hidden';
        detailPageRef.current.style.opacity = '0';
        detailPageRef.current.style.visibility = 'hidden';
        setTimeout(() => {
            setDetailPage(null)
        }, 300);
    }

    return (
        <div id='section-8' className='section'>
            <div className='portfolio-detail-close-btn' ref={closeBtnRef} onClick={() => closeDetailPage()}><i className='ri-close-line'/></div>
            <div className='portfolio-detail' ref={detailPageRef}>
                <div className='main-img'>
                    <img src={detailPage?.pt_img} alt={detailPage?.pt_name}/>
                </div>
                <div className='content'>
                    <div className='name'>{detailPage?.pt_name}</div>
                    <div className='box' style={{ backgroundColor: detailPage?.pt_goal_c }}>
                        <div>마케팅 목표</div>
                        <div>{detailPage?.pt_goal}</div>
                    </div>
                    <div className='box' style={{ backgroundColor: detailPage?.pt_manage_c }}>
                        <div>운영/관리</div>
                        <div>{detailPage?.pt_manage}</div>
                    </div>
                    <div className='box' style={{ backgroundColor: detailPage?.pt_activity_c }}>
                        <div>마케팅 활동</div>
                        <div>{detailPage?.pt_activity}</div>
                    </div>
                </div>
            </div>
            <div className='title dangdanghae'>[ 함께한 이야기 ]</div>
            <div className='slider'>
                <Slider {...settings}>
                    {chunkedPortfolioList.map((chunk, index) => (
                        <div key={index}>
                            {chunk.map((item) => (
                                <div className='item' key={item.pt_seq} onClick={() => setDetailPage(item)}>
                                    <div className='overlay laundry'>
                                        <div className='dot'>●</div>
                                        <div>{item.pt_name}</div>
                                    </div>
                                    <img src={item.pt_thumbnail} alt={item.pt_name}/>
                                </div>
                            ))}
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default Portfolio