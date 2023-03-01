import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { numberWithSeparators, formatAmount } from '../../utils/helpers'
import OutStanding from './OutStanding'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Table from 'react-bootstrap/Table'

import _isUndefined from 'lodash/isUndefined'
import _filter from 'lodash/filter'

export const UnitReport = (props) => {
    const {
        reportByDealer: { data: reportData }
    } = props
    return (
        <>
            <Card className="my-3">
                <Card.Header className="d-flex justify-content-between">
                    <h3>Rental Charges Unit by Unit Report </h3>
                </Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Row>
                            <Col md={2}>
                                <h3> Dealer code:</h3>
                            </Col>
                            <Col md={2}>
                                <h3>{!_isUndefined(reportData) && !_isUndefined(reportData.out_standing[0]) && reportData.out_standing[0].out_standing_dealer_code}</h3>
                            </Col>
                        </Row>
                        <Table striped bordered hover>
                            <thead className="text-center">
                                <tr>
                                    <th rowSpan="2">No</th>
                                    <th rowSpan="2">Mid</th>
                                    <th rowSpan="2">Amount</th>
                                    <th rowSpan="2">Rate%</th>
                                    <th rowSpan="2">Days</th>
                                    <th colSpan="4">Rental this month</th>
                                </tr>
                                <tr>
                                    <th>Pre Vat</th>
                                    <th>Vat</th>
                                    <th>WithHolding</th>
                                    <th>Total Charges</th>
                                </tr>
                            </thead>
                            <tbody>
                                <OutStanding />
                            </tbody>
                        </Table>
                    </ListGroup.Item>
                </ListGroup>

            </Card>
        </>
    )
}

const mapStateToProps = (state) => {
    const {
        condition: {
            dealerCondition,
            reportByDealer,
            masterInterest
        }
    } = state
    return {
        dealerCondition,
        reportByDealer,
        masterInterest
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(UnitReport)
