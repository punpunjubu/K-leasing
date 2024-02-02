import React, { useEffect, useState, createRef } from 'react';
import { PDFViewer, PDFDownloadLink, pdf, Page, Text, View, Image, Document, StyleSheet, Font, usePDF, BlobProvider } from '@react-pdf/renderer';
import { formatAmount, DateFormat, formatNumber, DateFormatTH } from '../../utils/helpers'
import THSarabun from '../../styles/font/THSarabun.ttf'
import THSarabunItalic from '../../styles/font/THSarabun Italic.ttf'
import THSarabunBold from '../../styles/font/THSarabun Bold.ttf'

import Button from 'react-bootstrap/Button'
import ProgressBar from 'react-bootstrap/ProgressBar'

import _find from 'lodash/find'
import _isUndefined from 'lodash/isUndefined'
import _sortBy from 'lodash/sortBy'
import _findIndex from 'lodash/findIndex'
import _sumBy from 'lodash/sumBy'
import _filter from 'lodash/filter'
import _cloneDeep from 'lodash/cloneDeep'
import _isNull from 'lodash/isNull'
import _split from 'lodash/split'
import moment from 'moment';

Font.register({
    family: 'THSarabun', fonts: [
        { src: THSarabun },
        { src: THSarabunItalic },
        { src: THSarabunBold }
    ]
});
const styles = StyleSheet.create({
    page: {
        padding: 15,
        backgroundColor: '#FFFFFF',
        fontFamily: 'THSarabun',
        fontSize: 14
    },
    section: {
        padding: 10,
        flexGrow: 1,
        flexDirection: 'row'
    },
    image: {
        marginVertical: 10,
        width: 100,
    },
    content: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',

    },
    textRight: {
        paddingLeft: 40,
        textAlign: 'right'
    },
    textLeft: {
        width: '50%'
    },
    textRight2: {
        paddingLeft: 40
    },
    textLeft2: {
        width: '60%',
        paddingLeft: 40
    },
    textCenter: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderColor: "#000"
    },
    textEnd: {
        alignItems: 'flex-end',
        borderRightWidth: 1,
        borderColor: "#000",
        paddingRight: 5
    },
    tCenter: {
        alignItems: 'center',
        borderColor: "#000",
        borderRightWidth: 1
    }
});

