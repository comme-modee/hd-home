import React from 'react'
import { Row, Col } from 'react-bootstrap'
import VisitorTabs from './VisitorTabs'


const Ref = () => {
  return (
    <>
      <Row>
        <Col xs={12}>
          <div className="page-title-box">
            <h4 className="page-title">유입경로</h4>
          </div>
        </Col>
      </Row>
      <VisitorTabs/>
    </>
  )
}

export default Ref