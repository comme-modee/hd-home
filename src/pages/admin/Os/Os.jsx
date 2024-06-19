import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import VisitorTabs from './VisitorTabs'


const Os = () => {
  return (
    <>
      <Row>
        <Col xs={12}>
          <div className="page-title-box">
            <h4 className="page-title">운영체제</h4>
          </div>
        </Col>
      </Row>
      <VisitorTabs/>
    </>
  )
}

export default Os