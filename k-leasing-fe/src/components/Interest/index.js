import React, { useState, useEffect, forwardRef } from 'react'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import { Condition } from '../../redux/actions'
import { DateFormatFront } from '../../utils/helpers'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import _isUndefined from 'lodash/isUndefined'

export const Interest = (props) => {
    const { masterInterest: { data, pending, error }, userData: { data: user }, setMaster, loanType: { data: dataLoan }, setLoanType } = props

    const [validated, setValidated] = useState(false)
    const [validatedLoan, setValidatedLoan] = useState(false)
    const [rate_1, setRate_1] = useState(null)
    const [rate_2, setRate_2] = useState(null)
    const [rate_3, setRate_3] = useState(null)
    const [rate_4, setRate_4] = useState(null)
    const [statusSave, setStatusSave] = useState(false)
    useEffect(() => {
        if (!_isUndefined(data) && data.length) {
            if (statusSave) {
                window.location.reload()
            }
            data.map((res, index) => {
                setRate_1(oldData => ({
                    ...oldData,
                    [`${res.master_interest_type}`]: {
                        rate: res.master_interest_start_rate || '',
                        date: 'default'
                    }
                }))
                setRate_2(oldData => ({
                    ...oldData,
                    [`${res.master_interest_type}`]: {
                        rate: res.master_interest_start_rate_1 || '',
                        date: res.master_interest_date_rate_1,
                    }
                }))
                setRate_3(oldData => ({
                    ...oldData,
                    [`${res.master_interest_type}`]: {
                        rate: res.master_interest_start_rate_2 || '',
                        date: res.master_interest_date_rate_2,
                    }
                }))
                setRate_4(oldData => ({
                    ...oldData,
                    [`${res.master_interest_type}`]: {
                        rate: res.master_interest_start_rate_3 || '',
                        date: res.master_interest_date_rate_3,
                    }
                }))
            })

        }
    }, [data])
    useEffect(() => {
        if (!_isUndefined(dataLoan) && dataLoan.length) {
            if (statusSave) {
                window.location.reload()
            }
        }

    }, [dataLoan])

    const performSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true)
            event.preventDefault()
            event.stopPropagation()
        } else {
            let date_1 = DateFormatFront(rate_2.mor.date).format('YYYY/MM/DD')
            let date_2 = DateFormatFront(rate_3.mor.date).format('YYYY/MM/DD')
            let date_3 = DateFormatFront(rate_4.mor.date).format('YYYY/MM/DD')
            if (!rate_2.mlr.rate && !rate_2.mor.rate) {
                date_1 = null
            }
            if (!rate_3.mlr.rate && !rate_3.mor.rate) {
                date_2 = null
            }
            if (!rate_4.mlr.rate && !rate_4.mor.rate) {
                date_3 = null
            }
            const param = {
                rate_1: {
                    mlr: rate_1.mlr.rate,
                    mor: rate_1.mor.rate,
                },
                rate_2: {
                    mlr: rate_2.mlr.rate,
                    mor: rate_2.mor.rate,
                    date: date_1
                },
                rate_3: {
                    mlr: rate_3.mlr.rate,
                    mor: rate_3.mor.rate,
                    date: date_2
                },
                rate_4: {
                    mlr: rate_4.mlr.rate,
                    mor: rate_4.mor.rate,
                    date: date_3
                },
                user_id: user.user_id
            }
            setMaster(param)
            setStatusSave(true)
            // window.location.reload()
        }
        event.preventDefault()
        event.stopPropagation()
    }
    const performSubmitLoan = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setValidatedLoan(true)
            event.preventDefault()
            event.stopPropagation()
        } else {
            let param = dataLoan
            for (let index = 0; index < dataLoan.length; index++) {
                const element = dataLoan[index];
                param[index].loan_type_vat = form[`vat_${element.loan_type_by}`].value
                param[index].loan_type_tax = form[`tax_${element.loan_type_by}`].value
            }
            const paramData = {
                item: param,
                user_id: user.user_id
            }
            setLoanType(paramData)
            setStatusSave(true)
            // window.location.reload()
        }
        event.preventDefault()
        event.stopPropagation()
    }
    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <button type="button" className="btn btn-warning" onClick={onClick} ref={ref}>
            {value ? `Date Start : ${DateFormatFront(value).format('DD-MM-YYYY')}` : 'Set Date Start'}
        </button>
    ));

    return (
        <>
            <Form onSubmit={(e) => performSubmit(e)} noValidate validated={validated} >
                <Card>
                    <Card.Header className="d-flex justify-content-between">
                        <h3>MOR/MLR</h3>
                        <Button variant='primary' type="submit">Set Master</Button>
                    </Card.Header>
                    {
                        !_isUndefined(data) && rate_1 && rate_2 && rate_3 && rate_4 ?
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <Row>
                                                <Col className="py-2">
                                                    <Col>
                                                        {'MOR 1'}
                                                    </Col>
                                                    <Col>
                                                        <Form.Control type="text" name={'mor_1'} value={rate_1.mor.rate} onChange={(e) => setRate_1(oldData => ({
                                                            ...oldData,
                                                            [`mor`]: {
                                                                ...oldData.mor,
                                                                rate: e.target.value,
                                                            }
                                                        }))} required />
                                                    </Col>

                                                </Col>
                                                <Col className="py-2">
                                                    <Col>
                                                        {'MLR 1'}
                                                    </Col>
                                                    <Col>
                                                        <Form.Control type="text" name={'mlr_1'} value={rate_1.mlr.rate} onChange={(e) => setRate_1(oldData => ({
                                                            ...oldData,
                                                            [`mlr`]: {
                                                                ...oldData.mlr,
                                                                rate: e.target.value,
                                                            }
                                                        }))} required />
                                                    </Col>
                                                </Col>
                                            </Row>
                                            <Col>
                                                <Form.Control type="text" name={'date_1'} value='Default' readOnly={true} />
                                            </Col>
                                        </Col>
                                        <Col>
                                            <Row>
                                                <Col className="py-2">
                                                    <Col>
                                                        {'MOR 2'}
                                                    </Col>
                                                    <Col>
                                                        <Form.Control type="text" name={'mor_2'} value={rate_2.mor.rate} onChange={(e) => setRate_2(oldData => ({
                                                            ...oldData,
                                                            [`mor`]: {
                                                                ...oldData.mor,
                                                                rate: e.target.value,
                                                            }
                                                        }))} />
                                                    </Col>
                                                </Col>
                                                <Col className="py-2">
                                                    <Col>
                                                        {'MLR 2'}
                                                    </Col>
                                                    <Col>
                                                        <Form.Control type="text" name={'mlr_2'} value={rate_2.mlr.rate} onChange={(e) => setRate_2(oldData => ({
                                                            ...oldData,
                                                            [`mlr`]: {
                                                                ...oldData.mlr,
                                                                rate: e.target.value,
                                                            }
                                                        }))} />
                                                    </Col>
                                                </Col>
                                            </Row>
                                            <Col>
                                                <DatePicker className="form-control"
                                                    selected={rate_2.mor.date ? new Date(rate_2.mor.date) : null}
                                                    onChange={(date) => setRate_2(oldData => ({
                                                        ...oldData,
                                                        [`mor`]: {
                                                            ...oldData.mor,
                                                            date: date,
                                                        }
                                                    }))}
                                                    customInput={<CustomInput />} />
                                            </Col>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Row>
                                                <Col className="py-2">
                                                    <Col>
                                                        {'MOR 3'}
                                                    </Col>
                                                    <Col>
                                                        <Form.Control type="text" name={'mor_3'} value={rate_3.mor.rate} onChange={(e) => setRate_3(oldData => ({
                                                            ...oldData,
                                                            [`mor`]: {
                                                                ...oldData.mor,
                                                                rate: e.target.value,
                                                            }
                                                        }))} />
                                                    </Col>
                                                </Col>
                                                <Col className="py-2">
                                                    <Col>
                                                        {'MLR 3'}
                                                    </Col>
                                                    <Col>
                                                        <Form.Control type="text" name={'mlr_3'} value={rate_3.mlr.rate} onChange={(e) => setRate_3(oldData => ({
                                                            ...oldData,
                                                            [`mlr`]: {
                                                                ...oldData.mlr,
                                                                rate: e.target.value,
                                                            }
                                                        }))} />
                                                    </Col>
                                                </Col>
                                            </Row>
                                            <Col>
                                                <DatePicker className="form-control"
                                                    selected={rate_3.mor.date ? new Date(rate_3.mor.date) : null}
                                                    onChange={(date) => setRate_3(oldData => ({
                                                        ...oldData,
                                                        [`mor`]: {
                                                            ...oldData.mor,
                                                            date: date,
                                                        }
                                                    }))}
                                                    customInput={<CustomInput />} />
                                            </Col>
                                        </Col>
                                        <Col>
                                            <Row>
                                                <Col className="py-2">
                                                    <Col>
                                                        {'MOR 4'}
                                                    </Col>
                                                    <Col>
                                                        <Form.Control type="text" name={'mor_4'} value={rate_4.mor.rate} onChange={(e) => setRate_4(oldData => ({
                                                            ...oldData,
                                                            [`mor`]: {
                                                                ...oldData.mor,
                                                                rate: e.target.value,
                                                            }
                                                        }))} />
                                                    </Col>
                                                </Col>
                                                <Col className="py-2">
                                                    <Col>
                                                        {'MLR 4'}
                                                    </Col>
                                                    <Col>
                                                        <Form.Control type="text" name={'mlr_4'} value={rate_4.mlr.rate} onChange={(e) => setRate_4(oldData => ({
                                                            ...oldData,
                                                            [`mlr`]: {
                                                                ...oldData.mlr,
                                                                rate: e.target.value,
                                                            }
                                                        }))} />
                                                    </Col>
                                                </Col>
                                            </Row>
                                            <Col>
                                                <DatePicker className="form-control"
                                                    selected={rate_4.mor.date ? new Date(rate_4.mor.date) : null}
                                                    onChange={(date) => setRate_4(oldData => ({
                                                        ...oldData,
                                                        [`mor`]: {
                                                            ...oldData.mor,
                                                            date: date,
                                                        }
                                                    }))}
                                                    customInput={<CustomInput />} />
                                            </Col>
                                        </Col>
                                    </Row>

                                </ListGroup.Item>
                            </ListGroup>
                            :
                            <Col>
                                <h2>No Data</h2>
                            </Col>
                    }
                </Card>
            </Form>
            <Form onSubmit={(e) => performSubmitLoan(e)} noValidate validated={validatedLoan} >
                <Card className="mt-3">
                    <Card.Header className="d-flex justify-content-between">
                        <h3>Loan Type</h3>
                        <Button variant='primary' type="submit">Update Loan Type</Button>
                    </Card.Header>
                    {
                        !_isUndefined(dataLoan) ?
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row >
                                        <Col md={4}>
                                            <h6>{'Name'}</h6>
                                        </Col>
                                        <Col md={4}>
                                            <h6>{'vat %'}</h6>
                                        </Col>
                                        <Col md={4}>
                                            <h6>{'w/h tax %'}</h6>
                                        </Col>
                                    </Row>
                                    {
                                        dataLoan.map((res, index) => {
                                            return (
                                                <Row key={index} className="py-2">
                                                    <Col md={4}>
                                                        <p className="m-0">{`${index + 1}. ${res.loan_type_name}`}</p>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Control type="text" name={`vat_${res.loan_type_by}`} defaultValue={res.loan_type_vat} required />
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Control type="text" name={`tax_${res.loan_type_by}`} defaultValue={res.loan_type_tax} required />
                                                    </Col>
                                                </Row>
                                            )
                                        })
                                    }
                                </ListGroup.Item>
                            </ListGroup>
                            :
                            <Col>
                                <h2>No Data</h2>
                            </Col>
                    }
                </Card>
            </Form>
        </>
    )
}
const mapStateToProps = (state) => {
    const {
        condition: {
            masterInterest,
            loanType
        },
        auth: {
            userData
        }
    } = state
    return {
        masterInterest,
        userData,
        loanType
    }
}

const mapDispatchToProps = {
    setMaster: Condition.setMaster,
    setLoanType: Condition.setLoanType,

}

export default connect(mapStateToProps, mapDispatchToProps)(Interest)
