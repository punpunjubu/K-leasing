import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Auth } from '../../redux/actions'
import { DateFormat } from '../../utils/helpers'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'

import _isUndefined from 'lodash/isUndefined'
export const Profile = (props) => {
    const { userResetPass, userData, resetPassword } = props
    const [validated, setValidated] = useState(false)
    const [statusSave, setStatusSave] = useState(false)

    const setPassword = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true)
            event.preventDefault()
            event.stopPropagation()
        } else {
            const param = {
                user_id: userData.data.user_id,
                password: form[`password`].value,
                newpassword: form[`newpassword`].value
            }
            resetPassword(param)
        }
        event.preventDefault()
        event.stopPropagation()
    }
    let isError = false
    if (userResetPass.error.error) {
        isError = true
    }
    return (
        <>
            <Form onSubmit={(e) => setPassword(e)} noValidate validated={validated} >
                <Card className="mt-3">
                    <Card.Header className="d-flex justify-content-between">
                        <h3>Reset Password</h3>
                        <Button variant='primary' type="submit">{userResetPass.pending ? <Spinner animation="border" variant="success" /> : 'Save'}</Button>
                    </Card.Header>

                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            {
                                userResetPass.data &&
                                <Alert variant={'success'}>
                                    {'Reset Password Success'}
                                </Alert>
                            }
                            {
                                isError &&
                                <Alert variant={'danger'}>
                                    {userResetPass.error.error}
                                </Alert>
                            }
                            <Row >
                                <Col md={6}>
                                    <h6>{'Current Password'}</h6>
                                </Col>
                                <Col md={6}>
                                    <h6>{'New Password'}</h6>
                                </Col>
                            </Row>
                            <Row className="py-2">
                                <Col md={6}>
                                    <Form.Control type="password" name={`password`} required />
                                </Col>
                                <Col md={6}>
                                    <Form.Control type="password" name={`newpassword`} required />
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>


                </Card>
            </Form>
        </>
    )
}

const mapStateToProps = (state) => {
    const {
        auth: {
            userData,
            userResetPass
        }
    } = state
    console.log(`userData`, userData)
    return {
        userData,
        userResetPass
    }
}

const mapDispatchToProps = {
    resetPassword: Auth.resetPassword
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
