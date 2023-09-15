import React, { useState, useEffect, forwardRef } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import { DateFormat } from '../../utils/helpers'
import { Condition, InputData, Ui } from '../../redux/actions'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'


import _isUndefined from 'lodash/isUndefined'

const ListDate = (props) => {

    let item = []
    for (let index = 1; index <= 31; index++) {
        item.push(<option key={index} value={index}>{index}</option>)
    }
    return item
}

export const SearchInvoice = (props) => {
    const {
        dealerCondition: { data: dealerData },
        invoiceAll: { pending: pendingSearch },
        getStatusFile,
        notification,
        getInvoiceAll,
        dueDate,
        setDueDate,
        setDate,
        dateShow,
        statusFile: { data: statusData } } = props
    const [dateActive, setDateActive] = useState(moment().format('YYYY/MM'))

    useEffect(() => {
        if (!Object.keys(statusData).length) {
            getStatusFile()
        }
    }, [statusData])

    const getInvoice = () => {
        let isData = true
        for (const key in statusData) {
            const item = statusData[key]
            if (!item.length) {
                isData = false
                break
            }
        }
        if (isData) {
            let param = {
                dealer: [],
                date: `${dateActive}/01`
            }

            for (let index = 0; index < dealerData.length; index++) {
                param.dealer.push(dealerData[index].dealer_condition_dealer_code)
            }
            getInvoiceAll(param)
        } else {
            notification({ type: 'error', text: 'Incomplete information' })
        }
    }
    const htmlNoImport = (<span className='text-danger'>No import file</span>)
    // const defaultDueDate = moment().startOf('month').add(9, 'days')
    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <button type="button" className="btn btn-warning" onClick={onClick} ref={ref}>
            {value ? `Date : ${DateFormat(value).format('DD-MM-YYYY')}` : dueDate.format('DD-MM-YYYY')}
        </button>
    ));
    // console.log(`dueDate`, dueDate)
    return (
        <>
            <Card>
                <Card.Header className="d-flex justify-content-between">
                    <h3>Invoice </h3>
                    <Button variant='primary' onClick={() => getInvoice()}>
                        {pendingSearch ? <Spinner animation="border" variant="success" /> : 'Calculate Invoice'}
                    </Button>
                </Card.Header>
                {
                    !_isUndefined(dealerData) ?
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col md={2}>
                                        <p>Month:</p>
                                        <Form.Control type="text" value={dateActive} onChange={(e) => setDateActive(e.target.value)} placeholder="YYYY/MM" />
                                    </Col>
                                    <Col md={2}>
                                        <p>Invoice Date:</p>
                                        <DatePicker
                                            className="form-control"
                                            selected={new Date(dateShow)}
                                            onChange={(date) => setDate(date)}
                                            customInput={<CustomInput />} />

                                    </Col>
                                    <Col md={2}>
                                        <p>Due Date:</p>
                                        <DatePicker
                                            className="form-control"
                                            selected={new Date(dueDate)}
                                            onChange={(date) => setDueDate(date)}
                                            customInput={<CustomInput />} />
                                        {/* <Form.Control as="select" value={dueDate} onChange={(e) => setDueDate(Number(e.target.value))}>
                                            <ListDate />
                                        </Form.Control> */}

                                    </Col>
                                    {
                                        Object.keys(statusData).length &&
                                        <Col className="text-right">
                                            <Col >Master Data : {!_isUndefined(statusData.master_condition) && !_isUndefined(statusData.master_condition[0]) ? moment(statusData.master_condition[0].create_at).format("DD-MM-YYYY") : htmlNoImport}</Col>
                                            <Col >Out Standing : {!_isUndefined(statusData.out_standing) && !_isUndefined(statusData.out_standing[0]) ? moment(statusData.out_standing[0].out_standing_create_at).format("DD-MM-YYYY") : htmlNoImport}</Col>
                                            <Col >Payment : {!_isUndefined(statusData.payment) && !_isUndefined(statusData.payment[0]) ? moment(statusData.payment[0].payment_create_at).format("DD-MM-YYYY") : htmlNoImport}</Col>
                                            <Col >Default : {!_isUndefined(statusData.default_file) && !_isUndefined(statusData.default_file[0]) ? moment(statusData.default_file[0].default_create_at).format("DD-MM-YYYY") : htmlNoImport}</Col>
                                            <Col >Dealer Condition : {!_isUndefined(statusData.dealer_condition) && !_isUndefined(statusData.dealer_condition[0]) ? moment(statusData.dealer_condition[0].dealer_condition_create_at).format("DD-MM-YYYY") : htmlNoImport}</Col>
                                        </Col>
                                    }
                                </Row>


                            </ListGroup.Item>
                        </ListGroup>
                        :
                        <Col>
                            <h2>No Data</h2>
                        </Col>
                }
            </Card>
        </>
    )
}

const mapStateToProps = (state) => {
    const {
        condition: {
            dealerCondition,
            reportByDealer,
            invoiceAll,
            dueDate,
            date: dateShow
        },
        inputData: {
            statusFile
        }
    } = state
    return {
        dealerCondition,
        reportByDealer,
        statusFile,
        invoiceAll,
        dueDate,
        dateShow
    }
}

const mapDispatchToProps = {
    getInvoiceAll: Condition.getInvoiceAll,
    setDueDate: Condition.setDueDate,
    setDate: Condition.setDate,
    getStatusFile: InputData.getStatusFile,
    notification: Ui.notification
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInvoice)
