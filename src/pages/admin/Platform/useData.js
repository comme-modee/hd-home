import { platformApi } from "@/common";
import { useState } from "react";

export default function useData() {

    const [ dataTemp, setDataTemp ] = useState([]);

    const getData = async ( type, selectedDate ) => {

        const formatDate = selectedDate.toISOString().split('T')[0];

        try {
            const res = await ( type === 'day' ? platformApi.platformDay(formatDate) :
                                type === 'week' ? platformApi.platformWeek(formatDate) :
                                type === 'month' ? platformApi.platformMonth(formatDate) :
                                null );

            if (res) setDataTemp(res);
        } catch (error) {
            
        }
    }

    let data;

    if (dataTemp.length !== 0) {
        data = dataTemp.list.sort((a, b) => b.cnt - a.cnt);
    } 

    return { data, getData };
}