import { returningApi } from '@/common/api';
import { useState } from 'react';

export default function useVisitorData(type) {

    const [ data, setData ] = useState([]);

    const getVisitorData = async ( selectedDate ) => {

        const formatDate = selectedDate.toISOString().split('T')[0];

        try {
            const res = await ( type === 'day' ? returningApi.returningDay(formatDate) :
                                type === 'week' ? returningApi.returningWeek(formatDate) :
                                type === 'month' ? returningApi.returningMonth(formatDate) :
                                null )
            if(res) setData(res);
        } catch (error) {
            console.log(error)
        }
        
    }

    return { data, getVisitorData };
}