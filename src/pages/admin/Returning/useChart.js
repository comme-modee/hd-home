import { hexToRGB } from '@/utils';
import { useState } from 'react';

export default function useChart() {

    const [ chartData, setChartData ] = useState({})

    const makeChart = async ( data, type ) => {

        let labels = [];
        let visitCount = [];

        if(type === 'day') {
            labels = data.list.map(i => i.hour);
            visitCount = data.list.map(i => i.visitors);
        } else if(type === 'week') {
            labels = data.list.map(i => i.weekday);
            visitCount = data.list.map(i => i.visitors);
        } else if(type === 'month') {
            labels = data.list.map(i => i.day);
            visitCount = data.list.map(i => i.visitors);
        }


        let editChartData = {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: '방문자 수',
                        data: visitCount,
                        borderColor: ['#727cf5'],
                        backgroundColor: hexToRGB('#727cf5', 0.3),
                        fill: !1
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                        position: 'top',
                    },
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                        },
                    },
                    y: {
                        grid: {
                            display: false,
                        },
                        ticks: {
                            stepSize: 1,
                        }
                    },
                },
            },
        };
        setChartData(editChartData)
    }

    return { chartData, makeChart };
}