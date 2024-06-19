import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';
import useVisitorData from './useVisitorData';
import useChart from './useChart';

const AreaChartJs = ({ type, selectedDate }) => {

	const canvasRef = useRef(null);
	const canvasID = `visitor-${type}-chart`;
	const { data, getVisitorData } = useVisitorData(type, selectedDate);
	const { chartData, makeChart } = useChart();

	useEffect(()=>{
		if(selectedDate) {
			getVisitorData(selectedDate)
		}
	},[selectedDate])
	
	useEffect(() => {
		// console.log("4", data)
		if(data.list) {
			// console.log("5", data)
			makeChart(data, type)
		}
		
	}, [data]);

	useEffect(() => {
		const chartInstance = new Chart(canvasRef.current, chartData);

		return () => {
			chartInstance.destroy();
		};
	}, [chartData])

	return (
		<>
			<div dir="ltr">
				<div className="mt-3 chartjs-chart" style={{ height: 320 }}>
					<canvas ref={canvasRef} id={canvasID} data-colors="#727cf5,#0acf97" />
				</div>
			</div>
		</>
	);
};

export default AreaChartJs;
