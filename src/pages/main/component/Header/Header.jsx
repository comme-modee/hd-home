import React, { useEffect, useRef } from 'react';
import './Header.style.css';

const Header = ({show}) => {
    const header = useRef('');

    useEffect(()=>{
        if(show) {
            header.current.style.opacity = '1';
        } else {
            header.current.style.opacity = '0';
        }
    },[show])

    return (
        <header ref={header}>
            <div>햇님달님</div>
            <nav>
            <ul>
                <li><a href='/'>함께한 이야기</a></li>
                <li><a href='/'>광고 문의</a></li>
            </ul>
            </nav>
        </header>
    )
}

export default Header