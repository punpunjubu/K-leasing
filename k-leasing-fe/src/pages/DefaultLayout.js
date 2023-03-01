import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


import MainNavbar from "../components/Navbar";
import MainFooter from "../components/Footer";
import Notification from "../components/Notification";

import _isUndefined from 'lodash/isUndefined'
export const DefaultLayout = ({ children, noNavbar, noFooter }) => (
  <>
    {_isUndefined(noNavbar) && <MainNavbar />}
    <Container className="wrapper" fluid>
      <Row className="py-3">
        <Col>
          {children}
        </Col>
      </Row>
    </Container>
    <Notification />
    {_isUndefined(noNavbar) && <MainFooter />}
  </>
);

