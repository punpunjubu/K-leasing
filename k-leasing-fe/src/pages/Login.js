import React, { Component } from 'react'
import { connect } from 'react-redux'
import isEqual from 'react-fast-compare'
import { Redirect } from "react-router-dom";

import { Auth } from '../redux/actions'
import { setCookie } from "../utils/storage";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import Image from 'react-bootstrap/Image'

import _isUndefined from 'lodash/isUndefined'
import _isNull from 'lodash/isNull'

export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            validated: false,
            redirect: null
        }
    }
    componentDidMount() {
        const { userData: { data } } = this.props
        console.log(`data`, data)
        if (!_isNull(data) && !_isUndefined(data.user_token)) {
            setCookie('SESSION_TOKEN', JSON.stringify(data.user_token))
            this.setState({ redirect: "/" });
        }
    }

    handleSubmit = (event) => {
        const { initLogin } = this.props
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            this.setState({ validated: true })
            event.preventDefault();
            event.stopPropagation();
        } else {
            const param = {
                username: form['username'].value,
                password: form['password'].value
            }
            initLogin(param)
        }

        event.preventDefault();
        event.stopPropagation();
    };
    componentDidUpdate(prevProps, prevState) {
        const { userData: { data } } = this.props
        const { userData: { data: oldData } } = prevProps
        if (!isEqual(data, oldData) && !_isNull(data) && data.user_token) {
            setCookie('SESSION_TOKEN', JSON.stringify(data.user_token))
            this.setState({ redirect: "/" });
        }
    }

    render() {
        const { userData: { pending, error } } = this.props
        const { validated, redirect } = this.state
        if (redirect) {
            return <Redirect to={redirect} />
        }
        let isError = false
        if (error.error) {
            isError = true
        }
        return (
            <>
                <Container className="wrapper h-100 d-flex justify-content-center align-items-center" >

                    <Row>
                        <Col md={12}>
                            <Row className="py-4">
                                <Col md={12} >
                                <Image src="/images/logo.png" className="image-responsive" rounded />
                                </Col>
                            </Row>
                            <Card className="login">

                                <Card.Header as="h2" className="text-center">Login</Card.Header>
                                <Card.Body>
                                    {
                                        isError &&
                                        <Alert variant={'danger'}>
                                            {error.error}
                                        </Alert>
                                    }
                                    <Form onSubmit={(e) => this.handleSubmit(e)} noValidate validated={validated} >
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control type="text" placeholder="Username" name="username" required />
                                        </Form.Group>

                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Password" name="password" required />
                                        </Form.Group>
                                        <Button variant="primary" type="submit">
                                            {pending ? <Spinner animation="border" variant="light" /> : 'Submit'}
                                        </Button>
                                    </Form>
                                </Card.Body>
                                {/* <Card.Footer className="text-muted"></Card.Footer> */}
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    const {
        auth: {
            userData
        }
    } = state
    return {
        userData
    }
}

const mapDispatchToProps = {
    initLogin: Auth.initLogin,
    setSession: Auth.setSession,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
