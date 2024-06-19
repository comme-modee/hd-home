import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import Table from './Table';


const Contact = () => {
  
  return (
    <>
      <Row>
        <Col xs={12}>
          <div className="page-title-box">
            <h4 className="page-title">문의 관리</h4>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Card>
            <Card.Body>
              <Table/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Contact