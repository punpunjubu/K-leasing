import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { Condition, InputData,Ui } from '../../redux/actions'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'


import _isUndefined from 'lodash/isUndefined'
import _ from 'lodash'
export const SearchBarReport = (props) => {
    const {
        dealerCondition: { data, pending, error },
        reportByDealer: { pending: pendingSearch },
        getSearchReport,
        datePropsActive,
        getStatusFile,
        notification,
        statusFile: { data: statusData },
         } = props

    const [activeDealer, setActiveDealer] = useState('F1069001')
    const [dateActive, setDateActive] = useState(moment().format('YYYY/MM'))

    useEffect(() => {
        if (!Object.keys(statusData).length) {
            getStatusFile()
        }
    }, [statusData])
    const searchBarReport = () => {
        const param = {
            dealer: activeDealer,
            date: `${dateActive}/01`
        }

        let isData = true
        for (const key in statusData) {
            const item = statusData[key]
            if (!item.length) {
                isData = false
                break
            }
        }
        if(isData){
            getSearchReport(param)
        }else{
            notification({type:'error',text:'Incomplete information'})
        }
    }
    const htmlNoImport = (<span className='text-danger'>No import file</span>)
    return (
        <>
            <Card>
                <Card.Header className="d-flex justify-content-between">
                    <h3>Search</h3>
                    <Button variant='primary' onClick={() => searchBarReport()}>
                        {pendingSearch ? <Spinner animation="border" variant="success" /> : 'Submit'}
                    </Button>
                </Card.Header>
                {
                    !_isUndefined(data) ?
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col md={2}>
                                        <p>Dealer code:</p>
                                        <Form.Control type="text" value={activeDealer} onChange={(e) => setActiveDealer(e.target.value.toLocaleUpperCase())} placeholder="..." />
                                     
                                    </Col>
                                    <Col md={2}>
                                        <p>Date:</p>
                                        <Form.Control type="text" value={dateActive} onChange={(e) => setDateActive(e.target.value)} placeholder="YYYY/MM" />
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
            reportStatement
        },
        inputData: {
            statusFile
        }
    } = state
    return {
        dealerCondition,
        reportByDealer,
        statusFile,
        reportStatement
    }
}

const mapDispatchToProps = {
    getSearchReport: Condition.getSearchReport,
    getStatusFile: InputData.getStatusFile,
    notification:Ui.notification
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarReport)
