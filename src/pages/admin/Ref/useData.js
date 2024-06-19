import { refApi } from "@/common";
import { useState } from "react";

export default function useData() {

    const [ dataTemp, setDataTemp ] = useState([]);

    const getData = async ( type, selectedDate ) => {

        const formatDate = selectedDate.toISOString().split('T')[0];

        try {
            const res = await ( type === 'day' ? refApi.refDay(formatDate) :
                                type === 'week' ? refApi.refWeek(formatDate) :
                                type === 'month' ? refApi.refMonth(formatDate) :
                                null );

            if (res) setDataTemp(res);
        } catch (error) {
            
        }
    }

    let data;

    if (dataTemp.length !== 0) {
        data = Object.values(
            dataTemp.list.reduce((grouped, { referrerData, cnt }) => {
                grouped[referrerData] = { referrerData, cntSum: (grouped[referrerData]?.cntSum || 0) + cnt };
                return grouped;
            }, {})
        ).sort((a, b) => b.cntSum - a.cntSum);    
    } 

    return { data, getData };
}