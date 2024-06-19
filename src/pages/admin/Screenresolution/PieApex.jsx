import { Col, Row } from 'react-bootstrap';
import { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import useData from './useData';


const PieApex = ({ type, selectedDate }) => {
	const { chartData, getData } = useData();

	useEffect(() => {
		getData(type, selectedDate)
	},[type, selectedDate])
	
	return (
		<>
			<Row>
				<Col xl={12}>
					{chartData.labels.length !== 0 ? 
						<div dir="ltr" className='mt-3 mb-3'>
							<ReactApexChart
								className="apex-charts"
								options={chartData}
								height={320}
								series={chartData.series}
								type="pie"
							/>
						</div>
						: <div className='mt-4 mb-3 text-center'>데이터가 없습니다.</div>
					}
					
				</Col>
			</Row>
		</>
	);
};

export default PieApex;
