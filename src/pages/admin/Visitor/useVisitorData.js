import { visitorApi } from '@/common/api';
import { useState } from 'react';

export default function useVisitorData(type) {

    const [ data, setData ] = useState([]);

    const getVisitorData = async ( selectedDate ) => {

        const formatDate = selectedDate.toISOString().split('T')[0];

        try {
            const res = await ( type === 'day' ? visitorApi.visitorTime(formatDate) :
                                type === 'week' ? visitorApi.visitorWeek(formatDate) :
                                type === 'month' ? visitorApi.visitorMonth(formatDate) :
                                null )
            if(res) setData(res);
        } catch (error) {
            console.log(error)
        }
        
    }

    return { data, getVisitorData };
}