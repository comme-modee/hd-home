import React, { useEffect, useRef, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Portfolio.css';
import usePortfolio from '@/pages/admin/Portfolio/usePortfolio';



const Portfolio = ({ isMobile, isTablet }) => {
    const { portfolioList, getPortfolioList } = usePortfolio();
    const [ chunkedPortfolioList, setChunkedPortfolioList ] = useState([]);
    const [showOverlay, setShowOverlay] = useState({});
    
    const chunk = (array, size) => {
        const chunkedArr = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArr.push(array.slice(i, i + size));
        }
        return chunkedArr;
    };

    const [ settings, setSettings ] = useState({
        dots: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        draggable: false, //PC에서 슬라이드 드래그할수있는지 여부
        // touchMove: false, //모바일 터치로 슬라이드 드래그할수있는지 여부
        centerMode: true,
        centerPadding: '0px'
    });
    
    useEffect(() => {
        getPortfolioList();
    },[])

    useEffect(() => {
        if(portfolioList && portfolioList.length > 0) {
            if(isMobile) {
                setChunkedPortfolioList(chunk(portfolioList, 1));
            } else if(isTablet) {
                setChunkedPortfolioList(chunk(portfolioList, 4))
            } else {
                setChunkedPortfolioList(chunk(portfolioList, 6))
            }
        }
        if(isMobile) {
            setSettings({...settings, centerPadding: '20px'})
        } else {
            setSettings({...settings, centerPadding: '0px'})
        }
    },[portfolioList, isMobile, isTablet])


    const handleItemClick = (item) => {
        if (isMobile) {
            setShowOverlay(prevState => ({
                ...prevState,
                [item.pt_seq]: !prevState[item.pt_seq]
            }));
        }
    };


    return (
        <div id='section-8' className='section'>
            <div className='slider'>
                <Slider {...settings}>
                    {chunkedPortfolioList.map((chunk, index) => (
                        <div key={index}>
                            {chunk.map((item) => (
                                <div className='item' key={item.pt_seq} onClick={() => handleItemClick(item)}>
                                    <div className={`overlay ${showOverlay[item.pt_seq] ? 'active' : ''}`}>
                                        <div className='laundry mb-2'>{item.pt_name}</div>
                                        <div className='laundry mission'>{item.pt_mission1 || ''}</div>
                                        <div className='laundry mission mb-2'>{item.pt_mission2 || ''}</div>
                                        <div className='contents'>{item.pt_contents1 || ''}</div>
                                        <div className='contents'>{item.pt_contents2 || ''}</div>
                                        <div className='contents'>{item.pt_contents3 || ''}</div>
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