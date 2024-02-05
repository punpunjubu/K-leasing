import React, { useState, createRef } from 'react'
import { connect } from 'react-redux'

import { formatAmount, DateFormatTH, DateFormat, formatNumber } from '../../utils/helpers'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'

import _isUndefined from 'lodash/isUndefined'
import _find from 'lodash/find'
import _sortBy from 'lodash/sortBy'
import _findIndex from 'lodash/findIndex'
import _sumBy from 'lodash/sumBy'
import _filter from 'lodash/filter'
import _cloneDeep from 'lodash/cloneDeep'
import _isNull from 'lodash/isNull'
import _split from 'lodash/split'

export const ShowInvoice = (props) => {
    const ref = createRef();
    let {
        data: {
            listInvoice,
            adjustment1,
            adjustment2,
            date,
            dueDate,
            invoiceNumber,
            dealer_condition_dealer_name,
            dealer_condition_dealer_code,
            dealer_condition_register_address,
            textCustom,
            dealer_condition_loan_type,
            defaultWithHolding,
            defaultVat
        },
        onTextCustom,
        dueDateShow,
        dateShow,
        reportStatementData } = props
    const [activeInvoice, setActiveInvoice] = useState(1)
    const outstanding = _sumBy(listInvoice, (e) => Number(e.outstanding,2))
    let preVat = formatNumber(_sumBy(listInvoice, e => formatNumber(e.preVat,2)),2)
    // let vat = _sumBy(listInvoice, e => (e.vat))
    let vat = 0
    if (dealer_condition_loan_type === "INVENTORY") {
        vat = formatNumber(((preVat * Number(defaultVat)) / 100),2)
    }
  
    // let withHolding = _sumBy(listInvoice, e => (e.withHolding))
    let withHolding = formatNumber(((preVat * Number(defaultWithHolding)) / 100),2)
   
    // const totalSum = _sumBy(listInvoice, e => formatNumber(e.total))

    const totalSum = (preVat + vat)
    let totalAdj = (preVat + Number(adjustment1))
    const vatUnit = vat
    const withHoldingUnit = withHolding
    if (adjustment1) {
        if (dealer_condition_loan_type === "INVENTORY") {
            vat = formatNumber(((totalAdj * Number(defaultVat)) / 100),2)
        }
        withHolding = formatNumber(((totalAdj * Number(defaultWithHolding)) / 100),2)
    }

    let total = formatNumber(((totalAdj + vat) - withHolding),2)

    let oldTotal = total
    if (adjustment2) {
        total = formatNumber(total + Number(adjustment2),2)
    }
    // const dueDateCustom = DateFormat(date).add(1, 'month').add(dueDateShow - 1, 'day')
    // const dueDateCustom = dueDateShow
    let wh = `${defaultWithHolding}%`
    let v = `${defaultVat}%`

    return (
        <Card className="p-3 m-3">
            <Col className="py-4">
                <Button variant={activeInvoice === 1 ? 'secondary' : 'light'} className="mr-2 " onClick={() => setActiveInvoice(1)}>Invoice</Button>

                <Button variant={activeInvoice === 2 ? 'secondary' : 'light'} onClick={() => setActiveInvoice(2)}>Invoice Detail</Button>
            </Col>
            <Container>
                {
                    activeInvoice === 1 ?
                        <>
                            <Row>
                                <Col>
                                    <p className="m-0">Date: {DateFormatTH(dateShow)}</p>
                                    <p>วันที่:</p>
                                </Col>
                                <Col>
                                    <p className="m-0">Invoice No: {invoiceNumber}</p>
                                    <p>ใบแจ้งหนี้เลขที่:</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p className="m-0">Dealer Name: {dealer_condition_dealer_name}</p>
                                    <p>นามผู้แทนจำหน่าย:</p>
                                </Col>
                                <Col>
                                    <p className="m-0">Deale code: {dealer_condition_dealer_code}</p>
                                    <p>รหัสผู้แทนจำหน่าย:</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p className="m-0">Address: {dealer_condition_register_address}</p>
                                    <p>ที่ส่งเอกสาร:</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={{ offset: 1 }}>
                                    <p className="m-0">{`Floorplan Display Interest Charges ${DateFormatTH(date, 1)} (Baht):`}</p>
                                    <p>{`ค่าเช่าประจำเดือน${DateFormatTH(date, 2)} (บาท)`}</p>
                                </Col>
                                <Col>
                                    <p className="m-0 font-weight-bold">{formatAmount(preVat)}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={{ offset: 1 }}>
                                    <p className="m-0">{`Adjustment:`}</p>
                                    <p>{`ค่าเช่าเพิ่มเติม:`}</p>
                                </Col>
                                <Col>
                                    <p className="m-0">{formatAmount(adjustment1)}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={{ offset: 1 }}>
                                    <p className="m-0">{`Sub Total:`}</p>
                                    <p>{`รวมค่าเช่า:`}</p>
                                </Col>
                                <Col>
                                    <p className="m-0">{formatAmount(totalAdj)}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={{ offset: 1 }}>
                                    <p className="m-0">{`VAT ${v} :`}</p>
                                    <p>{`ภาษีมูลค่าเพิ่ม ${v}`}</p>
                                </Col>
                                <Col>
                                    <p className="m-0">{formatAmount(vat)}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={1}>
                                    <p className="m-0">{`หัก`}</p>
                                </Col>
                                <Col>
                                    <p className="m-0">{`WithHolding Tax ${wh}`}</p>
                                    <p>{`ภาษีหัก ณ. ที่จ่าย ${wh}`}</p>
                                </Col>
                                <Col>
                                    <p className="m-0">{formatAmount(withHolding)}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={{ offset: 1 }}>
                                    <p className="m-0">{`Total Rental Payables:`}</p>
                                    <p>{`รวมค่าเช่าค้างชำระ`}</p>
                                </Col>
                                <Col>
                                    <p className="m-0">{formatAmount(oldTotal)}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={{ offset: 1 }}>
                                    <p className="m-0">{`Adjustment:`}</p>
                                    <p>{`ส่วนเพิ่มเติม`}</p>
                                </Col>
                                <Col>
                                    <p className="m-0">{formatAmount(adjustment2)}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={{ offset: 1 }}>
                                    <p className="m-0">{`Grand Total:`}</p>
                                    <p>{`รวมทั้งสิ้น`}</p>
                                </Col>
                                <Col>
                                    <p className="m-0 font-weight-bold">{formatAmount(total)}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={{ offset: 1 }}>
                                    <p className="m-0 font-weight-bold">{`Due Date : ${DateFormatTH(dueDateShow)}`}</p>
                                    <p>{`กำหนดชำระเงิน`}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p className="m-0">{reportStatementData && reportStatementData[0]  ? reportStatementData[0].description : ''}</p>
                                    <p>{reportStatementData && reportStatementData[0]  ? reportStatementData[0].url : ''}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Control as="textarea" rows={2} value={textCustom} onChange={(e) => onTextCustom(e.target.value)} />
                                </Col>
                            </Row>
                        </>
                        :
                        <>
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
                                    {
                                        listInvoice.map((res, index) => {
                                            const spRate = _split(parseFloat(parseFloat(res.rate).toFixed(6)), '.')
                                            let toFixed = 2
                                            if (spRate.length === 2) {
                                                toFixed = res.formatToFixed
                                            }
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{res.midno}</td>
                                                    <td>{formatAmount(res.outstanding)}</td>
                                                    <td>{formatAmount(res.rate,toFixed)}</td>
                                                    <td>{res.day}</td>
                                                    <td>{formatAmount(res.preVat)}</td>
                                                    <td>{formatAmount(res.vat)}</td>
                                                    <td>{formatAmount(res.withHolding)}</td>
                                                    <td>{formatAmount(res.total)}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    <tr key={'total'} className="font-weight-bold">
                                        <td></td>
                                        <td>{'TOTAL'}</td>
                                        <td>{formatAmount(outstanding)}</td>
                                        <td></td>
                                        <td></td>
                                        <td>{formatAmount(preVat)}</td>
                                        <td>{formatAmount(vatUnit)}</td>
                                        <td>{formatAmount(withHoldingUnit)}</td>
                                        <td>{formatAmount(totalSum)}</td>
                                    </tr>
                                </tbody>
                            </Table>

                        </>
                }


            </Container>
        </Card>
    )
}

const mapStateToProps = (state) => {
    const {
        condition: { dueDate: dueDateShow, date: dateShow }
    } = state
    return {
        dueDateShow,
        dateShow
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ShowInvoice)
