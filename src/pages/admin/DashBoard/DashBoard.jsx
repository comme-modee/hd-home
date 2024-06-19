import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { CustomDatePicker } from '@/components';
import { useState } from 'react';

//차트&테이블 내용
import VisitorChart from '../Visitor/Chart';
import ReturningChart from '../Returning/Chart'
import PageviewTable from '../Pageview/Table';
import PopularTable from '../Popular/Table';
import PlatformTable from '../Platform/Table';
import RefTable from '../Ref/Table';
import ScreenresolutionChart from '../Screenresolution/PieApex';
import LangChart from '../Lang/PieApex';
import OsChart from '../Os/PieApex';

import './custom.css';

const DashBoard = () => {
  const [ selectedDate, setSelectedDate ] = useState(new Date())

  return (
    <>
      <Row>
				<Col>
					<div className="page-title-box">
						<div className="page-title-right">
							<form className="d-flex">
                <div className='w-240'>
                    <CustomDatePicker
                        maxDate={new Date()}
                        hideAddon={false}
                        dateFormat="yyyy-MM-dd"
                        value={selectedDate}
                        onChange={(date) => {
                        setSelectedDate(date);
                        }}
                    />
								</div>
							</form>
						</div>
						<h4 className="page-title">대시보드</h4>
					</div>
				</Col>
			</Row>
      <Row>
				<Col lg={6}>
					<Card>
            <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="mb-1 font-16 fw-semibold">방문자 통계</div>
            </div>
            <VisitorChart type={'day'} selectedDate={selectedDate}/>
            </Card.Body>
          </Card>
				</Col>
        <Col lg={6}>
          <Card>
            <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="mb-1 font-16 fw-semibold">재방문자수</div>
            </div>
            <ReturningChart type={'day'} selectedDate={selectedDate}/>
            </Card.Body>
          </Card>
				</Col>
			</Row>
      
      <Row>
				<Col lg={6}>
					<Card>
            <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="mb-1 font-16 fw-semibold">페이지뷰 통계</div>
            </div>
            <PageviewTable type={'day'} selectedDate={selectedDate}/>
            </Card.Body>
          </Card>
				</Col>
        <Col lg={6}>
          <Card>
            <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="mb-1 font-16 fw-semibold">유입경로</div>
            </div>
            <RefTable type={'day'} selectedDate={selectedDate}/>
            </Card.Body>
          </Card>
				</Col>
			</Row>

      <Row>
				<Col sm={12}>
					<Card>
            <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="mb-1 font-16 fw-semibold">인기페이지</div>
            </div>
            <PopularTable type={'day'} selectedDate={selectedDate}/>
            </Card.Body>
          </Card>
				</Col>
			</Row>

      <Row>
				<Col sm={12}>
					<Card>
            <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="mb-1 font-16 fw-semibold">플랫폼</div>
            </div>
            <PlatformTable type={'day'} selectedDate={selectedDate}/>
            </Card.Body>
          </Card>
				</Col>
			</Row>

      <Row>
				<Col lg={4}>
					<Card>
            <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="mb-1 font-16 fw-semibold">해상도</div>
            </div>
            <ScreenresolutionChart type={'day'} selectedDate={selectedDate}/>
            </Card.Body>
          </Card>
				</Col>
        <Col lg={4}>
					<Card>
            <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="mb-1 font-16 fw-semibold">언어</div>
            </div>
            <LangChart type={'day'} selectedDate={selectedDate}/>
            </Card.Body>
          </Card>
				</Col>
        <Col lg={4}>
					<Card>
            <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="mb-1 font-16 fw-semibold">운영체제</div>
            </div>
            <OsChart type={'day'} selectedDate={selectedDate}/>
            </Card.Body>
          </Card>
				</Col>
			</Row>
    </>
  )
}

export default DashBoard