import React, { useEffect } from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div id='mainFooter' className='section fp-auto-height'>
        <footer>
          <div><span className='bold'>Tel</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='bold'>E-mail</span></div>
          <div>경기도 고양시 일산서구 킨텍스로 255 디엠시티스카이뷰 오피스동 1504-1507호</div>
          <div>&copy; 햇님달님</div>
        </footer>
    </div>
  )
}

export default Footer