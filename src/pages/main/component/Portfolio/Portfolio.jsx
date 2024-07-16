import React, { useEffect, useRef, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Portfolio.css';
import usePortfolio from '@/pages/admin/Portfolio/usePortfolio';



const Portfolio = ({ isMobile }) => {
    const { portfolioList, getPortfolioList } = usePortfolio();
    const [ showOverlay, setShowOverlay ] = useState({});

    const settings = {
        // rows: 1,
        // slidesToShow: 4,
        // slidesToScroll: 4,
        // slidePerRow: 4,
        // initialSlide: 1,
        rows: 2,
        slidesPerRow: 4,
        dots: false,
        speed: 500,
        infinite: true,
        draggable: false, //PC에서 슬라이드 드래그할수있는지 여부
        //touchMove: false, //모바일 터치로 슬라이드 드래그할수있는지 여부
        // afterChange: (index) => setCurrentSlide(index),
        responsive: [
            {
                breakpoint: 1780,
                settings: {
                    slidesPerRow: 3,
                }
           },
           {
                breakpoint: 1300,
                settings: {
                    slidesPerRow: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesPerRow: 1
                }
            }
        ]
    };
    
    useEffect(() => {
        getPortfolioList();
    },[])

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
            {portfolioList && portfolioList.length > 0 &&
            <div className='slider'>
                <Slider {...settings}>
                    {portfolioList.map((item, index) => 
                        <div key={`${index}${item.pt_sort}`} className='item' onClick={() => handleItemClick(item)}>
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
                    )}
                </Slider>
            </div>}
        </div>
    )
}

export default Portfolio