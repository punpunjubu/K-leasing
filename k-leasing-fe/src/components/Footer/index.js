import React from 'react'
import { connect } from 'react-redux'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
export const MainFooter = (props) => {
    return (
        <footer className="main-footer border-top">
            <Container className="d-flex h-100 justify-content-end align-items-center" fluid>
                <Row>
                    <Col>
                        <span className="copyright ml-auto my-auto mr-2">{"v2.0.7  Powered by 9Steps"}</span>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(MainFooter)
