import React, { Component } from 'react'
import { connect } from 'react-redux'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

export class Home extends Component {
    constructor(props) {
        super(props)

    }

    render() {

        return (
            <>
                <Container className="p-5">
                    <Row>
                        <Col xs={6} md={4}>
                        </Col>
                        <Col xs={6} md={4}>
                            <Image src="/images/logo.png" className="image-responsive" rounded />
                        </Col>
                        <Col xs={6} md={4}>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} md={4}>
                        </Col>
                        <Col xs={6} md={4}>
                            <h3 className="text-center py-5">Welcome</h3>
                        </Col>
                        <Col xs={6} md={4}>
                        </Col>
                    </Row>
                </Container>
            </>

        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
