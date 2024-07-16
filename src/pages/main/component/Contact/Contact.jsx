import React from 'react'
import './Contact.css'
import useContact from '../../hook/useContact';
import StatusMessage from './StatusMessage';
import downloadIcon from '../../img/icon/contact-download.png';
import { useRef } from 'react';
import PrivacyPolicyDetailInfo from './PrivacyPolicyDetailInfo';
import { faXmarkSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Spinner } from '@/components';
import CompanyIntroduction from '../../download/Company-Introduction.pdf'

const Contact = ({ fullpageApi, contact }) => {
    const { loading, handleFileChange, inquiry, statusMessage } = useContact();
    const privacyPolicy = useRef(null)

    const openPrivacyPolicy = () => {
        privacyPolicy.current.style.opacity = 1;
        privacyPolicy.current.style.visibility = 'visible';
    }

    const closePrivacyPolicy = () => {
        privacyPolicy.current.style.opacity = 0;
        privacyPolicy.current.style.visibility = 'hidden';
    }

    return (
        <div id='contact' className='section' ref={contact}>
            <div className='privacy-policy' ref={privacyPolicy}>
                <div className='header dangdanghae'>
                    <div>개인정보 처리방침</div>
                    <FontAwesomeIcon icon={faXmarkSquare} className='close-btn' onClick={() => closePrivacyPolicy()}/>
                </div>
                <PrivacyPolicyDetailInfo/>
            </div>
            <div className='content-wrapper'>
                <div className='title dangdanghae'>광고&캠페인 상담 문의</div>
                {statusMessage && <StatusMessage statusMessage={statusMessage}/>}
                <form onSubmit={inquiry}>

                    <div className='form-title'>기본정보</div>
                    <div className='form-row'>
                        <label><span>회사명*</span><input id='company' name='company' type='text' required/></label>
                        <label><span>담당자명*</span><input id='name' name='name' type='text' required/></label>
                    </div>
                    <div className='form-row'>
                        <label><span>연락처*</span><input id='tel' name='tel' type='number' maxLength='11' required/></label>
                        <label><span>이메일*</span><input id='email' name='email' type='email' required/></label>
                    </div>
                    <div className='form-row'>
                        <label>
                            <span>문의 분야</span>
                            <select name='field' defaultValue='통합 캠페인'>
                                <option value='통합 캠페인'>통합 캠페인</option>
                                <option value='온라인 캠페인'>온라인 캠페인</option>
                                <option value='바이럴 마케팅'>바이럴 마케팅</option>
                                <option value='인플루언서 마케팅'>인플루언서 마케팅</option>
                                <option value='제작/촬영'>제작/촬영</option>
                                <option value='기타'>기타</option>
                            </select>
                        </label>
                        <label><span>첨부파일</span><input id='file' name='file' type='file' onChange={handleFileChange}/></label>
                    </div>                    

                    <div className='form-title'>문의 내용</div>
                    <textarea className='contact-textarea' name='content'/>

                    <div className='privacy-consent'>
                        <label className='privacy-consent-checkbox'><input type='checkbox' required/><span>개인정보 처리방침에 동의합니다.</span></label>
                        <div onClick={() => {fullpageApi.moveTo(11); openPrivacyPolicy()}}>자세히 보기</div>
                    </div>

                    <button type='submit'>{loading ? <Spinner color='light' className='m-auto spinner-border-sm'/> : '문의하기'}</button>
                    <a href={CompanyIntroduction} className='download-btn' download="(주)햇님달님 회사소개서"><img src={downloadIcon} alt='다운로드'/>회사소개서 다운로드</a>
                </form>

            </div>
        </div>
    )
}

export default Contact