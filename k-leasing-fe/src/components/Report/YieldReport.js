import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import isEqual from 'react-fast-compare'
import moment from 'moment'
import ReactExport from "react-export-excel";
import { formatAmount, DateFormat, CountRate, DateShowFormat } from '../../utils/helpers'
import { Condition, InputData, Ui } from '../../redux/actions'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'

import _isUndefined from 'lodash/isUndefined'
import _find from 'lodash/find'
import _sortBy from 'lodash/sortBy'
import _findIndex from 'lodash/findIndex'
import _sumBy from 'lodash/sumBy'
import _filter from 'lodash/filter'
import _cloneDeep from 'lodash/cloneDeep'
import _isNull from 'lodash/isNull'
import _ from 'lodash'

const CountDate = (now, old, type) => {
    return type.length ? now.diff(old, 'day') + 1 : now.diff(old, 'day')
}
const TotalCharges = (outstanding, rate, date) => {
    return ((outstanding * rate) / 100) / 365 * date
}

export const YieldReport = (props) => {
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

    const {
        dealerCondition: { data: dealerData },
        reportAll: { data: reportData, pending: pendingSearch },
        masterInterest: { data: mor_mlr },
        loanType: { data: loanTypeData },
        getReportAll,
        getStatusFile,
        notification,
        statusFile: { data: statusData } } = props

    const [dateActive, setDateActive] = useState(moment().format('YYYY/MM'))
    // const [dateActive, setDateActive] = useState('2022/11')
    const [downloadItem, setDownloadItem] = useState(null)

    useEffect(() => {
        if (!Object.keys(statusData).length) {
            getStatusFile()
        }
    }, [statusData])

    const groupData = (data, forNormal = false, formatToFixed) => {
        let {
            dealerCode,
            franchise,
            laonType,
            startDate,
            endDate,
            invoiceDate,
            midNo,
            chassis,
            outstanding,
            normalRate,
            defaultSOTRate,
            defaultAGINGRate,
            aging,
            rentalDay,
            rentalAmt,
            payDate,
            payAmount
        } = data
        let rate = normalRate
        let total = TotalCharges(outstanding, rate, rentalDay)
        if (!forNormal) {
            if (defaultSOTRate) {
                total = TotalCharges(outstanding, defaultSOTRate, rentalDay)
                normalRate = ''
            }
            if (defaultAGINGRate) {
                total = TotalCharges(outstanding, defaultAGINGRate, rentalDay)
                normalRate = ''
            }
        } else {
            defaultSOTRate = ''
            defaultAGINGRate = ''
        }
   
        const spRate = _.split(parseFloat(parseFloat(rate).toFixed(6)), '.')
        let toFixed = 2
        if (spRate.length === 2) {
            toFixed = formatToFixed
        }
        return {
            dealerCode,
            franchise,
            laonType,
            startDate,
            endDate,
            invoiceDate,
            midNo,
            chassis,
            outstanding: formatAmount(outstanding),
            normalRate: formatAmount(normalRate,toFixed) || '',
            defaultSOTRate: formatAmount(defaultSOTRate) || '',
            defaultAGINGRate: formatAmount(defaultAGINGRate) || '',
            aging,
            rentalDay,
            rentalAmt: formatAmount(total),
            payDate,
            payAmount: formatAmount(payAmount)
        }
    }

    useEffect(() => {
        if (!_isUndefined(reportData) && !_isUndefined(reportData.data) && !_isUndefined(reportData.master_condition)) {
            const { data, date, master_condition, master_condition_spec } = reportData

            let item = []
            data.map((resDealer, index) => {
                const { out_standing, default_file, payment } = resDealer
                if (!_isUndefined(out_standing[0])) {
                    const dealer = _find(dealerData, (e) => e.dealer_condition_dealer_code === out_standing[0].out_standing_dealer_code)
                    let masterCondition = _find(master_condition, (e) => e.type === Number(dealer.dealer_condition_type_curtailment))
                    let normalRate = _find(mor_mlr, (e) => e.master_interest_type === dealer.dealer_condition_nor_rate_type.toLocaleLowerCase()).master_interest_start_rate
                    const loan = _find(loanTypeData, (e) => e.loan_type_by === 'loan')
                    const inventory = _find(loanTypeData, (e) => e.loan_type_by === 'inventory')
                    normalRate = Number(normalRate) + Number(dealer.dealer_condition_nor_rate)
                    const loanType = dealer.dealer_condition_loan_type === "INVENTORY" ? false : true
                    const defaultWithHolding = loanType ? loan.loan_type_tax : inventory.loan_type_tax
                    const findNormalRate = _find(mor_mlr, (e) => e.master_interest_type === dealer.dealer_condition_nor_rate_type.toLocaleLowerCase())
                    let nRate = []

                    let formatToFixed = 2
                    for (let index = 0; index < 2; index++) {
                        if (!_isUndefined(mor_mlr[index]) && mor_mlr[index]) {
                            for (let index2 = 0; index2 < 4; index2++) {
                                if (index2 === 0) {
                                    const rate = _.split(parseFloat(mor_mlr[index].master_interest_start_rate), '.')
                                    let toFixed = 2
                                    if (rate.length === 2) {
                                        if (rate[1].length > 6) {
                                            toFixed = 6
                                        } else {
                                            toFixed = rate[1].length
                                        }
                                    }
                                    if (formatToFixed < toFixed) {
                                        formatToFixed = toFixed
                                    }
                                } else {
                                    if (!_isUndefined(mor_mlr[index][`master_interest_start_rate_${index2}`]) && !_isNull(mor_mlr[index][`master_interest_start_rate_${index2}`]) && mor_mlr[index][`master_interest_start_rate_${index2}`]) {
                                        const rate = _.split(parseFloat(mor_mlr[index][`master_interest_start_rate_${index2}`]), '.')
                                        let toFixed = 2
                                        if (rate.length === 2) {
                                            if (rate[1].length > 6) {
                                                toFixed = 6
                                            } else {
                                                toFixed = rate[1].length
                                            }
                                        }
                                        if (formatToFixed < toFixed) {
                                            formatToFixed = toFixed
                                        }
                                    }
                                }
                            }
                        }
                    }

                    for (let index = 0; index < 4; index++) {
                        if (index === 0) {
                            nRate.push({
                                rate: Number(findNormalRate.master_interest_start_rate) + Number(dealer.dealer_condition_nor_rate),
                                date: DateFormat(date).startOf('month')
                            })
                        } else if (!_isUndefined(findNormalRate[`master_interest_start_rate_${index}`])
                            && !_isUndefined(findNormalRate[`master_interest_date_rate_${index}`])
                            && !_isNull(findNormalRate[`master_interest_start_rate_${index}`])
                            && !_isNull(findNormalRate[`master_interest_date_rate_${index}`])
                            && findNormalRate[`master_interest_start_rate_${index}`]
                            && findNormalRate[`master_interest_date_rate_${index}`]) {
                                
                                const rate = findNormalRate[`master_interest_start_rate_${index}`]

                                let dealer_condition_nor_rate = Number(dealer.dealer_condition_nor_rate)
                                if(dealer.startdate_1 && dealer.enddate_2 && dealer.nor_rate_1 && dealer.nor_ratetype_1){
                                    dealer_condition_nor_rate = 0
                                }
                                nRate.push({
                                    rate: Number(rate) + dealer_condition_nor_rate,
                                    date: DateFormat(findNormalRate[`master_interest_date_rate_${index}`])
                                })
                        }
                    }

                    for (let index = 0; index < nRate.length; index++) {
                        let element = nRate[index];
                        if (!_isUndefined(nRate[index + 1])) {
                            element.endDate = _cloneDeep(nRate[index + 1]).date.subtract(1, 'days')

                        } else {
                            element.endDate = DateFormat(date).endOf('month')

                        }
                       
                    }
                    if(dealer.startdate_1 && dealer.enddate_1 && dealer.nor_rate_1 && dealer.nor_ratetype_1){
                        let newNRate = []
                        const countNRate = (nRate.length - 1)
                        const dateText = nRate[countNRate].date.format('YYYY/MM/')
                        const rate = nRate[0].rate
                     
                            newNRate.push({
                                rate:  rate + Number(dealer.nor_rate_1),
                                date:  nRate[0].date,
                                endDate: DateFormat(`${dateText}${dealer.enddate_1}`)
                            })
                        if(dealer.startdate_2 && dealer.enddate_2 && dealer.nor_rate_2){
                            newNRate.push({
                                rate:  rate + Number(dealer.nor_rate_2),
                                date:  DateFormat(`${dateText}${dealer.startdate_2}`),
                                endDate: DateFormat(`${dateText}${dealer.enddate_2}`)
                            })
                        }
                        if(dealer.startdate_3 && dealer.enddate_3 && dealer.nor_rate_3){
                            newNRate.push({
                                rate:  rate + Number(dealer.nor_rate_3),
                                date:  DateFormat(`${dateText}${dealer.startdate_3}`),
                                endDate: DateFormat(`${dateText}${dealer.enddate_3}`)
                            })
                        }
                        if(dealer.startdate_4 && dealer.enddate_4 && dealer.nor_rate_4){
                            newNRate.push({
                                rate:  rate + Number(dealer.nor_rate_4),
                                date:  DateFormat(`${dateText}${dealer.startdate_4}`),
                                endDate: DateFormat(`${dateText}${dealer.enddate_4}`)
                            })
                        }
                        nRate = newNRate
                    }
                    out_standing.map((res, index) => {
                        const midno           = res.out_standing_midno
                        const outstanding     = res.out_standing_outstanding
                        const invoiceDate     = res.out_standing_invoice_date
                        const interestCalDate = res.out_standing_interest_cal_date
                        const defaultPay      = default_file.length && _filter(default_file, (e) => e.default_mid === res.out_standing_midno) || ''
                        const paymentPay      = payment.length && _find(payment, (e) => e.payment_mid === res.out_standing_midno) || ''
                        const franchise       = res.out_standing_franchise

                        let masterConditionSpec =  ''
                        if(master_condition_spec && !_.isUndefined(master_condition_spec) && !_.isNull(master_condition_spec) && master_condition_spec.length && res.type_curtailment_spec){
                            masterConditionSpec = _find(master_condition_spec, (e) => e.type === Number(res.type_curtailment_spec))
                            masterCondition = masterConditionSpec
                        }

                        let param = {
                            dealerCode      : dealer.dealer_condition_dealer_code,
                            franchise       : dealer.dealer_condition_franchise,
                            laonType        : dealer.dealer_condition_loan_type,
                            startDate       : '',
                            endDate         : '',
                            invoiceDate     : DateFormat(invoiceDate).format("DD-MM-YYYY"),
                            midNo           : midno,
                            chassis         : res.out_standing_chassis,
                            outstanding     : outstanding,
                            normalRate      : '',
                            defaultSOTRate  : '',
                            defaultAGINGRate: '',
                            aging           : '',
                            rentalDay       : '',
                            rentalAmt       : '',
                            payDate         : '',
                            payAmount       : ''
                        }
                        let startDate = DateFormat(date).startOf('month')

                        let endDate = DateFormat(date).endOf('month')
                        const defaultMonth = DateFormat(date).month()
                        if (midno !== '' && dealer.dealer_condition_dealer_code !== '') {
                            let groupPaydate = []
                            if (paymentPay) {
                                param.outstanding = outstanding
                                for (let i = 0; i < 6; i++) {
                                    const paydate = paymentPay[`payment_paydate_${i + 1}`]
                                    const amount  = paymentPay[`payment_amount_${i + 1}`]
                                    if (paydate && amount && defaultMonth === DateFormat(paydate).month()) {
                                        const isGroupDate = _findIndex(groupPaydate, e => e.paydate === paydate)
                                        if (isGroupDate >= 0) {
                                            groupPaydate[isGroupDate]['amount'] = Number(groupPaydate[isGroupDate]['amount']) + Number(amount)
                                        } else {
                                            groupPaydate.push({
                                                paydate,
                                                amount
                                            })
                                        }
                                    }
                                }
                                groupPaydate = _sortBy(groupPaydate, ['paydate', 'age'])
                                const numPay = groupPaydate.length
                                let dateLoopCount = 0
                                let lastDate = ''
                                let lastRate = 0
                                let lastDay = 0
                                let lastDateEnd = ''
                                for (let i = 0; i < numPay; i++) {
                                    let dayInterestCal = 0
                                    let dayLoop = 0
                                    let dayLoopDefault = 0
                                    for (let index = 0; index < nRate.length; index++) {
                                        const element         = nRate[index];
                                              startDate       = _cloneDeep(DateFormat(element.date.format('YYYY/MM/DD')))
                                              endDate         = _cloneDeep(DateFormat(element.endDate.format('YYYY/MM/DD')))
                                        const monthInvoicLoop = DateFormat(invoiceDate)
                                        if (startDate.unix() < monthInvoicLoop.unix()) {
                                            startDate = monthInvoicLoop
                                        }
                                        const paydate = DateFormat(groupPaydate[i].paydate)
                                        // let day = CountDate(paydate, monthInvoicLoop, [])
                                        if(index != 0 && i > 0 && paydate.format('YYYY/MM/DD') >= startDate.format('YYYY/MM/DD')){
                                            startDate = DateFormat(groupPaydate[i-1].paydate)
                                            if(lastDateEnd){
                                                const lastDateEndCK = _cloneDeep(lastDateEnd).add(1,'day')
                                                //    console.log('lastDateEnd2', startDate.format('YYYY-MM-DD') ,lastDateEndCK.format('YYYY-MM-DD'))
                                                if(startDate.format('YYYY-MM-DD') < lastDateEndCK.format('YYYY-MM-DD')){
                                                    startDate = lastDateEndCK
                                                }
                                            }
                                        }else if(index == 0 && i > 0){
                                            if(lastDateEnd){
                                          
                                                const lastDateEndCK = _cloneDeep(lastDateEnd).add(1,'day')
                                                // console.log('lastDateEnd3', startDate.format('YYYY-MM-DD') ,lastDateEndCK.format('YYYY-MM-DD'),'endDate',endDate.format('YYYY-MM-DD'))
                                                if(startDate.format('YYYY-MM-DD') < lastDateEndCK.format('YYYY-MM-DD')){
                                                    startDate = lastDateEndCK
                                                }
                                            }
                                        }
                                        let day = 0
                                        let _startDate = startDate
                                        let _endDate = _cloneDeep(paydate)
                                        if (Number(endDate.format('D')) > Number(paydate.format('D'))) {
                                            day = CountDate(paydate, monthInvoicLoop, [])
                                        } else {
                                            day = CountDate(endDate, monthInvoicLoop, [])
                                            if (nRate.length > 1) {
                                                day      = CountDate(endDate, monthInvoicLoop, [true])
                                                _endDate = _cloneDeep(endDate)
                                            }
                                        }
                                  
                                        lastDate = _cloneDeep(paydate)
                                        let calculateByFranchise = true
                                        if (interestCalDate) {
                                            const monthInterestCalLoop = DateFormat(interestCalDate)

                                            dayInterestCal = CountDate(paydate, monthInterestCalLoop, [])
                                            if (dayInterestCal >= 0) {
                                                if (monthInterestCalLoop.year() === startDate.year() && monthInterestCalLoop.month() === startDate.month()) {
                                                    if (Number(endDate.format('D')) > Number(paydate.format('D'))) {
                                                        dayLoop = CountDate(paydate, monthInterestCalLoop, [])
                                                        startDate = monthInterestCalLoop
                                                        _startDate = monthInterestCalLoop
                                                    } else {
                                                        if (Number(startDate.format('D')) > Number(monthInterestCalLoop.format('D'))) {
                                                            dayLoop = CountDate(endDate, startDate, [])
                                                        } else {
                                                            dayLoop = CountDate(endDate, monthInterestCalLoop, [])
                                                            startDate = monthInterestCalLoop
                                                            _startDate = monthInterestCalLoop
                                                        }
                                                    }

                                                } else {
                                                    if (Number(endDate.format('D')) > Number(paydate.format('D'))) {
                                                        dayLoop = CountDate(paydate, startDate, [])
                                                    } else {
                                                        dayLoop = CountDate(endDate, startDate, [])
                                                        if (index == 0) {
                                                            dayLoop = CountDate(endDate, startDate, [true])
                                                        }
                                                    }
                                                }
                                            }
                                            if(dayInterestCal === 0){
                                                if(franchise === 'SUZUKI NEW' || franchise === 'SUZUKINEW' || franchise === 'suzuki new'){
                                                    calculateByFranchise = false
                                                }
                                            }
                                        } else {

                                            if (monthInvoicLoop.year() === paydate.year() && monthInvoicLoop.month() === paydate.month()) {
                                                if (Number(endDate.format('D')) > Number(paydate.format('D'))) {
                                                    dayLoop = CountDate(paydate, startDate, [])
                                                } else {
                                                    dayLoop = CountDate(paydate, monthInvoicLoop, [])
                                                    _startDate = monthInvoicLoop

                                                }

                                            } else {
                                                if (Number(endDate.format('D')) > Number(paydate.format('D'))) {
                                                    dayLoop = CountDate(paydate, startDate, [])
                                                    if(Number(startDate.format('D')) === Number(paydate.format('D')) && paydate.format('DD') != '01'){
                                                        dayLoop = CountDate(paydate, startDate, [true])
                                                    }
                                                } else {
                                                    dayLoop = CountDate(endDate, startDate, [])
                                                    if (nRate.length > 1) {
                                                        if(defaultPay.length){
                                                            dayLoop = CountDate(endDate, startDate, [true])
                                                        }else if(endDate.format('DDMMYYYY') < paydate.format('DDMMYYYY')){
                                                            dayLoop = CountDate(endDate, startDate, [true])
                                                        }else{
                                                            dayLoop = CountDate(endDate, startDate, [])
                                                        }
                                                    }
                                                }

                                            }
                                            if(CountDate(paydate, monthInvoicLoop, []) === 0){
                                                if(franchise === 'SUZUKI NEW' || franchise === 'SUZUKINEW' || franchise === 'suzuki new'){
                                                    calculateByFranchise = false
                                                }
                                            }
                                        }

                                        if (defaultPay.length && dayLoop !== 0) {
                                            day = day + 1
                                            dayLoop = dayLoop + 1
                                            if(nRate.length > 1){
                                                if(dayLoop > CountDate(_cloneDeep(endDate), startDate, [true])){
                                                    day = day - 1
                                                    dayLoop = dayLoop - 1
                                                }else if(Number(endDate.format('D')) > Number(paydate.format('D')) && Number(startDate.format('D')) === Number(paydate.format('D'))){
                                                    if((day - 1) >  lastDay){
                                                        day -= 1
                                                    }
                                                    dayLoop -= 1
                                                }
                                            }
                                        }

                                        if (paydate.format('YYYY-MM-DD') === startDate.format('YYYY-MM-DD') && dayLoop === 0) {
                                            if (paydate.format('DD') !== '01' && paydate.format('DD') !== startDate.format('DD') || defaultPay.length) {
                                                let amount = 0
                                                for (let iAmount = 0; iAmount <= i; iAmount++) {
                                                    amount += Number(groupPaydate[iAmount].amount)
                                                }
                                                const cal = Number(outstanding) - amount
                                                if (cal > 20 && dayInterestCal >= 0 && numPay > 1) {
                                                    dayLoop = 1
                                                    if (defaultPay.length) {
                                                        day = day + 1
                                                    }
                                                } else if (defaultPay.length && dayInterestCal >= 0) {
                                                    const sumAmount = _sumBy(groupPaydate, function (o) { return Number(o.amount); })
                                                    const cal2 = Number(outstanding) - sumAmount
                                                    if(calculateByFranchise){
                                                        if (cal2 < 20) {
                                                            dayLoop = 1
                                                            day     = day + 1
                                                        }
                                                    }

                                                }
                                            }
                                        }
                           
                                        const rateRes         = CountRate(day, masterCondition, element.rate)
                                              console.log("🚀 ~ file: YieldReport.js:476 ~ out_standing.map ~ rateRes:", rateRes)
                                              lastRate        = rateRes.value
                                              param.startDate = _startDate.format("DD-MM-YYYY")
                                              param.endDate   = _endDate.format("DD-MM-YYYY")
                                              param.aging     = day
                                              param.payDate   = paydate.format("DD-MM-YYYY")
                                              param.payAmount = groupPaydate[i].amount
                                          
                                              console.log('L', dayLoop,'รอบ MRL',index,'รอบ',i)
                                        if (dayLoop > 0 && day != lastDay) {
                                        
                                            if (rateRes.type === 'nomal') {
                                                let startDateRentalDay = _cloneDeep(startDate)
                            
                                                let endDateRentalDay = _cloneDeep(paydate)
                                                let setLastDateEnd = endDateRentalDay
                          
                                                if(defaultPay.length){
                                                    setLastDateEnd = paydate
                                                }else{
                                                    setLastDateEnd = _cloneDeep(paydate).subtract(1,'day')
                                                }
                                                let dayCount = day
                                                let ckStartDateRentalDay = false
                                                if (!_isUndefined(groupPaydate[i - 1]) && groupPaydate[i - 1].amount !== outstanding) {
                                                    let amount = 0
                                                    for (let iAmount = 0; iAmount <= (i - 1); iAmount++) {
                                                        amount += Number(groupPaydate[iAmount].amount)
                                                    }
                                                    param.outstanding = outstanding - amount
                                                    if (interestCalDate) {
                                                        const monthInterestCalLoop = DateFormat(interestCalDate)
                                                        const oldDateNomal = DateFormat(groupPaydate[i - 1].paydate)
                                                        if(monthInterestCalLoop > oldDateNomal){
                                                            param.startDate = monthInterestCalLoop.format("DD-MM-YYYY")
                                                            startDateRentalDay = monthInterestCalLoop
                                                            dayLoop = CountDate(paydate, monthInterestCalLoop, [true])
                                                      
                                                        }else{
                                                            param.startDate = DateFormat(_cloneDeep(oldDateNomal)).add(defaultPay.length > 0 ? 1 : 0, 'days').format("DD-MM-YYYY")
                                                            startDateRentalDay = DateFormat(_cloneDeep(oldDateNomal)).add(defaultPay.length > 0 ? 1 : 0, 'days')
                                                            dayLoop = CountDate(paydate, oldDateNomal, [])
                                                        }
                                                    }else{
                                                        const checkStartDate = DateFormat(_cloneDeep(groupPaydate[i - 1].paydate)).add(defaultPay.length > 0 ? 1 : 0, 'days')
                                                        if(checkStartDate.format("DD-MM-YYYY") > param.endDate){
                                                            dayLoop = 0
                                                        }else{
                                                            if(_cloneDeep(startDate).format('DD-MM-YYYY') < DateFormat(groupPaydate[i - 1].paydate).format('DD-MM-YYYY')){
                                                                param.startDate = checkStartDate.format("DD-MM-YYYY")
                                                                startDateRentalDay = checkStartDate
                                                                dayLoop = CountDate(paydate, DateFormat(groupPaydate[i - 1].paydate), [])
                                                            }
                                                            ckStartDateRentalDay = (groupPaydate.length - 1) == i ? false : true
                                                        }
                                                    }
                                          
                                                }
                                                
                                                param.endDate = _cloneDeep(_endDate).subtract(defaultPay.length ? 0 : 1, 'days').format("DD-MM-YYYY")
                                                
                                                if (nRate.length > 1 && dayLoop > 0) {
                                                    if(setLastDateEnd.format('YYYY/MM/DD') >= element.endDate.format('YYYY/MM/DD')){
                                                        setLastDateEnd = element.endDate
                                                        dayCount = CountDate(element.endDate, monthInvoicLoop, [true])
                                                    }
                                                    if ((index + 1) === nRate.length) {
                                                        dayCount = CountDate(_cloneDeep(endDateRentalDay).subtract(defaultPay.length ? 0 : 1, 'days'), monthInvoicLoop, [true])
                                                        if(dayLoop + lastDay > day){
                                                            const x = (dayLoop + lastDay) - day
                                                            // param.startDate = _cloneDeep(_endDate).subtract((dayLoop - x)-1, 'days').format("DD-MM-YYYY")
                                                            // param.endDate = _cloneDeep(_endDate).subtract(defaultPay.length ? 0 : 1, 'days').format("DD-MM-YYYY")
                                                            // dayLoop = CountDate(_cloneDeep(_endDate).subtract(defaultPay.length ? 0 : 1, 'days'),_cloneDeep(_endDate).subtract(dayLoop - x, 'days') , [])
                                                             param.startDate = _cloneDeep(endDateRentalDay).subtract((dayLoop - x)-1, 'days').format("DD-MM-YYYY")
                                                             param.endDate   = _cloneDeep(endDateRentalDay).subtract(defaultPay.length ? 0 : 1, 'days').format("DD-MM-YYYY")
                                                             dayLoop         = CountDate(_cloneDeep(endDateRentalDay).subtract(defaultPay.length ? 0 : 1, 'days'),_cloneDeep(endDateRentalDay).subtract(dayLoop - x, 'days') , [])
                                            
                                                            }else{
                                                            // param.endDate = _cloneDeep(_endDate).subtract(defaultPay.length ? 0 : 1, 'days').format("DD-MM-YYYY")
                                                            // dayLoop = CountDate(_cloneDeep(_endDate).subtract(defaultPay.length ? 0 : 1, 'days'), startDateRentalDay, [true])
                                                            // if(_cloneDeep(_endDate).subtract(defaultPay.length ? 0 : 1, 'days').format('DD-MM-YYYY') >= _cloneDeep(startDateRentalDay).add(1,'day').format('DD-MM-YYYY') && ckStartDateRentalDay){
                                                            //     param.startDate = _cloneDeep(startDateRentalDay).add(1,'day').format('DD-MM-YYYY')
                                                            //     dayLoop = CountDate(_cloneDeep(_endDate).subtract(defaultPay.length ? 0 : 1, 'days'), _cloneDeep(startDateRentalDay).add(1,'day'), [true])
                                                            // }
                                                            param.endDate = _cloneDeep(endDateRentalDay).subtract(defaultPay.length ? 0 : 1, 'days').format("DD-MM-YYYY")
                                                            dayLoop = CountDate(_cloneDeep(endDateRentalDay).subtract(defaultPay.length ? 0 : 1, 'days'), startDateRentalDay, [true])

                                                            if(_cloneDeep(endDateRentalDay).subtract(defaultPay.length ? 0 : 1, 'days').format('DD-MM-YYYY') >= _cloneDeep(startDateRentalDay).add(1,'day').format('DD-MM-YYYY') && ckStartDateRentalDay){
                                                                param.startDate = _cloneDeep(startDateRentalDay).add(1,'day').format('DD-MM-YYYY')
                                                                dayLoop = CountDate(_cloneDeep(endDateRentalDay).subtract(defaultPay.length ? 0 : 1, 'days'), _cloneDeep(startDateRentalDay).add(1,'day'), [true])
                                                            }
                                                            // console.log('first2')
                                                        }
                                                  
                                                    } else {
                                                        if (Number(endDate.format('D')) < Number(paydate.format('D'))) {
                                                            param.startDate = startDateRentalDay.format('DD-MM-YYYY')
                                                            param.endDate = _endDate.format("DD-MM-YYYY")
                                                            dayLoop = CountDate(_cloneDeep(_endDate), startDateRentalDay, [true])
                                                            dayCount = CountDate(_endDate, monthInvoicLoop, [true])
                                                        }
                                                    }
                                                    if (_cloneDeep(_endDate).subtract(defaultPay.length ? 0 : 1, 'days').format('MM') !== _startDate.format('MM')) {
                                                        param.endDate = param.startDate
                                                    }
                                                    if(dayLoop > 0 && defaultPay.length){
                                                        if(endDate.format('YYYY/MM/DD') == DateFormat(endDate).endOf('month').format('YYYY/MM/DD') && paydate.format('YYYY/MM/DD') == endDate.format('YYYY/MM/DD')){
                                                            const sumAmount = _sumBy(groupPaydate, function (o) { return Number(o.amount); })
                                                            const cal = Number(outstanding) - sumAmount
                                                            if(cal > 0){
                                                                dayLoop -= 1
                                                                param.endDate = _cloneDeep(endDate).subtract(1,'day').format('DD-MM-YYYY')
                                                            }
                                                        }
            
                                                    }
                                                    param.normalRate = rateRes.value
                                                    param.rentalDay = dayLoop
                                                    param.aging     = dayCount
                                                    if (param.rentalDay > 0) {
                                                        lastDateEnd = setLastDateEnd
                                                        item.push(groupData(param,false,formatToFixed))
                                                    }else{
                                                        day = lastDay
                                                    }
                                                }else{
                                                    if (_cloneDeep(_endDate).subtract(defaultPay.length ? 0 : 1, 'days').format('MM') !== _startDate.format('MM')) {
                                                        param.endDate = param.startDate
                                                    }
                                                   
                                                    param.normalRate = rateRes.value
                                                    param.rentalDay = dayLoop
                                                    param.aging     = dayCount
                                                    if (param.rentalDay > 0) {
                                                        lastDateEnd = setLastDateEnd
                                                        item.push(groupData(param,false,formatToFixed))
                                                    }else{
                                                        day = lastDay
                                                    }
                                                }
                                                
                                            } else {

                                                let countDate = rateRes.type - 30
                                                if (rateRes.type === 9999) {
                                                    countDate = day
                                                }
                                                let listTypeDay = []
                                                for (let index = 1; index <= 12; index++) {
                                                    listTypeDay.push(index * 30)
                                                    
                                                }
                                                if(!listTypeDay.includes(countDate)){
                                                    countDate = countDate - 1
                                                }
                                               
                                                let totalDataInvoice = _cloneDeep(monthInvoicLoop).add(countDate, 'days')
                              
                                                if (interestCalDate) {
                                                    if (totalDataInvoice.unix() <= DateFormat(interestCalDate).unix()) {
                                                        totalDataInvoice = DateFormat(interestCalDate)
                                                    }
                                                }
                                                if(index != 0 && i > 0 && totalDataInvoice.format('YYYY/MM/DD') < startDate.format('YYYY/MM/DD')){
                                                    totalDataInvoice = startDate
                                                }
                                                let _oldStartDate = startDate
                                                let oldDate = CountDate(totalDataInvoice, startDate, [])
                                                let newPaydate = CountDate(paydate, totalDataInvoice,  defaultPay)
                                                let setLastDateEnd = totalDataInvoice
                                            
                                                    if(newPaydate > 0){
                                                        if(defaultPay.length){
                                                            setLastDateEnd = paydate
                                                        }else{
                                                            setLastDateEnd = _cloneDeep(paydate).subtract(1,'day')
                                                        }
                                                    }
                                                    if(paydate.format('YYYY/MM/DD') > _endDate.format('YYYY/MM/DD')){
                                                        newPaydate = CountDate(_endDate, totalDataInvoice, [true])
                                                        setLastDateEnd = _endDate
                                                    }
                                                    // console.log('oldDate',oldDate,'newPaydate', newPaydate)
                                                    if (oldDate <= 0 && nRate.length === 1 && totalDataInvoice.format('YYYY/MM/DD') < startDate.format('YYYY/MM/DD') && paydate.format('YYYY/MM/DD') >= startDate.format('YYYY/MM/DD')) {
                                                        newPaydate = CountDate(paydate, startDate,  defaultPay)
                                                        if(defaultPay.length){
                                                            setLastDateEnd = paydate
                                                        }else{
                                                            setLastDateEnd = _cloneDeep(paydate).subtract(1,'day')
                                                        }
                                                    }
                             
                                                    //new
                                                    // if(Number(paydate.format('YYYYMMDD')) > Number(_endDate.format('YYYYMMDD'))){
                                                    //     if(Number(startDate.format('YYYYMMDD')) > Number(totalDataInvoice.format('YYYYMMDD'))){
                                                    //         newPaydate = CountDate(_endDate, startDate, [true])
                                                    //     }else{
                                                    //         newPaydate = CountDate(_endDate, totalDataInvoice, [true])
                                                    //     }
                                                    //     setLastDateEnd = _endDate
                                                    // }
                                                    // console.log('oldDate',oldDate,'newPaydate', newPaydate)
                                                
                                     
                                                if (dateLoopCount !== 0  && dateLoopCount > 0) {
                                                    const dayTotalCal = dayLoop - dateLoopCount
                                                    if (dayTotalCal > 0 && groupPaydate.length == 1) {
                                                        oldDate = CountDate(totalDataInvoice, DateFormat(groupPaydate[i - 1].paydate), [])
                                                        _oldStartDate = DateFormat(groupPaydate[i - 1].paydate)
                                                        if (nRate.length > 1) {
                                                            if (index > 0) {
                                                                oldDate = CountDate(totalDataInvoice, _cloneDeep(DateFormat(groupPaydate[i - 1].paydate)).add(1, 'day'), [])
                                                                // _oldStartDate = DateFormat(groupPaydate[i - 1].paydate).add(1,'day')
                                                            }
                                                        }
                                                        if (oldDate > 0) {
                                                            newPaydate = dayTotalCal - oldDate
                                                        } else {
                                                            newPaydate = dayTotalCal
                                                        }
                                                    }
                                                }else  if (dateLoopCount !== 0 && dateLoopCount < 0) {
                                                    if(nRate.length > 1){
                                                        const inPaydate = _cloneDeep(DateFormat(groupPaydate[i - 1].paydate)).add(1,'day')
                                                        if(index > 0 && groupPaydate.length > 1 && index != (nRate.length - 1) && Number(startDate.format('YYYYMMDD')) < Number(inPaydate.format('YYYYMMDD'))){
                                                            oldDate = CountDate(totalDataInvoice, inPaydate, [])
                                                           
                                                        }
                                                    }
                                                } else if (dateLoopCount === 0) {
                                          
                                                    if (oldDate > 0 && nRate.length === 1) {
                                                   
                                                        if (!listTypeDay.includes(countDate) && Number(totalDataInvoice.format('D')) !== Number(paydate.format('D'))) {
                                                            oldDate = Number(totalDataInvoice.format('D'))
                                                            newPaydate = Number(paydate.format('D')) - oldDate - 1
                                                            if (defaultPay.length) {
                                                                newPaydate = Number(paydate.format('D')) - oldDate
                                                            }
                                                        }else if(listTypeDay.includes(countDate) && oldDate != (Number(totalDataInvoice.format('D')) - Number(startDate.format('D')) + 1)){
                                                            if(countDate >= CountDate(totalDataInvoice,monthInvoicLoop,[true])){
                                                                oldDate = Number(totalDataInvoice.format('D'))
                                                                newPaydate = Number(paydate.format('D')) - oldDate - 1
                                                                if (defaultPay.length) {
                                                                    newPaydate = Number(paydate.format('D')) - oldDate
                                                                }
                                                            }
                                                        }
                                                    }else if(nRate.length > 1){
                                                        const d = defaultPay.length ? 1 : 0
                                                        if(listTypeDay.includes(countDate) && oldDate >= 0 && oldDate != (Number(totalDataInvoice.format('D')) - Number(startDate.format('D')) + d)){
                                                         
                                                            if(index == 0 && element.date <= totalDataInvoice && element.endDate >= totalDataInvoice){
                                                                oldDate = Number(totalDataInvoice.format('D'))
                                                               const ckCountAllEnd = CountDate(totalDataInvoice, monthInvoicLoop, [true])
                                                         
                                                                if(ckCountAllEnd < day){
                                                                    oldDate = (day - ckCountAllEnd) + 1
                                                                }else if(ckCountAllEnd === day && (day - dayLoopDefault) > 0){
                                                                    const countRang = countDate - dayLoopDefault
                                                                    oldDate = countRang
                                                                }
                                                                    if(element.date <= paydate && element.endDate >= paydate){
                                                                        newPaydate = Number(paydate.format('D')) - oldDate - 1
                                                                        if(ckCountAllEnd < day){
                                                                            newPaydate = (Number(paydate.format('D')) - oldDate) - 2
                                                                        }else if(ckCountAllEnd === day && (day - dayLoopDefault) > 0){
                                                                            const countRang = countDate - dayLoopDefault
                                                                            newPaydate = (day - dayLoopDefault) - countRang
                                                                        }
                                                                    }else{
                                                                        newPaydate = Number(element.endDate.format('D')) - oldDate
                                                                    }
                                                                
                                                                
                                                              
                                                            }
                                                        }else if(listTypeDay.includes(countDate) && oldDate < 0){
                                                            if(Number(element.date.format('YYYYMMDD')) <= Number(startDate.format('YYYYMMDD')) && Number(element.endDate.format('YYYYMMDD')) >= Number(startDate.format('YYYYMMDD'))){
                                                                console.log('2')
                                                                if(Number(element.endDate.format('YYYYMMDD')) >= Number(paydate.format('YYYYMMDD'))){
                                                                    newPaydate = CountDate(paydate, startDate, defaultPay)
                                                                }
                                                            }
                                                            // if(element.date < startDate && element.endDate >= startDate){
                                                            //     newPaydate = CountDate(paydate, startDate, defaultPay)
                                                            // }
                                                        }else if(index > 0 && listTypeDay.includes(countDate) && index != (nRate.length - 1)  && startDate.format('YYYY/MM/DD') != totalDataInvoice.format('YYYY/MM/DD') && totalDataInvoice.format('YYYY/MM/DD') > paydate.format('YYYY/MM/DD')){
                                                            oldDate = CountDate(totalDataInvoice, startDate, [true])
                                                            newPaydate = CountDate(paydate, _cloneDeep(totalDataInvoice.add(1,'day')), defaultPay)
                                                        }
                                                    }
                                                }
                                                // console.log('oldDate', oldDate,'newPaydate',newPaydate,'day',day)
                                                if (rateRes.type !== 9999 && totalDataInvoice.month() === DateFormat(date).month()) {
                                                    console.log('first 1')

                                                    if (!_isUndefined(groupPaydate[i - 1]) && groupPaydate[i - 1].amount !== outstanding) {
                                                        let amount = 0
                                                        for (let iAmount = 0; iAmount <= (i - 1); iAmount++) {
                                                            amount += Number(groupPaydate[iAmount].amount)
                                                        }
                                                        param.outstanding = outstanding - amount
                                                    }
                                              
                                                    if (newPaydate > 0 && defaultPay.length) {
                                                        if (endDate.format('YYYY/MM/DD') == DateFormat(endDate).endOf('month').format('YYYY/MM/DD') && paydate.format('YYYY/MM/DD') == endDate.format('YYYY/MM/DD')) {
                                                            const sumAmount = _sumBy(groupPaydate, function (o) { return Number(o.amount); })
                                                            const cal = Number(outstanding) - sumAmount
                                                            if (cal > 0) {
                                                                newPaydate -= 1
                                                            }
                                                        }

                                                    }
                                                    // console.log('oldDate', oldDate)
                                                    if (oldDate > 0) {
                                                        let lastEndDate = ''
                                                        let endDateAging = null
                                                        for (let i = 0; i < 2; i++) {
                                                            if (i === 0) {
                                                                
                                                                param.startDate = _cloneDeep(_oldStartDate).format("DD-MM-YYYY")
                                                                let newOldDate = 0
                                                                if(nRate.length > 1){
                                                                    if(index > 0){
                                                                        newOldDate = oldDate
                                                                        let _oldStartDate2 = _cloneDeep(_oldStartDate)
                                                                        if (Number(totalDataInvoice.format('D')) !== Number(paydate.format('D'))) {
                                                                            if (dateLoopCount !== 0) {
                                                                                if (defaultPay.length) {
                                                                                    _oldStartDate2 = _cloneDeep(_oldStartDate).add(1, 'days')
                                                                                }
                                                                            }
                                                                        }
                                                                        if(CountDate(_cloneDeep(_oldStartDate).add(newOldDate, 'days'), _oldStartDate2, [true]) > oldDate){
                                                                            newOldDate -= 1
                                                                        }
                                                                    }else{
                                                                        newOldDate = oldDate - 1
                                                                    }
                                                                }else{
                                                                    newOldDate = oldDate - 1
                                                                }
                                            
                                                                param.endDate = _cloneDeep(_oldStartDate).add(newOldDate, 'days').format("DD-MM-YYYY")
                                                                endDateAging = _cloneDeep(_oldStartDate).add(newOldDate, 'days')
                                                                lastEndDate = _cloneDeep(_oldStartDate).add(newOldDate, 'days')
                                                                let day2 = day - newPaydate
                                                               
                                                                if(param.endDate != _endDate.format("DD-MM-YYYY")){
                                                                    day2 = CountDate(_cloneDeep(_oldStartDate).add(newOldDate, 'days'), monthInvoicLoop, [true])
                                                                 
                                                                }
                                                                
                                                                if (Number(totalDataInvoice.format('D')) !== Number(paydate.format('D'))) {
                                                                    const ckCountAllEnd = CountDate(totalDataInvoice, monthInvoicLoop, [true])
                                                                    if (defaultPay.length && ckCountAllEnd >= day) {
                                                                        param.endDate = _cloneDeep(totalDataInvoice).format("DD-MM-YYYY")
                                                                        endDateAging = _cloneDeep(totalDataInvoice)
                                                                        lastEndDate = totalDataInvoice
                                                                    }

                                                                    // if (dateLoopCount !== 0) {
                                                                    //     if (defaultPay.length) {
                                                                    //         param.startDate = _cloneDeep(_oldStartDate).add(1, 'days').format("DD-MM-YYYY")
                                                                    //     }
                                                                    // }
                                                                }
                                                                // console.log('param.startDate ', param.startDate )
                                                                // const aging = CountDate(totalDataInvoice, monthInvoicLoop, [])
                                                                param.normalRate = rateRes.oldValue
                                                                param.rentalDay = oldDate
                                                                param.aging = day2
                                                            } else {
                                                                param.startDate = _cloneDeep(lastEndDate).add(1, 'days').format("DD-MM-YYYY")
                                                                param.endDate = _cloneDeep(lastEndDate).add(newPaydate, 'days').format("DD-MM-YYYY")
                                                                if(param.endDate >= _endDate.format("DD-MM-YYYY")){
                                                                    param.endDate = _endDate.format("DD-MM-YYYY")
                                                                }
                                                                // console.log('_endDate.format("DD-MM-YYYY")', param.endDate,_cloneDeep(lastEndDate).format("DD-MM-YYYY"))
                                                               let day3 = day
                                                                if(param.endDate != _endDate.format("DD-MM-YYYY")){
                                                                    day3 = CountDate(_cloneDeep(lastEndDate).add(newPaydate, 'days'), monthInvoicLoop, [true])
                                                                //    console.log('setDay3', setDay3)
                                                                //     if(day >= setDay3){
                                                                //         day3 = setDay3
                                                                //     }
                                                                }
                                                            //  console.log('day', lastEndDate.format("DD-MM-YYYY"))
                                                                param.normalRate = rateRes.value
                                                                param.rentalDay = newPaydate
                                                                param.aging = day3
                                                            }
                                                          
                                                            if (param.rentalDay > 0) {
                                                                // console.log('param', _cloneDeep(param))
                                                                lastDateEnd = setLastDateEnd
                                                                item.push(groupData(param,false,formatToFixed))
                                                            }
                                                        }
                                                    } else {
                                                        console.log('first 2')
                                                        if (!_isUndefined(groupPaydate[i - 1])) {

                                                            let numStartDate = newPaydate
                                                     
                                                            let numEndDate = 1
                                                            if(defaultPay.length){
                                                                 numStartDate = newPaydate - 1
                                                                 numEndDate = 0
                                                            }
                                                            let dayCount = CountDate(endDate, monthInvoicLoop, [true])
                                                            
                                                            if(CountDate(endDate, startDate, [true]) != newPaydate){
                                                                // param.startDate = DateFormat(groupPaydate[i].paydate).subtract(numStartDate, 'days').format("DD-MM-YYYY")
                                                                // param.endDate = DateFormat(groupPaydate[i].paydate).subtract(numEndDate, 'days').format("DD-MM-YYYY")
                                                                let endDateCustom = DateFormat(_cloneDeep(startDate)).add(newPaydate > 0 ? newPaydate - 1:0, 'days')
                                                                dayCount = CountDate(endDateCustom, monthInvoicLoop, [true])
                                                                param.endDate = endDateCustom.format("DD-MM-YYYY")
                                                            }

                                                            param.normalRate = rateRes.value
                                                            param.rentalDay = newPaydate
                                                            param.aging = dayCount
                                                            if (param.rentalDay > 0) {
                                                                 lastDateEnd = setLastDateEnd
                                                                //  console.log('param', _cloneDeep(param))
                                                                item.push(groupData(param,false,formatToFixed))
                                                            }
                                                        } else {

                                                            let subPaydate      = _cloneDeep(paydate)
                                                                subPaydate      = subPaydate.subtract(1, 'days')
                                                                if(paydate > _endDate){
                                                                    subPaydate = _cloneDeep(_endDate)
                                                                }
                                                                param.startDate = _oldStartDate.format("DD-MM-YYYY")
                                                                param.endDate   = subPaydate.format("DD-MM-YYYY")
                                                               let dayCount = day
                                                               dayCount = CountDate(subPaydate, monthInvoicLoop, [true])
                                                              
                                                            if(defaultPay.length){
                                                                if(newPaydate > CountDate(subPaydate, _oldStartDate, [])){
                                                                    param.endDate   = _cloneDeep(_oldStartDate).add(newPaydate-1,'days').format("DD-MM-YYYY")
                                                                    dayCount = CountDate(_cloneDeep(_oldStartDate).add(newPaydate-1,'days'), monthInvoicLoop, [true])
                                                                }
                                                            }
                                                 
                                                            if (defaultPay.length && DateFormat(subPaydate).unix() <= DateFormat(_oldStartDate).unix()) {
                                                                if(subPaydate.format('DD') !== '01'){
                                                                    param.endDate = param.startDate
                                                                    dayCount = CountDate(_oldStartDate, monthInvoicLoop, [true])
                                                                }
                                                            }
                                                       
                                                            if (_cloneDeep(_endDate).subtract(defaultPay.length ? 0 : 1, 'days').format('MM') !== _startDate.format('MM')) {
                                                                param.endDate = param.startDate
                                                                dayCount = CountDate(_oldStartDate, monthInvoicLoop, [true])
                                                            }
                                                          
                                                            if(nRate.length > 1){
                                                                if(newPaydate > CountDate(subPaydate, _oldStartDate, [])){
                                                                    param.endDate   = _cloneDeep(_oldStartDate).add(newPaydate-1,'days').format("DD-MM-YYYY")
                                                                    dayCount = CountDate( _cloneDeep(_oldStartDate).add(newPaydate-1,'days'), monthInvoicLoop, [true])
                                                                }
                                                            }
                                                     
                                                            param.normalRate = rateRes.value
                                                            param.rentalDay = newPaydate
                                                            param.aging = dayCount
                                                            if (param.rentalDay > 0) {
                                                                 lastDateEnd = setLastDateEnd
                                                                //  console.log('param', _cloneDeep(param))
                                                                item.push(groupData(param,false,formatToFixed))
                                                            }
                                                        }
                                                    }
                                                } else {
                                                    console.log('first 2')
                                                    param.startDate = _startDate.format("DD-MM-YYYY")
                                                    param.endDate = _cloneDeep(_endDate).subtract(defaultPay.length ? 0 : 1, 'days').format("DD-MM-YYYY")
                                            
                                                    if (!_isUndefined(groupPaydate[i - 1]) && groupPaydate[i - 1].amount !== outstanding) {
                                                        // console.log('oldDate,newPaydate', oldDate,newPaydate,day)
                                                        let amount = 0
                                                        for (let iAmount = 0; iAmount <= (i - 1); iAmount++) {
                                                            amount += Number(groupPaydate[iAmount].amount)
                                                        }
                                                        param.outstanding = outstanding - amount
                                                        param.startDate = DateFormat(groupPaydate[i - 1].paydate).format("DD-MM-YYYY")
                                                        if (defaultPay.length) {
                                                            param.startDate = DateFormat(_cloneDeep(groupPaydate[i - 1].paydate)).add(1, 'day').format("DD-MM-YYYY")
                                                        }
                                                        param.endDate = DateFormat(groupPaydate[i - 1].paydate).add((dayLoop - dateLoopCount) - (defaultPay.length ? 0 : 1), 'days').format("DD-MM-YYYY")
                                                        if(nRate.length > 1){
                                                            if(lastDay + dayLoop >= day){
                                                                const x = (dayLoop + lastDay) - day
                                                                dayLoop = dayLoop - x
                                                            }
                                                        }
                                                      
                                                    }
                                                    if (_cloneDeep(_endDate).subtract(defaultPay.length ? 0 : 1, 'days').format('MM') !== _startDate.format('MM')) {
                                                        param.endDate = param.startDate
                                                    }
                                                    
                                                    
                                                    param.normalRate = rateRes.value
                                                    param.rentalDay = dayLoop
                                                    // param.rentalDay = dateLoopCount > 0 ? dayLoop - dateLoopCount : dayLoop
                                                    if(nRate.length > 1){
                                                        param.rentalDay = dateLoopCount > 0 ? dayLoop - dateLoopCount : dayLoop
                                                    }
                                                    if(param.rentalDay > 0 && defaultPay.length){
                                                        if(endDate.format('YYYY/MM/DD') == DateFormat(endDate).endOf('month').format('YYYY/MM/DD') && paydate.format('YYYY/MM/DD') == endDate.format('YYYY/MM/DD')){
                                                            const sumAmount = _sumBy(groupPaydate, function (o) { return Number(o.amount); })
                                                            const cal = Number(outstanding) - sumAmount
                                                            if(cal > 0){
                                                                param.rentalDay -= 1
                                                                
                                                            }
                                                        }
            
                                                    }
                                                    if(nRate.length > 1){
                                                        if(index+1 === nRate.length && param.startDate <= _startDate.format("DD-MM-YYYY")){
                                                            // console.log('_startDate.format("DD-MM-YYYY")', _startDate.format("DD-MM-YYYY"))
                                                            param.startDate =_startDate.format("DD-MM-YYYY")
                                                            param.endDate = _cloneDeep(_startDate).add(param.rentalDay-1,'days').format("DD-MM-YYYY")
                                                            param.aging = CountDate(_cloneDeep(_startDate).add(param.rentalDay-1,'days'), monthInvoicLoop, [true])
                                                        }else{
                                                            if(param.startDate > _cloneDeep(_startDate).format("DD-MM-YYYY")){
                                                                param.endDate = _cloneDeep(moment(param.startDate,'DD-MM-YYYY')).add(param.rentalDay-1,'days').format("DD-MM-YYYY")
                                                                param.aging = CountDate(_cloneDeep(moment(param.startDate,'DD-MM-YYYY')).add(param.rentalDay-1,'days'), monthInvoicLoop, [true])
                                                            }else{
                                                                param.endDate = _cloneDeep(_startDate).add(param.rentalDay-1,'days').format("DD-MM-YYYY")
                                                                param.aging = CountDate(_cloneDeep(_startDate).add(param.rentalDay-1,'days'), monthInvoicLoop, [true])
                                                            }
                                                        }
                                                        
                                                    }
                                           
                                                    if (param.rentalDay > 0) {
                                                        lastDateEnd = setLastDateEnd
                                                        item.push(groupData(param,false,formatToFixed))
                                                    }else{
                                                         day = lastDay
                                                    }
                                                }
                                            }
                                        }
                                        // lastDateEnd = endDate
                                        dayLoopDefault = day
                                        lastDay = day
                                        console.log('จบวนลูป **************')
                                    }
                                    dateLoopCount = dayLoop
                                }
                              
                                const sumAmount = _sumBy(groupPaydate, function (o) { return Number(o.amount); })
                                const cal = Number(outstanding) - sumAmount
                                if (Number(outstanding).toFixed(2) !== sumAmount.toFixed(2) && cal > 20 && lastDate) { // คำนวนยอดที่จ่ายไม่เต็มจำนวน
                                    console.log('คำนวนยอดที่จ่ายไม่เต็มจำนวน', '=====================')
                                    const monthInvoic = DateFormat(invoiceDate)
                                    const aging = CountDate(endDate, monthInvoic, [true])
                                    let addLastDate = _cloneDeep(lastDate)
                                    if (defaultPay.length) {
                                        if(DateFormat(startDate).daysInMonth().toString() !== addLastDate.format('DD')){
                                            addLastDate = addLastDate.add(1, 'days')
                                        }
                                    }
                                    if (lastDate.format("DD") === '01') {
                                        addLastDate = _cloneDeep(lastDate)
                                    }
                                    let day = CountDate(endDate, addLastDate, [true])
                                    const dayRate = CountDate(endDate, monthInvoic, [true])
                                    // console.log('dayRate', dayRate,endDate.format('DD-MM-YYYY'))


                                    param.aging = aging
                                    param.startDate = addLastDate.format("DD-MM-YYYY")
                                    param.endDate = endDate.format("DD-MM-YYYY")
                                    param.outstanding = Number(outstanding) - sumAmount
                                    param.normalRate = lastRate
                                    param.rentalDay = day - (defaultPay.length ? 1 : 0)

                                    if (interestCalDate) {
                                        const monthInterestCal = DateFormat(interestCalDate)
                                        const dayInterestCal = CountDate(endDate, monthInterestCal, [])
                                        if (dayInterestCal >= 0) {
                                            param.aging = aging
                                            if (monthInterestCal.year() === startDate.year() && monthInterestCal.month() === startDate.month()) {
                                                // day = CountDate(endDate, monthInterestCal, [true])
                                                // param.startDate = monthInterestCal.format("DD-MM-YYYY")
                                                if (addLastDate.unix() <= DateFormat(interestCalDate).unix()) {
                                                    day = CountDate(endDate, monthInterestCal, [true])
                                                    param.startDate = monthInterestCal.format("DD-MM-YYYY")
                                                } else {
                                                    day = CountDate(endDate, addLastDate, [true])
                                                }
                                            } else {
                                                day = CountDate(endDate, addLastDate, [true])

                                            }
                                        } else {
                                            day = 0
                                        }
                                    }
                    
                                    let checkRateRes = CountRate(dayRate - day, masterCondition, normalRate)
                                    let rateRes = CountRate(dayRate, masterCondition, normalRate)
                                    // console.log("🚀 ~ file: YieldReport.js:1089 ~ out_standing.map ~ rateRes:", rateRes)
                                    // console.log('lastDay1', lastDay)
                                   
                                    if(day > 0){
                                        for (let index = 0; index < nRate.length; index++) {
                                            const element = nRate[index];
                                            // console.log('element.date <= addLastDate && element.endDate >= addLastDate', element.date <= addLastDate && element.endDate >= addLastDate)
                                            if(nRate.length > 1){
                                                // console.log('nRate.length', element.date.format('DD-MM'),addLastDate.format('DD-MM'),element.endDate.format('DD-MM'))
                                                // console.log('addLastDate.for', addLastDate.format('DD-MM-YYYY') <= element.endDate.format('DD-MM-YYYY'))
                                                if(addLastDate.format('DD-MM-YYYY') <= element.endDate.format('DD-MM-YYYY')){
                                                    rateRes = CountRate(dayRate, masterCondition, element.rate)
                                                    checkRateRes = CountRate(dayRate - day, masterCondition, element.rate)

                                                    if (rateRes.type === 'nomal') {
                                                            let dayNomal = CountDate(element.endDate, addLastDate, [true])
                                                            param.startDate = addLastDate.format("DD-MM-YYYY")
                                                            param.endDate = element.endDate.format("DD-MM-YYYY")
                                                            if(index > 0 && element.date.format('DD-MM-YYYY') > addLastDate.format('DD-MM-YYYY')){
                                                                dayNomal = CountDate(element.endDate, element.date, [true])
                                                                param.startDate = element.date.format("DD-MM-YYYY")
                                                                param.endDate = element.endDate.format("DD-MM-YYYY")
                                                            }
                                                            param.normalRate =  rateRes.value
                                                            param.rentalDay = dayNomal
                                                            param.aging = lastDay + dayNomal
                                                            lastDay = lastDay + dayNomal
                                                            if (param.rentalDay > 0) {
                                                                item.push(groupData(param,false,formatToFixed))
                                                            }
                                                        } else {
                                                            let countDate = rateRes.type - 30

                                                            if (rateRes.type === 9999) {
                                                                const countDay = dayRate - 360
                                                                let totalDate = _cloneDeep(DateFormat(invoiceDate)).add(dayRate, 'days')
                                                                if(totalDate.format('YYYY/MM/DD') > element.endDate.format('YYYY/MM/DD')){
                                                                    totalDate =  element.endDate
                                                                }
                                                                let oldDate = CountDate(totalDate, startDate, [])
                                                                if (countDay >= startDate.daysInMonth()) {
                                                                    param.normalRate = rateRes.value
                                                                    param.rentalDay = oldDate
                                                                    if (param.rentalDay > 0) {
                                                                        item.push(groupData(param,false,formatToFixed))
                                                                    }
                                                                } else {
                                                                    totalDate = _cloneDeep(DateFormat(invoiceDate)).add(359, 'days')
                                                                    oldDate = CountDate(endDate, addLastDate, [true])
                                                                    param.startDate = addLastDate.format("DD-MM-YYYY")
                                                                    param.endDate = endDate.format("DD-MM-YYYY")
                                                                    param.normalRate = rateRes.oldValue
                                                                    param.rentalDay = oldDate
                                                                    if (param.rentalDay > 0) {
                                                                        item.push(groupData(param,false,formatToFixed))
                                                                    }
                                                                }
                                                            } else {
                                                             
                                                                let _endDate = _cloneDeep(endDate)
                                                                let _endDate2 = _cloneDeep(endDate)

                                                                let totalDataInvoice = _cloneDeep(DateFormat(invoiceDate)).add(countDate, 'days')
                                                                if(totalDataInvoice.format('YYYY/MM/DD') > element.endDate.format('YYYY/MM/DD')){
                                                                    totalDataInvoice =  element.endDate
                                                                }else if( Number(element.date.format('DDMMYYYY')) > Number(addLastDate.format('DDMMYYYY'))){
                                                                    addLastDate = element.date
                                                                    param.startDate = addLastDate.format("DD-MM-YYYY")
                                                                }
                                                                // let oldDate = CountDate(totalDataInvoice, sDate.add(dateLoopCount, 'days'), [])
                                                                // if(groupPaydate.length){
                                                                //     totalDataInvoice =  DateFormat(groupPaydate[groupPaydate.length - 1].paydate)
                                                                // }
                                                                // console.log('totalDataInvoice', lastDay,totalDataInvoice.format('DD-MM-YYYY'),addLastDate.format('DD-MM-YYYY'),element.endDate.format('DD-MM-YYYY'))
                                                                let oldDate = CountDate(totalDataInvoice, addLastDate, [])
                                                                let newPaydate = CountDate(element.endDate, _cloneDeep(totalDataInvoice), [true])
                                                        
                                                                if(index == 0){
                                                                    if(totalDataInvoice.format('DD-MM-YYYY') >= element.endDate.format('DD-MM-YYYY')){
                                                                    
                                                                        oldDate = CountDate(element.endDate, addLastDate, [true])
                                                                        newPaydate = 0
                                                                        param.startDate = addLastDate.format("DD-MM-YYYY")
                                                                        param.endDate = element.endDate.format("DD-MM-YYYY")
                                                                    }
                                                                }else if(index > 0 && addLastDate.format('DD-MM-YYYY') < element.date.format('DD-MM-YYYY') && totalDataInvoice.format('DD-MM-YYYY') <= element.date.format('DD-MM-YYYY')){
                                                                    oldDate = CountDate(totalDataInvoice, element.date, [])
                                                                    newPaydate = CountDate(element.endDate, element.date, [true])
                                                                    param.startDate = addLastDate.format("DD-MM-YYYY")
                                                                    param.endDate = totalDataInvoice.format("DD-MM-YYYY")
                                                                    if((nRate.length - 1) == index){
                                                                        _endDate = endDate
                                                                    }
                                                                    // console.log('first1',index)
                                                                
                                                                }else if(index > 0 && totalDataInvoice.format('DD-MM-YYYY') >= element.date.format('DD-MM-YYYY') && totalDataInvoice.format('DD-MM-YYYY') <= element.endDate.format('DD-MM-YYYY') && oldDate <= 0){
                                                                    let startDate2 = element.date
                                                                    let ay1 = [true]
                                                                    let ay2 = []
                                                                    if(startDate2.format("DD-MM-YYYY") < addLastDate.format('DD-MM-YYYY')){
                                                                        startDate2 = addLastDate
                                                                        ay1 = []
                                                                        ay2 = [true]
                                                                    }
                                                                    oldDate = CountDate(totalDataInvoice, startDate2, ay1)
                                                                    newPaydate = CountDate(element.endDate, totalDataInvoice, ay2)
                                                                    param.startDate = startDate2.format("DD-MM-YYYY")
                                                                    param.endDate = _cloneDeep(totalDataInvoice).format("DD-MM-YYYY")
                                                     
                                                                    if((dayRate-lastDay) < (oldDate+newPaydate)){
                                                                        oldDate = 0
                                                                        newPaydate = CountDate(element.endDate, addLastDate, [true])

                                                                        if((nRate.length - 1) > index){
                                                                            _endDate2 = element.endDate
                                                                            _endDate = _cloneDeep(_endDate2)
                                                                        }
                                                                    }
                                                                    if(oldDate <= 0 && newPaydate > 0){
                                                                       
                                                                            if (addLastDate.format("DD-MM-YYYY") >= totalDataInvoice.format("DD-MM-YYYY")) {
                                                                                newPaydate = CountDate(element.endDate, addLastDate, [true])
                                                                            }
                                                                        
                                                                        _endDate = _cloneDeep(element.endDate)
                                                                        _endDate2 = element.endDate
                                                                    }
                                                                    // oldDate = CountDate(totalDataInvoice, element.date, [true])
                                                                    // newPaydate = CountDate(element.endDate, totalDataInvoice, [])
                                                                    // param.startDate = element.date.format("DD-MM-YYYY")
                                                                    // param.endDate = _cloneDeep(totalDataInvoice).format("DD-MM-YYYY")
                                                            
                                                                    // //  console.log('(dayRate-lastDay) <= (oldDate+newPaydate)',lastDay,dayRate, (dayRate-lastDay),(oldDate+newPaydate))
                                                                    // if((dayRate-lastDay) < (oldDate+newPaydate)){
                                                                    //     oldDate = 0
                                                                    //     newPaydate = CountDate(element.endDate, addLastDate, [true])
                                                                    //     if((nRate.length - 1) > index){
                                                                    //         _endDate2 = element.endDate
                                                                    //         _endDate = _cloneDeep(_endDate2)
                                                                    //     }
                                                                    // }
                                                                }else{
                                                                    if(oldDate < 0){
                                                                        newPaydate = CountDate(element.endDate, addLastDate, [true])
                                                                        _endDate = _cloneDeep(element.endDate)
                                                                        _endDate2 = element.endDate
                                                                    }
                                                                }
                                                                // console.log('totalDataInvoice', param.startDate,param.endDate)
                                                                // console.log('oldDate', oldDate,'newPaydate',newPaydate)
                                                            
                                                                if (oldDate > 0) {
                                                                
                                                                    let ckStartDate = moment(param.startDate,'DD-MM-YYYY').add(oldDate-1,'day')
                                                                    param.endDate = ckStartDate.format('DD-MM-YYYY')
                                                                
                                                                    // param.startDate = addLastDate.format("DD-MM-YYYY")
                                                                    // param.endDate = totalDataInvoice.format("DD-MM-YYYY")
                                                                    // param.aging = (dayRate - newPaydate)
                                                                    param.aging = lastDay + oldDate
                                                                    lastDay = lastDay + oldDate
                                                                    param.normalRate = rateRes.oldValue
                                                                    param.rentalDay = oldDate
                                                                    // console.log('param', param)
                                                                    if (param.rentalDay > 0) {
                                                                        // console.log('_cloneDeep(param)1', _cloneDeep(param))
                                                                        item.push(groupData(param,false,formatToFixed))
                                                                    }
                                                                    param.startDate = _cloneDeep(element.endDate).subtract(newPaydate - 1, 'days').format("DD-MM-YYYY")
                                                                    param.endDate = element.endDate.format("DD-MM-YYYY")
                                                                    param.aging = lastDay + newPaydate
                                                                    lastDay = lastDay + newPaydate
                                                                    param.normalRate = rateRes.value
                                                                    param.rentalDay = newPaydate
                                                                    // console.log('param', param.startDate,param.endDate)
                                                                    if (param.rentalDay > 0) {
                                                                        // console.log('_cloneDeep(param)', _cloneDeep(param))
                                                                        item.push(groupData(param,false,formatToFixed))
                                                                    }
                                                                } else {
                                                                    param.startDate = _endDate.subtract(newPaydate - 1, 'days').format("DD-MM-YYYY")
                                                                    param.endDate = _endDate2.format("DD-MM-YYYY")
                                                                    param.aging = CountDate(_endDate2,monthInvoic,[true])
                                                                    lastDay = lastDay + newPaydate
                                                                    param.normalRate =  rateRes.value
                                                                    param.rentalDay = newPaydate
                                                                    if (param.rentalDay > 0) {
                                                                        // console.log('_cloneDeep(param)', _cloneDeep(param))
                                                                        item.push(groupData(param,false,formatToFixed))
                                                                    }
                                                                }
                                                            }
                
                                                        }
                                                }

                                            }else if(element.date <= addLastDate && element.endDate >= addLastDate){
                                                rateRes = CountRate(dayRate, masterCondition, element.rate)
                                                checkRateRes = CountRate(dayRate - day, masterCondition, element.rate)
                                
                                                let isCheckDefault = true
                                                if(defaultPay.length && lastDate.format('DD') === lastDate.endOf('month').format('DD')){
                                                    isCheckDefault = false
                                                }
                                                // console.log('isEqual(checkRateRes, rateRes) && isCheckDefault', dayRate)
                                                if (isEqual(checkRateRes, rateRes) && isCheckDefault) {
                                                    param.normalRate =  rateRes.value
                                                    param.rentalDay = day
                                                    if (param.rentalDay > 0) {
                                                        item.push(groupData(param,false,formatToFixed))
                                                    }
                                                } else if(isCheckDefault){
                                                    if (rateRes.type === 'nomal') {
                                                        param.normalRate =  rateRes.value
                                                        param.rentalDay = day
                                                        if (param.rentalDay > 0) {
                                                            item.push(groupData(param,false,formatToFixed))
                                                        }
                                                    } else {
                                                        let countDate = rateRes.type - 30

                                                        if (rateRes.type === 9999) {
                                                            const countDay = dayRate - 360
                                                            let totalDate = _cloneDeep(DateFormat(invoiceDate)).add(dayRate, 'days')
                                                            let oldDate = CountDate(totalDate, startDate, [])
                                                            if (countDay >= startDate.daysInMonth()) {
                                                                param.normalRate = rateRes.value
                                                                param.rentalDay = oldDate
                                                                if (param.rentalDay > 0) {
                                                                    item.push(groupData(param,false,formatToFixed))
                                                                }
                                                            } else {
                                                                totalDate = _cloneDeep(DateFormat(invoiceDate)).add(359, 'days')
                                                                oldDate = CountDate(endDate, addLastDate, [true])
                                                                param.startDate = addLastDate.format("DD-MM-YYYY")
                                                                param.endDate = endDate.format("DD-MM-YYYY")
                                                                param.normalRate = rateRes.oldValue
                                                                param.rentalDay = oldDate
                                                                if (param.rentalDay > 0) {
                                                                    item.push(groupData(param,false,formatToFixed))
                                                                }
                                                            }
                                                        } else {
                                                            const sDate = _cloneDeep(startDate)
                                                            const _endDate = _cloneDeep(endDate)
                                                        
                                                            let totalDataInvoice = _cloneDeep(monthInvoic).add(countDate, 'days')
                                                            // let oldDate = CountDate(totalDataInvoice, sDate.add(dateLoopCount, 'days'), [])
                                                            let oldDate = CountDate(totalDataInvoice, addLastDate, [])
                                                            let newPaydate = CountDate(endDate, _cloneDeep(totalDataInvoice.subtract(1, 'days')), [])
                                        
                                                            if (oldDate > 0) {
            
                                                                param.startDate = addLastDate.format("DD-MM-YYYY")
                                                                param.endDate = totalDataInvoice.format("DD-MM-YYYY")
                                                                param.aging = (dayRate - newPaydate)
                                                                param.normalRate = rateRes.oldValue
                                                                param.rentalDay = oldDate
                                                                if (param.rentalDay > 0) {
                                                                    item.push(groupData(param,false,formatToFixed))
                                                                }
                                                                param.startDate = _endDate.subtract(newPaydate - 1, 'days').format("DD-MM-YYYY")
                                                                param.endDate = endDate.format("DD-MM-YYYY")
                                                                param.aging = dayRate
                                                                param.normalRate = rateRes.value
                                                                param.rentalDay = newPaydate
                                                                if (param.rentalDay > 0) {
                                                                    item.push(groupData(param,false,formatToFixed))
                                                                }
                                                            } else {
                                                                // param.startDate = DateFormat(totalDataInvoice).format("DD-MM-YYYY")
                                                                param.startDate = _endDate.subtract(newPaydate - 1, 'days').format("DD-MM-YYYY")
                                                                param.endDate = endDate.format("DD-MM-YYYY")
                                                                param.aging = dayRate
                                                                param.normalRate =  rateRes.value
                                                                param.rentalDay = newPaydate
                                                            
                                                                if (param.rentalDay > 0) {
                                                                    item.push(groupData(param,false,formatToFixed))
                                                                }
                                                            }
                                                        }
            
                                                    }
                                                }
                                            }
                                        }
                                    }


                                }
                            }
                            if (defaultPay.length) {
                                param.outstanding = outstanding
                                const sumAmount = _sumBy(groupPaydate, function (o) { return Number(o.amount); })
                                if (Number(outstanding).toFixed(2) !== sumAmount.toFixed(2) && sumAmount !== 0) {
                                    param.outstanding = (outstanding - sumAmount)
                                    if (groupPaydate.length === 1) {
                                        const element = defaultPay[0];
                                        let payDate1 = element.default_pay_date || endDate
                                        let defaultPayDate1 = DateFormat(payDate1)
                                        if (endDate.format('YYYYMM') === defaultPayDate1.format('YYYYMM')) {
                                            param.outstanding = outstanding
                                        }
                                    }
                                }
                                for (let index = 0; index < defaultPay.length; index++) {
                                    const monthInvoic = DateFormat(invoiceDate)
                                    const element = defaultPay[index];
                                    let payDate = element.default_pay_date || endDate
                                    let defaultPayDate = DateFormat(payDate)
                                    const aging = CountDate(defaultPayDate, monthInvoic, [])

                                    if(nRate.length > 1){
                                        startDate = nRate[0].date
                                    }
                                    if (startDate.format('YYYYMM') !== defaultPayDate.format('YYYYMM')) {
                                        defaultPayDate = DateFormat(endDate)
                                    }
                                    const dueDate = DateFormat(element.default_due_date).add(1, 'days')
                                    let _startDate = dueDate
                                    let newDueDate = CountDate(defaultPayDate, DateFormat(dueDate), defaultPay)
                                    if (startDate.year() !== dueDate.year() || dueDate.month() !== startDate.month()) {
                                        if(_startDate.format('YYYYMMDD') <= defaultPayDate.format('YYYYMMDD')){ // เพิ่มใหม่
                                            _startDate = _cloneDeep(defaultPayDate).startOf('month')
                                            newDueDate = CountDate(defaultPayDate, _startDate, defaultPay)
                                        }else{
                                            _startDate = startDate
                                            newDueDate = CountDate(defaultPayDate, startDate, defaultPay)
                                        }
                                    }
                                    

                                    let dayInterestCal = 0
                                    let calculateByFranchise = true
                              
                                    if (interestCalDate) {
                                        const monthInterestCalLoop = DateFormat(interestCalDate)
                                        dayInterestCal = CountDate(defaultPayDate, monthInterestCalLoop, [])
                                        if (CountDate(dueDate, monthInterestCalLoop, []) < 0 && monthInterestCalLoop.format('YYYYMM') === startDate.format('YYYYMM')) {
                                            newDueDate = dayInterestCal + 1
                                            _startDate = monthInterestCalLoop
                                        }
                                    
                                        if (groupPaydate.length) { // เช็คการจ่ายก่อนวันที่คำนวน
                                            let checkPayment = param.outstanding
                                            for (const iterator of groupPaydate) {
                                                if(monthInterestCalLoop.format('YYYYMM') === DateFormat(iterator.paydate).format('YYYYMM') && Number(DateFormat(iterator.paydate).format('DD')) <=  Number(monthInterestCalLoop.format('DD'))){
                                                 
                                                    if(param.outstanding > iterator.amount){
                                                        param.outstanding = param.outstanding - iterator.amount
                                                    }
                                                    checkPayment = checkPayment - iterator.amount
                                                }
                                            }

                                            // const sumAmount = _sumBy(groupPaydate, function (o) { return Number(o.amount); })
                                            // if (Number(param.outstanding).toFixed(2) !== sumAmount.toFixed(2)) {
                                            //     param.outstanding = param.outstanding - sumAmount
                                            // }

                                            if(dayInterestCal === 0 && checkPayment <= 20){
                                                if(franchise === 'SUZUKI NEW' || franchise === 'SUZUKINEW' || franchise === 'suzuki new'){
                                                    calculateByFranchise = false
                                                }
                                            }
                                        }

                                    }

                                    if (groupPaydate.length > 1) {
                                        const checkPay = _filter(groupPaydate, o => DateFormat(o.paydate).unix() >= dueDate.unix())
                                        const sumAmount = _sumBy(checkPay, function (o) { return parseFloat(o.amount); })
                                      
                                        if (parseFloat(outstanding).toFixed(2) !== sumAmount.toFixed(2)) {
                                            param.outstanding = sumAmount
                                        }
                                    }

                                    if(groupPaydate.length == 1){
                                        const checkPay = _filter(groupPaydate, o => DateFormat(o.paydate).unix() >= dueDate.unix())
                                        const sumAmount = _sumBy(checkPay, function (o) { return parseFloat(o.amount); })
                                        const total = parseFloat(outstanding).toFixed(2) - parseFloat(sumAmount)
                                        if(total > 1){
                                            param.outstanding = total.toFixed(2)
                                        }
                                    }

                                    const defaultRate = element.default_default_rate

                                    if (element.default_default === "AGING") {
                                        // param.outstanding = element.default_installment
                                        param.defaultAGINGRate = defaultRate
                                    } else {
                                        param.defaultSOTRate = defaultRate
                                    }
                                    if(element.default_installment){
                                        param.outstanding = element.default_installment
                                    }
                                    
                                    param.startDate = _startDate.format("DD-MM-YYYY")
                                    param.endDate   = defaultPayDate.format("DD-MM-YYYY")
                                    param.aging     = aging + 1
                               
                                    param.rentalDay = newDueDate
                                    if (param.rentalDay > 0 && dayInterestCal >= 0) {
                                        if(calculateByFranchise){
                                        item.push(groupData(param,false,formatToFixed))
                                        }
                                    }

                                }

                            }

                            if ((!paymentPay && !defaultPay.length) || (defaultPay.length && !paymentPay)) {
                                console.log('ไม่มีการจ่ายเงิน', '=====================')
                                param.outstanding = outstanding
                                let dayDefault = 0
                                for (let index = 0; index < nRate.length; index++) {
                                    const element   = nRate[index];
                                          startDate = _cloneDeep(element.date)
                                          endDate   = _cloneDeep(element.endDate)

                                    const day       = CountDate(endDate, DateFormat(invoiceDate), [true])
                                    let   totalData = CountDate(endDate, startDate, [true])

                                    let _startDate = startDate
                                    let _endDate = endDate
                                    if (DateFormat(invoiceDate).year() === startDate.year() && DateFormat(invoiceDate).month() === startDate.month()) {
                                        // totalData = CountDate(endDate, DateFormat(invoiceDate), [true])
                                        // _startDate = DateFormat(invoiceDate)
                                        if (Number(element.date.format('D')) > Number(DateFormat(invoiceDate).format('D'))) {
                                            totalData = CountDate(endDate, startDate, [true])
                                        } else {
                                            totalData = CountDate(endDate, DateFormat(invoiceDate), [true])
                                            _startDate = DateFormat(invoiceDate)
                                        }
                                    }
                                 
                                    if (interestCalDate) {
                                        const monthInterestCalLoop = DateFormat(interestCalDate)
                                        const dayInterestCal = CountDate(endDate, monthInterestCalLoop, [])
                                        if (dayInterestCal >= 0) {
                                            if (monthInterestCalLoop.year() === startDate.year() && monthInterestCalLoop.month() === startDate.month()) {
                                                // totalData = CountDate(endDate, monthInterestCalLoop, [true])
                                                // _startDate = monthInterestCalLoop
                                                if (Number(element.date.format('D')) > Number(monthInterestCalLoop.format('D'))) {
                                                    totalData = CountDate(endDate, startDate, [true])
                                                } else {
                                                    totalData = CountDate(endDate, monthInterestCalLoop, [true])
                                                    _startDate = monthInterestCalLoop
                                                }
                                            } else {
                                                totalData = CountDate(endDate, startDate, [true])
                                            }
                                        } else {
                                            totalData = 0
                                        }
                                    }

                                    param.startDate = _startDate.format("DD-MM-YYYY")
                                    param.endDate = _endDate.format("DD-MM-YYYY")
                                    param.aging = day
         
                                    if (totalData > 0) {
                                        const rateRes = CountRate(day, masterCondition, element.rate)
                                  

                                        if (rateRes.type === 'nomal') {
                                            param.normalRate = rateRes.value
                                            param.rentalDay = totalData
                                            if (param.rentalDay > 0) {
                                                item.push(groupData(param, true, formatToFixed))
                                            }
                                        } else {
                                           
                                            let countDate = rateRes.type - 30
                                            if (rateRes.type === 9999) {
                                                let totalDate = DateFormat(invoiceDate).add(day, 'days')
                                                let oldDate = CountDate(totalDate, startDate, [])
                                               
                                                param.startDate = _startDate.format("DD-MM-YYYY")
                                                param.endDate = _endDate.format("DD-MM-YYYY")
                                                param.normalRate = rateRes.value
                                                param.rentalDay = oldDate
                                                param.aging = day
                                                const countDay = day - 360

                                                if (countDay >= startDate.daysInMonth()) {
                                                    if (param.rentalDay > 0) {
                                                        item.push(groupData(param, true, formatToFixed))
                                                    }
                                                } else {
                                                    totalDate = DateFormat(invoiceDate).add(359, 'days')
                                                    if(Number(startDate.format('MM')) != Number(totalDate.format('MM'))){
                                                        if (param.rentalDay > 0) {
                                                            item.push(groupData(param, true, formatToFixed))
                                                        }
                                                    }else{
                                                        oldDate = CountDate(totalDate, startDate, [true])
                                                        let newPaydate = CountDate(endDate, totalDate, [])
                                                        if (totalDate.format('DD/MM/YYYY') < startDate.format('DD/MM/YYYY')) {
                                                            newPaydate = CountDate(endDate, startDate, [true])

                                                        }
                                                        param.startDate = _startDate.format("DD-MM-YYYY")
                                                        param.endDate = totalDate.format("DD-MM-YYYY")
                                                        param.normalRate = rateRes.oldValue
                                                        param.rentalDay = oldDate
                                                        param.aging = (day - newPaydate)
                                                        if (param.rentalDay > 0) {
                                                            item.push(groupData(param, true, formatToFixed))
                                                        }
                                                        param.startDate = _cloneDeep(totalDate).add(1, 'days').format("DD-MM-YYYY")
                                                        if (totalDate.format('DD/MM/YYYY') < startDate.format('DD/MM/YYYY')) {
                                                            param.startDate = startDate.format("DD-MM-YYYY")
                                                        }
                                                        param.endDate = endDate.format("DD-MM-YYYY")
                                                        param.normalRate = rateRes.value
                                                        param.rentalDay = newPaydate
                                                        param.aging = day
                                                        if (param.rentalDay > 0) {
                                                            item.push(groupData(param, true, formatToFixed))
                                                        }
                                                    }
                                                }

                                            } else {
                                                let totalDate = DateFormat(invoiceDate).add(countDate, 'days')
                                                let oldDate = CountDate(totalDate, startDate, [])
                                                
                                                let newTotalDate = CountDate(endDate, DateFormat(totalDate), [true])
                                                if(totalDate.format('MM') !== _startDate.format("MM")){
                                                    newTotalDate = CountDate(endDate, DateFormat(_startDate), [true])
                                                }
                                                
                                                if(oldDate > 0){
                                                    param.startDate = _startDate.format("DD-MM-YYYY")
                                                    param.endDate = totalDate.subtract(1, 'days').format("DD-MM-YYYY")
                                                    param.normalRate = rateRes.oldValue
                                                    param.rentalDay = oldDate
                                                    param.aging = (day - newTotalDate)
                                                    if (param.rentalDay > 0) {
                                                        item.push(groupData(param, true, formatToFixed))
                                                    }
                                                    if(totalDate.format('MM') !== _startDate.format("MM")){
                                                        param.startDate = _startDate.format("DD-MM-YYYY")
                                                    }else{
                                                        param.startDate = DateFormat(totalDate).add(1, 'day').format("DD-MM-YYYY")
                                                    }
                                                    param.endDate = _endDate.format("DD-MM-YYYY")
                                                    param.normalRate = rateRes.value
                                                    param.rentalDay = newTotalDate
                                                    param.aging = day
                                                    if (param.rentalDay > 0) {
                                                        item.push(groupData(param, true, formatToFixed))
                                                    }
                                                }else{
                                                    let  rentalDaySum = newTotalDate
                                                    if(totalDate.format('MM') !== _startDate.format("MM")){
                                                        param.startDate = _startDate.format("DD-MM-YYYY")
                                                    }else if(totalDate.format('DD') !== '01'){
                                                        param.startDate = DateFormat(totalDate).add(1, 'day').format("DD-MM-YYYY")
                                                    }
                                                    
                                                    if(dayDefault != 0 && (day-dayDefault) === (newTotalDate + oldDate)){
                                                        rentalDaySum = newTotalDate + oldDate
                                                        param.startDate = DateFormat(totalDate).add((oldDate*-1), 'day').format("DD-MM-YYYY")
                                                    }
                                                    param.endDate = _endDate.format("DD-MM-YYYY")
                                                    param.normalRate = rateRes.value
                                                    param.rentalDay = rentalDaySum
                                                    param.aging = day
                                                    if (param.rentalDay > 0) {
                                                        item.push(groupData(param, true, formatToFixed))
                                                    }
                                                }
                                                // for (let i = 0; i < 2; i++) {
                                                //     if (i === 0) {
                                                //         param.startDate = _startDate.format("DD-MM-YYYY")
                                                //         param.endDate = totalDate.subtract(1, 'days').format("DD-MM-YYYY")
                                                //         param.normalRate = rateRes.oldValue
                                                //         param.rentalDay = oldDate
                                                //         param.aging = (day - newTotalDate)
                                                //     } else {
                                                //         if(totalDate.format('MM') !== _startDate.format("MM")){
                                                //             param.startDate = _startDate.format("DD-MM-YYYY")
                                                //         }else{
                                                //             param.startDate = DateFormat(totalDate).add(1, 'day').format("DD-MM-YYYY")
                                                //         }
                                                       
                                                       
                                                //         param.endDate = _endDate.format("DD-MM-YYYY")
                                                //         param.normalRate = rateRes.value
                                                //         param.rentalDay = newTotalDate
                                                //         param.aging = day
                                                //     }
                                                //     if (param.rentalDay > 0) {
                                                //         item.push(groupData(param, true))
                                                //     }
                                                // }
                                            }
                                        }
                                    }
                                    dayDefault = day
                                }
                            }
                        }
                    })

                }
            })
         
            setDownloadItem(item)
        }
    }, [reportData])

    const exportExcel = () => {
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
            getReportAll(param)
        } else {
            notification({ type: 'error', text: 'Incomplete information' })
        }
    }
    const htmlNoImport = (<span className='text-danger'>No import file</span>)

    return (
        <>
            <Card className="my-3">
                <Card.Header className="d-flex justify-content-between">
                    <h3>Yield Report</h3>
                    <Button variant='primary' onClick={() => exportExcel()}>
                        {pendingSearch ? <Spinner animation="border" variant="success" /> : 'Calculate Yield'}
                    </Button>
                </Card.Header>
                {
                    !_isUndefined(dealerData) ?
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col md={2}>
                                        <p>Date:</p>
                                        <Form.Control type="text" value={dateActive} onChange={(e) => setDateActive(e.target.value)} placeholder="YYYY/MM" />
                                    </Col>
                                    {
                                        Object.keys(statusData).length &&
                                        <Col className="text-right">
                                            <Col >Master Data : {!_isUndefined(statusData.master_condition) && !_isUndefined(statusData.master_condition[0]) ? DateShowFormat(statusData.master_condition[0].create_at) : htmlNoImport}</Col>
                                            <Col >Out Standing : {!_isUndefined(statusData.out_standing) && !_isUndefined(statusData.out_standing[0]) ? DateShowFormat(statusData.out_standing[0].out_standing_create_at) : htmlNoImport}</Col>
                                            <Col >Payment : {!_isUndefined(statusData.payment) && !_isUndefined(statusData.payment[0]) ? DateShowFormat(statusData.payment[0].payment_create_at) : htmlNoImport}</Col>
                                            <Col >Default : {!_isUndefined(statusData.default_file) && !_isUndefined(statusData.default_file[0]) ? DateShowFormat(statusData.default_file[0].default_create_at) : htmlNoImport}</Col>
                                            <Col >Dealer Condition : {!_isUndefined(statusData.dealer_condition) && !_isUndefined(statusData.dealer_condition[0]) ? DateShowFormat(statusData.dealer_condition[0].dealer_condition_create_at) : htmlNoImport}</Col>
                                        </Col>
                                    }
                                </Row>
                                <Row>

                                    {
                                        downloadItem && !pendingSearch &&
                                        <Col>
                                            <ExcelFile
                                                element={
                                                    <Button variant='primary'>
                                                        {'Download File'}
                                                    </Button>
                                                }
                                                filename="Yield Report"
                                            // hideElement={true}
                                            >
                                                <ExcelSheet data={downloadItem} name="Yield Report">
                                                    <ExcelColumn label="Dealer Code" value="dealerCode" />
                                                    <ExcelColumn label="Franchise" value="franchise" />
                                                    <ExcelColumn label="Laon Type" value="laonType" />
                                                    <ExcelColumn label="StartDate" value="startDate" />
                                                    <ExcelColumn label="EndDate" value="endDate" />
                                                    <ExcelColumn label="InvoiceDate" value="invoiceDate" />
                                                    <ExcelColumn label="MidNo" value="midNo" />
                                                    <ExcelColumn label="Chassis" value="chassis" />
                                                    <ExcelColumn label="Outstanding (Inc.Vat)" value="outstanding" />
                                                    <ExcelColumn label="Normal Rate" value="normalRate" />
                                                    <ExcelColumn label="Default SOT Rate" value="defaultSOTRate" />
                                                    <ExcelColumn label="Default AGING Rate" value="defaultAGINGRate" />
                                                    <ExcelColumn label="Aging" value="aging" />
                                                    <ExcelColumn label="RentalDay" value="rentalDay" />
                                                    <ExcelColumn label="RentalAmt" value="rentalAmt" />
                                                    <ExcelColumn label="PayDate" value="payDate" />
                                                    <ExcelColumn label="PayAmount" value="payAmount" />
                                                </ExcelSheet>
                                            </ExcelFile>
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
            reportAll,
            masterInterest,
            loanType
        },
        inputData: {
            statusFile
        }
    } = state
    return {
        dealerCondition,
        reportAll,
        masterInterest,
        statusFile,
        loanType
    }
}

const mapDispatchToProps = {
    getReportAll: Condition.getReportAll,
    getStatusFile: InputData.getStatusFile,
    notification: Ui.notification
}

export default connect(mapStateToProps, mapDispatchToProps)(YieldReport)
