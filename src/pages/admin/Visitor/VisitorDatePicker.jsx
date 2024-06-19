import { CustomDatePicker } from '@/components';
import React, { useState } from 'react';
import AreaChartJs from './Chart';


//주차 계산하는 함수
const getWeekOfMonth = (date) => {
    return Math.ceil((date.getDate() + new Date(date.getFullYear(), date.getMonth(), 1).getDay()) / 7);
};

const VisitorDatePicker = ({ type, title }) => {
    const [ selectedDate, setSelectedDate ] = useState(new Date());
    const [ weekOfMonth, setWeekOfMonth ] = useState(getWeekOfMonth(selectedDate));

    const datePickerProps = {
        value: selectedDate,
        onChange: (date) => { 
            setSelectedDate(date); 
            setWeekOfMonth(getWeekOfMonth(date)); // 날짜 변경 시 주차 업데이트
        },
        maxDate: new Date(),
        type,
    };

    return (
        <>
            <div className='mb-1 font-16 fw-semibold'>{title} 방문자 수</div>
            <div className='w-240'>
                <CustomDatePicker
                    {...datePickerProps}
                    dateFormat={type === 'month' ? 'yyyy-MM' : type === 'week' ? `yyyy-MM-${weekOfMonth}주차` : 'yyyy-MM-dd'}
                    customClassName={type === 'week' ? 'week-custom' : ''} // 커스텀 클래스명 추가
                />
            </div>
            <AreaChartJs type={type} selectedDate={selectedDate}/>
        </>
    );
};

export default VisitorDatePicker;
