import { useEffect } from 'react';
import useData from './useData';
import './Table.css';

const Table = ({ type, selectedDate }) => {

	const { data, getData } = useData();

	useEffect(() => {
		getData(type, selectedDate)
	},[type, selectedDate])

	return (
		<>
			<div className='table'>
				<div className='header'>
					<div className='num'>순위</div>
					<div className='url'>디바이스 정보</div>
					<div className='cnt'>접속 수</div>
				</div>
				<div className='body'>
					{	data && data.length !== 0 ? 
					
						data.map((data, index) => (
							<div key={index} className='content'>
								<div className='num'>{index+1}</div>
								<div className='url'><p>{data.deviceInfo || '알수없음'}</p></div>
								<div className='cnt'>{data.cnt}</div>
							</div> 
						))
						: <div className='m-3'>데이터가 없습니다.</div>
					}
				</div>
			</div>
		</>
	);
};

export default Table;
