import { pageviewApi } from "@/common";
import { useState } from "react";

export default function useData() {

    const [ dataTemp, setDataTemp ] = useState([]);

    const getData = async ( type, selectedDate ) => {

        const formatDate = selectedDate.toISOString().split('T')[0];

        try {
            const res = await ( type === 'day' ? pageviewApi.pageviewDay(formatDate) :
                                type === 'week' ? pageviewApi.pageviewWeek(formatDate) :
                                type === 'month' ? pageviewApi.pageviewMonth(formatDate) :
                                null );

            if (res) setDataTemp(res);
        } catch (error) {
            
        }
    }

    let data;

    if (dataTemp.length !== 0) {
        data = Object.values(
            dataTemp.list.reduce((grouped, { visitedPage, cnt }) => {
                grouped[visitedPage] = { visitedPage, cntSum: (grouped[visitedPage]?.cntSum || 0) + cnt };
                return grouped;
            }, {})
        ).sort((a, b) => b.cntSum - a.cntSum);    
    } 

    return { data, getData };
}