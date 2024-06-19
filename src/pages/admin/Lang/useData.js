import { langApi } from "@/common";
import { useState } from "react";

export default function useData() {

    const [ data, setData ] = useState([]);

    const getData = async ( type, selectedDate ) => {

        const formatDate = selectedDate.toISOString().split('T')[0];

        try {
            const res = await ( type === 'day' ? langApi.langDay(formatDate) :
                                type === 'week' ? langApi.langWeek(formatDate) :
                                type === 'month' ? langApi.langMonth(formatDate) :
                                null )
            if(res) setData(res.list);
        } catch (error) {
            console.log(error)
        }
        
    }

    const colors = ["#727cf5", "#6c757d", "#0acf97", "#fa5c7c", "#e3eaef"];

    const labels = data.map(i => i.languageSetting || '알수없음');
    const series = data.map(i => i.cnt);

    const chartData = {
        chart: {
            height: 320,
            type: 'pie',
        },
        series: series,
        labels: labels,
        colors: colors,
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            // verticalAlign: "middle",
            floating: false,
            fontSize: '14px',
            offsetX: 0,
            offsetY: 7,
        },
        responsive: [
            {
                breakpoint: 600,
                options: {
                    chart: {
                        height: 320,
                    },
                    legend: {
                        show: true,
                    },
                },
            },
        ],
    };

    return { chartData, getData };
}