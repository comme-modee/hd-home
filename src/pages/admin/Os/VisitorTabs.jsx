import React from 'react';
import { Row, Col, Card, Tab, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import VisitorDatePicker from './VisitorDatePicker';

const tabContents = [
  { id: '1', title: '일간' },
  { id: '2', title: '주간' },
  { id: '3', title: '월간' },
];

const VisitorTabs = () => {
  return (
    <Row>
      <Col xs={12}>
        <Card>
            <Tab.Container defaultActiveKey="일간">
              <Nav variant="tabs">
                {tabContents.map((tab) => (
                  <Nav.Item key={tab.id}>
                    <Nav.Link as={Link} to="" eventKey={tab.title}>
                      <span>{tab.title}</span>
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
              <Card.Body>
                <Tab.Content>
                  {tabContents.map((tab) => (
                    <Tab.Pane eventKey={tab.title} id={tab.id} key={tab.id}>
                      <Row>
                        <Col sm="12">
                          <div>
                            <VisitorDatePicker type={tab.id === '1' ? 'day' : tab.id === '2' ? 'week' : 'month'} title={tab.title} />
                          </div>
                        </Col>
                      </Row>
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Card.Body>
            </Tab.Container>
        </Card>
      </Col>
    </Row>
  );
};

export default VisitorTabs;