const MyDoc = (props) => {
    const {
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
            dealer_condition_franchise,
            textCustom,
            dueDateCustom,
            dealer_condition_loan_type,
            defaultWithHolding,
            dateCustom,
            defaultVat
        }
    } = props
    let preVat = _sumBy(listInvoice, e => formatNumber(e.preVat, 2))
    // let vat = _sumBy(listInvoice,  e => formatNumber(e.vat))
    // let withHolding = _sumBy(listInvoice,  e => formatNumber(e.withHolding))
    let vat = 0
    let textShow = 'ค่าเช่า'
    if (dealer_condition_loan_type === "INVENTORY") {
        vat = formatNumber((preVat * Number(defaultVat)) / 100)
    } else {
        textShow = 'ดอกเบี้ย'
    }
    let withHolding = formatNumber((preVat * Number(defaultWithHolding)) / 100)
    const outstanding = _sumBy(listInvoice, e => formatNumber(e.outstanding,2))
    // const totalSum = _sumBy(listInvoice, e => formatNumber(e.total))
    const totalSum = (preVat + vat)
    const preVatTable = preVat
    const vatTable = vat
    let totalAdj = (preVat + Number(adjustment1))
    if (adjustment1) {
        if (dealer_condition_loan_type === "INVENTORY") {
            vat = ((totalAdj * Number(defaultVat)) / 100)
        }
        withHolding = ((totalAdj * Number(defaultWithHolding)) / 100)
    }
    let total = ((totalAdj + vat) - withHolding)
    let oldTotal = total
    if (adjustment2) {
        total = total + Number(adjustment2)
    }
    let wh = `${defaultWithHolding}%`
    let v = `${defaultVat}%`
    // const wh = dealer_condition_loan_type === "INVENTORY" ? '5%' : '1%'
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.section}>
                        <Image
                            style={{ marginVertical: 10, width: 50, }}
                            src={'/images/master-brand.png'}
                        />
                    </View>
                    <View style={[styles.section, { alignItems: 'center', justifyContent: 'flex-end' }]}>
                        <Image
                            style={styles.image}
                            src={'/images/logo.png'}
                        />
                    </View>
                </View>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>Statement of Rental Charges</Text>
                <View style={[styles.content, { paddingTop: 15 }]}>
                    <Text style={styles.textLeft}>{`Date: ${DateFormatTH(dateCustom)}`}</Text>
                    <Text style={styles.textRight}>{`Invoice No: ${invoiceNumber}`}</Text>
                </View>
                {/* <View style={[styles.content]}>
                    <Text style={styles.textLeft}>{'วันที่:'}</Text>
                    <Text style={styles.textRight}>{'ใบแจ้งหนี้เลขที่:'}</Text>
                </View> */}
                <View style={[styles.content, { paddingTop: 15 }]}>
                    <Text style={styles.textLeft}>{`Dealer Name: ${dealer_condition_dealer_name || ''}`}</Text>
                    <Text style={styles.textRight}>{`Dealer Code: ${dealer_condition_dealer_code}`}</Text>
                </View>
                {/* <View style={[styles.content]}>
                    <Text style={styles.textLeft}>{'นามผู้แทนจำหน่าย:'}</Text>
                    <Text style={styles.textRight}>{'รหัสผู้แทนจำหน่าย:'}</Text>
                </View> */}
                <View style={[styles.content, { paddingTop: 15 }]}>
                    <Text style={styles.textLeft}>{`Address: ${dealer_condition_register_address || ''}`}</Text>
                </View>
                {/* <View style={[styles.content]}>
                    <Text style={styles.textLeft}>{'ที่ส่งเอกสาร:'}</Text>
                </View> */}
                <View style={[styles.content, { paddingTop: 15 }]}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.textLeft2, { width: '59%', }]}>{`Floorplan Display Rental Charges ${DateFormatTH(date, 1)} (Baht):`}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={[styles.textRight2, { fontWeight: 'bold' }]}>{formatAmount(preVat)}</Text>
                        <Text style={[styles.textRight2, { minWidth: 100 }]}></Text>
                    </View>
                </View>
                <View style={[styles.content]}>
                    <Text style={[styles.textLeft2,]}>{`${textShow}ประจำเดือน${DateFormatTH(date, 2)} (บาท)`}</Text>
                </View>
                <View style={[styles.content, { paddingTop: 10 }]}>
                    <Text style={styles.textLeft2}>{'Adjustment:'}</Text>
                    <Text style={[styles.textRight2, { borderBottom: 1, borderBottomColor: '#000', minWidth: 100 }]}>{formatAmount(adjustment1)}</Text>
                </View>
                <View style={[styles.content]}>
                    <Text style={[styles.textLeft2,]}>{`${textShow}เพิ่มเติม:`}</Text>
                </View>
                <View style={[styles.content, { paddingTop: 10 }]}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.textLeft2,{width: '59%',}]}>{'Sub Total:'}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text>{formatAmount(totalAdj)}</Text>
                        <Text style={[styles.textRight2, { minWidth: 100 }]}></Text>
                    </View>
                </View>
                <View style={[styles.content]}>
                    <Text style={[styles.textLeft2,]}>{`รวม${textShow}:`}</Text>
                </View>
                <View style={[styles.content, { paddingTop: 10 }]}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.textLeft2,{width: '59%',}]}>{`VAT ${v} :`}</Text>
                    </View>

                    <View style={{ alignItems: 'flex-end' }}>
                        <Text>{formatAmount(vat)}</Text>
                        <Text style={[styles.textRight2, { minWidth: 100 }]}></Text>
                    </View>
                </View>
                <View style={[styles.content]}>
                    <Text style={[styles.textLeft2]}>{`ภาษีมูลค่าเพิ่ม ${v}`}</Text>
                </View>
                <View style={[styles.content, { paddingTop: 10 }]}>
                    <View style={{flexDirection:'row'}}>
                        <Text>{'หัก'}</Text>
                        <Text style={[styles.textLeft2, { paddingLeft: 25, width: '57%', }]}>{`WithHolding Tax ${wh}:`}</Text>
                    </View>
                    <View style={{alignItems:'flex-end'}}>
                        <Text>{formatAmount(withHolding)}</Text>
                        <Text style={[styles.textRight2, { borderBottom: 1, borderBottomColor: '#000', minWidth: 100 }]}></Text>
                    </View>
                </View>
                <View style={[styles.content]}>
                    <Text style={[styles.textLeft2,]}>{`ภาษีหัก ณ. ที่จ่าย ${wh}`}</Text>
                </View>
                <View style={[styles.content, { paddingTop: 10 }]}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.textLeft2,{width: '59%',}]}>{'Total Rental Payables:'}</Text>
                    </View>
                    <View style={{alignItems:'flex-end'}}>
                        <Text>{formatAmount(oldTotal)}</Text>
                        <Text style={[styles.textRight2, { minWidth: 100 }]}></Text>
                    </View>
                </View>
                <View style={[styles.content]}>
                    <Text style={[styles.textLeft2]}>{`รวม${textShow}ค้างชำระ`}</Text>
                </View>
                <View style={[styles.content, { paddingTop: 10 }]}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.textLeft2,{width: '59%',}]}>{'Adjustment:'}</Text>
                    </View>
                    <View style={{ alignItems:'flex-end'}}>
                        <Text>{formatAmount(adjustment2)}</Text>
                        <Text style={[styles.textRight2, { borderBottom: 1, borderBottomColor: '#000', minWidth: 100 }]}></Text>
                    </View>
                </View>
                <View style={[styles.content]}>
                    <Text style={[styles.textLeft2,]}>{`ส่วนเพิ่มเติม`}</Text>
                </View>

                <View style={[styles.content, { paddingTop: 10 }]}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.textLeft2, { width: '59%', }]}>{'Grand Total:'}</Text>
                    </View>
                    <View style={{ alignItems:'flex-end' }}>
                        <Text style={[{ fontWeight: 'bold' }]}>{formatAmount(total)}</Text>
                        <Text style={[styles.textRight2, { borderBottom: 1, borderBottomColor: '#000', minWidth: 100 }]}></Text>
                    </View>
                </View>
                <View style={[styles.content]}>
                    <Text style={[styles.textLeft2]}>{`รวมทั้งสิ้น`}</Text>
                </View>
                <View style={[styles.content, { paddingTop: 10 }]}>
                    <Text style={[styles.textLeft2, { fontWeight: 'bold' }]}>{`Due Date : ${DateFormatTH(dueDateCustom)}`}</Text>
                </View>
                <View style={[styles.content]}>
                    <Text style={[styles.textLeft2]}>{`กำหนดชำระเงิน`}</Text>
                </View>
                <View style={[styles.content, { paddingTop: 10, paddingLeft: 50, paddingRight: 50 }]}>
                    <Text style={{ width: '100%' }}>{`ผลิตภัณฑ์สินเชื่อทุกประเภทของ บริษัท ลีสซิ่งกสิกรไทย จำกัด (สินเชื่อเช่าซื้อ สินเชื่อเช่าทางการเงิน สินเชื่อส่วนบุคคลภายใต้การกำกับที่มีทะเบียนรถเป็นประกัน และสินเชื่อเพื่อผู้แทนจำหน่ายรถยนต์) จะมีการเปลี่ยนแปลงเงื่อนไขเกี่ยวกับการคิดดอกเบี้ยผิดนัดชำระหนี้และการชำระสินเชื่อคืนแก่บริษัท เพื่อให้การคิดดอกเบี้ยผิดนัดชำระหนี้สอดคล้องกับข้อเท็จจริง และเกิดความเป็นธรรมมากขึ้น โดยลูกค้าสามารถเข้าไปดูรายละเอียดได้ตาม URL ด้านล่าง`}</Text>
                </View>
                <View style={[styles.content, { paddingTop: 10, paddingLeft: 50, paddingRight: 50 }]}>
                    <Text style={{ width: '100%' }}>{`https://www.kasikornleasing.com/th/news/Pages/Default-Interest.aspx`}</Text>
                </View>
                <View style={[styles.content, { paddingTop: 10, paddingLeft: 50, paddingRight: 50 }]}>
                    <Text style={{ width: '100%' }}>{textCustom || ''}</Text>
                </View>
            </Page>
            <Page size="A4" style={styles.page}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}> Rental Charges Unit by Unit Report</Text>
                <View style={[styles.content, { paddingTop: 15, fontSize: 14 }]}>
                    <Text style={styles.textLeft}>{`Generate Date: ${DateFormatTH(dateCustom)}`}</Text>
                </View>
                <View style={[styles.content, { paddingTop: 10, fontSize: 14 }]}>
                    <View style={{ width: '50%' }}>
                        <Text style={{ paddingRight: 15 }}>{`Dealer code: ${dealer_condition_dealer_code}`}</Text>
                    </View>
                    <View style={{ width: '100%' }}>
                        <Text>{`Dealer name: ${dealer_condition_dealer_name || ''}`}</Text>
                    </View>
                    <View style={{ width: '60%' }}>
                        <Text style={{ paddingLeft: 15 }}>{`Franchise: ${dealer_condition_franchise || ''}`}</Text>
                    </View>
                </View>
                <View style={[styles.content, { paddingTop: 10, fontSize: 14 }]}>
                    <View>
                        <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: '#000' }}>
                            <View style={[styles.textCenter, { width: 130 }]}>
                                <Text>{`No`}</Text>
                            </View>
                            <View style={[styles.textCenter, { width: '40%' }]}><Text>{`Mid`}</Text></View>
                            <View style={[styles.textCenter, { width: '50%' }]}><Text>{`Amount`}</Text></View>
                            <View style={[styles.textCenter, { width: 150 }]}><Text>{`Rate%`}</Text></View>
                            <View style={[styles.textCenter, { width: 100 }]}><Text>{`Days`}</Text></View>
                            <View style={[{ width: '100%' }]}>
                                <View style={{ alignItems: 'center', borderBottomWidth: 1, borderColor: "#000" }}>
                                    <Text>{`Rental this month`}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={[styles.tCenter, { width: '60%', }]}><Text>{`Pre Vat`}</Text></View>
                                    <View style={[styles.tCenter, { width: '60%' }]}><Text>{`Vat`}</Text></View>
                                    <View style={[{ width: '100%', alignItems: 'center' }]}><Text>{`Total Charges`}</Text></View>
                                </View>
                            </View>
                        </View>
                        {
                            listInvoice.map((res, index) => {
                                const spRate = _split(parseFloat(parseFloat(res.rate).toFixed(6)), '.')
                                let toFixed = 2
                                if (spRate.length === 2) {
                                    toFixed = res.formatToFixed
                                }
                                return (
                                    <View key={index} style={{ flexDirection: 'row', borderLeftWidth: 1, borderBottomWidth: 1, borderRightWidth: 1, borderColor: '#000' }}>
                                        <View style={[styles.textCenter, { width: 130 }]}>
                                            <Text>{index + 1}</Text>
                                        </View>
                                        <View style={[styles.textCenter, { width: '40%' }]}>
                                            <Text>{res.midno}</Text>
                                        </View>
                                        <View style={[styles.textEnd, { width: '50%' }]}>
                                            <Text>{formatAmount(res.outstanding)}</Text>
                                        </View>
                                        <View style={[styles.textCenter, { width: 150 }]}>
                                            <Text>{formatAmount(res.rate,toFixed)}</Text>
                                        </View>
                                        <View style={[styles.textCenter, { width: 100 }]}>
                                            <Text>{res.day}</Text>
                                        </View>
                                        <View style={[{ width: '100%' }]}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={[styles.textEnd, { width: '60%', }]}>
                                                    <Text>{formatAmount(res.preVat)}</Text>
                                                </View>
                                                <View style={[styles.textEnd, { width: '60%' }]}>
                                                    <Text>{formatAmount(res.vat)}</Text>
                                                </View>
                                                <View style={[{ width: '100%', alignItems: 'flex-end', paddingRight: 5 }]}>
                                                    <Text>{formatAmount(res.total)}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }
                        <View style={{ flexDirection: 'row', borderLeftWidth: 1, borderBottomWidth: 1, borderRightWidth: 1, borderColor: '#000' }}>
                            <View style={[styles.textCenter, { width: 130 }]}>
                                <Text></Text>
                            </View>
                            <View style={[styles.textCenter, { width: '40%' }]}>
                                <Text style={{ fontWeight: 'bold' }}>{`TOTAL`}</Text>
                            </View>
                            <View style={[styles.textEnd, { width: '50%' }]}>
                                <Text style={{ fontWeight: 'bold' }}>{formatAmount(outstanding)}</Text>
                            </View>
                            <View style={[styles.textCenter, { width: 150 }]}>
                                <Text></Text>
                            </View>
                            <View style={[styles.textCenter, { width: 100 }]}>
                                <Text></Text>
                            </View>
                            <View style={[{ width: '100%' }]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={[styles.textEnd, { width: '60%' }]}>
                                        <Text style={{ fontWeight: 'bold' }}>{formatAmount(preVat)}</Text>
                                    </View>
                                    <View style={[styles.textEnd, { width: '60%' }]}>
                                        <Text style={{ fontWeight: 'bold' }}>{formatAmount(vatTable)}</Text>
                                    </View>

                                    <View style={[{ width: '100%', alignItems: 'flex-end', paddingRight: 5 }]}>
                                        <Text style={{ fontWeight: 'bold' }}>{formatAmount(totalSum)}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                    </View>
                </View>
            </Page>
        </Document>
    )

};

const MyDocDetail = (props) => {
    const {
        data: {
            listInvoice,
            date,
            dealer_condition_dealer_name,
            dealer_condition_dealer_code,
            dealer_condition_franchise,
            dateCustom
        }
    } = props
    const outstanding = _sumBy(listInvoice, e => formatNumber(e.outstanding,2))
    const preVat = _sumBy(listInvoice, e => formatNumber(e.preVat,2))
    const vat = _sumBy(listInvoice, e => formatNumber(e.vat,2))
    const totalSum = _sumBy(listInvoice, e => formatNumber(e.total,2))

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}> Rental Charges Unit by Unit Report</Text>
                <View style={[styles.content, { paddingTop: 15, fontSize: 14 }]}>
                    <Text style={styles.textLeft}>{`Generate Date: ${DateFormatTH(dateCustom)}`}</Text>
                </View>
                <View style={[styles.content, { paddingTop: 10, fontSize: 14 }]}>
                    <View style={{ width: '50%' }}>
                        <Text style={{ paddingRight: 15 }}>{`Dealer code: ${dealer_condition_dealer_code}`}</Text>
                    </View>
                    <View style={{ width: '100%' }}>
                        <Text>{`Dealer name: ${dealer_condition_dealer_name || ''}`}</Text>
                    </View>
                    <View style={{ width: '60%' }}>
                        <Text style={{ paddingLeft: 15 }}>{`Franchise: ${dealer_condition_franchise || ''}`}</Text>
                    </View>
                </View>
                <View style={[styles.content, { paddingTop: 10, fontSize: 14 }]}>
                    <View>
                        <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: '#000' }}>
                            <View style={[styles.textCenter, { width: 130 }]}>
                                <Text>{`No`}</Text>
                            </View>
                            <View style={[styles.textCenter, { width: '40%' }]}><Text>{`Mid`}</Text></View>
                            <View style={[styles.textCenter, { width: '50%' }]}><Text>{`Amount`}</Text></View>
                            <View style={[styles.textCenter, { width: 150 }]}><Text>{`Rate%`}</Text></View>
                            <View style={[styles.textCenter, { width: 100 }]}><Text>{`Days`}</Text></View>
                            <View style={[{ width: '100%' }]}>
                                <View style={{ alignItems: 'center', borderBottomWidth: 1, borderColor: "#000" }}>
                                    <Text>{`Rental this month`}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={[styles.tCenter, { width: '60%', }]}><Text>{`Pre Vat`}</Text></View>
                                    <View style={[styles.tCenter, { width: '60%' }]}><Text>{`Vat`}</Text></View>
                                    <View style={[{ width: '100%', alignItems: 'center' }]}><Text>{`Total Charges`}</Text></View>
                                </View>
                            </View>
                        </View>
                        {
                            listInvoice.map((res, index) => {
                                const spRate = _split(parseFloat(parseFloat(res.rate).toFixed(6)), '.')
                                let toFixed = 2
                                if (spRate.length === 2) {
                                    toFixed = res.formatToFixed
                                }
                                return (
                                    <View key={index} style={{ flexDirection: 'row', borderLeftWidth: 1, borderBottomWidth: 1, borderRightWidth: 1, borderColor: '#000' }}>
                                        <View style={[styles.textCenter, { width: 130 }]}>
                                            <Text>{index + 1}</Text>
                                        </View>
                                        <View style={[styles.textCenter, { width: '40%' }]}>
                                            <Text>{res.midno}</Text>
                                        </View>
                                        <View style={[styles.textEnd, { width: '50%' }]}>
                                            <Text>{formatAmount(res.outstanding)}</Text>
                                        </View>
                                        <View style={[styles.textCenter, { width: 150 }]}>
                                            <Text>{formatAmount(res.rate, toFixed)}</Text>
                                        </View>
                                        <View style={[styles.textCenter, { width: 100 }]}>
                                            <Text>{res.day}</Text>
                                        </View>
                                        <View style={[{ width: '100%' }]}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={[styles.textEnd, { width: '60%', }]}>
                                                    <Text>{formatAmount(res.preVat)}</Text>
                                                </View>
                                                <View style={[styles.textEnd, { width: '60%' }]}>
                                                    <Text>{formatAmount(res.vat)}</Text>
                                                </View>
                                                <View style={[{ width: '100%', alignItems: 'flex-end', paddingRight: 5 }]}>
                                                    <Text>{formatAmount(res.total)}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }


                        <View style={{ flexDirection: 'row', borderLeftWidth: 1, borderBottomWidth: 1, borderRightWidth: 1, borderColor: '#000' }}>
                            <View style={[styles.textCenter, { width: 130 }]}>
                                <Text></Text>
                            </View>
                            <View style={[styles.textCenter, { width: '40%' }]}>
                                <Text style={{ fontWeight: 'bold' }}>{`TOTAL`}</Text>
                            </View>
                            <View style={[styles.textEnd, { width: '50%' }]}>
                                <Text style={{ fontWeight: 'bold' }}>{formatAmount(outstanding)}</Text>
                            </View>
                            <View style={[styles.textCenter, { width: 150 }]}>
                                <Text></Text>
                            </View>
                            <View style={[styles.textCenter, { width: 100 }]}>
                                <Text></Text>
                            </View>
                            <View style={[{ width: '100%' }]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={[styles.textEnd, { width: '60%' }]}>
                                        <Text style={{ fontWeight: 'bold' }}>{formatAmount(preVat)}</Text>
                                    </View>
                                    <View style={[styles.textEnd, { width: '60%' }]}>
                                        <Text style={{ fontWeight: 'bold' }}>{formatAmount(vat)}</Text>
                                    </View>

                                    <View style={[{ width: '100%', alignItems: 'flex-end', paddingRight: 5 }]}>
                                        <Text style={{ fontWeight: 'bold' }}>{formatAmount(totalSum)}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                    </View>
                </View>
            </Page>
        </Document>
    )
}



const MyDocument = (props) => {
    const { dataRender, dueDateShow, dateShow } = props
    const [data, setData] = useState([])
    const [fileIndex, setFileIndex] = useState(0)
    const myRef = createRef()

    const onDownload = (type = 'invoice') => {
        const checkDealer = document.getElementsByName('checkDealer')
        const itemExport = []
        for (let index = 0; index < checkDealer.length; index++) {
            const element = checkDealer[index];
            if (element.checked) {
                let n = _find(dataRender, e => e.dealer_condition_dealer_code === element.value)
                if (n) {
                    // itemExport.push(n)
                    // n.dueDateCustom = DateFormat(n.date).add(1, 'month').add(dueDateShow - 1, 'day')
                    n.dueDateCustom = dueDateShow
                    n.dateCustom = dateShow
                    n.typeName = type === 'unit' ? '-unit-invoice' : '-invoice'
                    let item = type === 'unit' ? <MyDocDetail data={n} /> : <MyDoc data={n} />
                    itemExport.push({
                        render: item,
                        data: n
                    })
                }

            }
        }
        if (itemExport.length) {
            setData(itemExport)
        } else {
            setData([])
        }

    }
    useEffect(() => {
        let clickTime = null
        let indexTime = null
        let lastIndexTime = null
        if (data.length && fileIndex < data.length) {
            clickTime = setTimeout(() => {
                let obj = pdf(data[fileIndex].render).toBlob();
                obj.then(function (blob) {
                    let url = URL.createObjectURL(blob);
                    let a = document.createElement('A');
                    a.href = url;
                    a.download = `${data[fileIndex].data.dealer_condition_dealer_code}-${data[fileIndex].data.dealer_condition_dealer_name || ''}${data[fileIndex].data.typeName}.pdf`
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                });
            }, 500)
            indexTime = setTimeout(() => {
                setFileIndex(fileIndex + 1)
            }, 1000)
        } else if (data.length) {
            lastIndexTime = setTimeout(() => {
                setData([])
                setFileIndex(0)
            }, 1000)
        }
        return () => {
            clearTimeout(clickTime)
            clearTimeout(indexTime)
            clearTimeout(lastIndexTime)
        }
    }, [data, fileIndex])
    const nowTotal = (fileIndex / data.length) * 100

    return (
        <>
            {
                data.length && !_isUndefined(data[fileIndex]) ?
                    <ProgressBar variant='success' animated now={nowTotal} />
                    :
                    <>
                        <Button variant="success" onClick={() => onDownload('invoice')}>
                            {'Export Invoice PDF'}
                        </Button>
                        <Button className="ml-3" variant="warning" onClick={() => onDownload('unit')}>
                            {'Export Unit Invoice PDF'}
                        </Button>
                    </>
            }

            {/* <PDFViewer style={{ height: 500, width: 500 }}>
                {<MyDocDetail />}
            </PDFViewer> */}

        </>
    );
}

export default MyDocument;