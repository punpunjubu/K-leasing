import React, { useState, useEffect, forwardRef } from 'react'
import { connect } from 'react-redux'
import isEqual from 'react-fast-compare'

import { formatAmount, DateFormat, CountRate, formatNumber } from '../../utils/helpers'
import { Ui } from '../../redux/actions'
import ShowInvoice from './ShowInvoice'
import MyDocument from './MyDocument'


import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'

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
const TotalWithHolding = (preVat, withHolding) => {
    return ((preVat * withHolding) / 100)
}
const TotalPreVat = (total, loanType) => {
    return loanType ? total : (total / 1.07)
}
const TotalVat = (total, preVat) => {
    return total - preVat
}
export const Invoice = (props) => {
    const {
        dealerCondition: { data: dealerData },
        invoiceAll: { data: invoiceData, pending: pendingSearch },
        masterInterest: { data: mor_mlr },
        loanType: { data: loanTypeData },
        dueDateShow, 
        dateShow,
        reportStatement: { data :reportStatementData} } = props

    const [dataRender, setDataRender] = useState({})
    const [showInvoice, setShowInvoice] = useState(null)

    const groupData = (data, formatToFixed) => {
        let {
            outstanding,
            rate,
            day,
            loanType,
            defaultWithHolding,
            defaultVat,
            midno
        } = data
        let total = TotalCharges(outstanding, rate, day)
        let preVat = TotalPreVat(total, loanType)
        let vat = loanType ? 0.00 : TotalVat(total, preVat)
        let withHolding = TotalWithHolding(preVat, defaultWithHolding)
        //new vat
        if (!loanType) {
            preVat = total
            vat = (total * Number(defaultVat)) / 100
            withHolding = (total * defaultWithHolding) / 100
            total = preVat + vat
        }
        return {
            midno,
            outstanding,
            rate,
            day,
            total,
            vat,
            preVat,
            withHolding,
            defaultWithHolding,
            formatToFixed
        }
    }

    useEffect(() => {
        if (!_isUndefined(invoiceData) && !_isUndefined(invoiceData.data) && !_isUndefined(invoiceData.master_condition)) {

            const { data, date, master_condition,  master_condition_spec, } = invoiceData

            let item = {}
            let numberRun = 1
            data.map((resDealer, index) => {
                const { out_standing, default_file, payment } = resDealer
                if (out_standing.length) {
                    const dealer = _find(dealerData, (e) => e.dealer_condition_dealer_code === out_standing[0].out_standing_dealer_code)
                    const dealer_code = dealer.dealer_condition_dealer_code
                    const nowDay = DateFormat(date)
                    
                    if (dealer_code !== '') {
                        item[dealer_code]               = dealer
                        item[dealer_code].adjustment1   = ''
                        item[dealer_code].adjustment2   = ''
                        item[dealer_code].date          = DateFormat(date)
                        item[dealer_code].dueDate       = DateFormat(date)
                        item[dealer_code].textCustom    = ''
                        item[dealer_code].invoiceNumber = `IF01${nowDay.add(543, 'year').format('YY')}${nowDay.format('MM')}${numberRun.toString().padStart(4, "0")}`
                        let  listInvoice                = []
                        numberRun++
                        let masterCondition = _find(master_condition, (e) => e.type === Number(dealer.dealer_condition_type_curtailment))
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

                        let normalRate = Number(findNormalRate.master_interest_start_rate) + Number(dealer.dealer_condition_nor_rate)

                        const loan                            = _find(loanTypeData, (e) => e.loan_type_by === 'loan')
                        const inventory                       = _find(loanTypeData, (e) => e.loan_type_by === 'inventory')
                        const loanType                        = dealer.dealer_condition_loan_type === "INVENTORY" ? false : true
                        const defaultWithHolding              = loanType ? loan.loan_type_tax : inventory.loan_type_tax
                        const defaultVat                      = loanType ? loan.loan_type_vat : inventory.loan_type_vat
                        item [dealer_code].defaultWithHolding = defaultWithHolding
                        item [dealer_code].defaultVat         = defaultVat
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
                                outstanding,
                                rate: 1,
                                day : 1,
                                loanType,
                                defaultWithHolding,
                                defaultVat,
                                midno
                            }
                            let startDate = DateFormat(date).startOf('month')

                            let endDate = DateFormat(date).endOf('month')
                            const defaultMonth = DateFormat(date).month()
                            let groupPaydate = []
                            if (paymentPay) {
                                param.outstanding = outstanding
                                for (let i = 0; i < 6; i++) {
                                    const paydate = paymentPay[`payment_paydate_${i + 1}`]
                                    const amount = paymentPay[`payment_amount_${i + 1}`]
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
                                        let paydate = DateFormat(groupPaydate[i].paydate)
                                        let day = 0
                                        if(index != 0 && i > 0 && paydate.format('YYYY/MM/DD') >= startDate.format('YYYY/MM/DD')){
                                            startDate = DateFormat(groupPaydate[i-1].paydate)
                                            if(lastDateEnd){
                                                const lastDateEndCK = _cloneDeep(lastDateEnd).add(1,'day')
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
                                        if (Number(endDate.format('D')) > Number(paydate.format('D'))) {
                                            day = CountDate(paydate, monthInvoicLoop, [])
                                        } else {
                                            day = CountDate(endDate, monthInvoicLoop, [])
                                            if (nRate.length > 1) {
                                                day = CountDate(endDate, monthInvoicLoop, [true])
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
                                                        // endDate = paydate
                                                    } else {
                                                        if (Number(startDate.format('D')) > Number(monthInterestCalLoop.format('D'))) {
                                                            dayLoop = CountDate(endDate, startDate, [])
                                                        } else {
                                                            dayLoop = CountDate(endDate, monthInterestCalLoop, [])
                                                            startDate = monthInterestCalLoop
                                                        }
                                                    }
                                                } else {
                                                    if (Number(endDate.format('D')) > Number(paydate.format('D'))) {
                                                        dayLoop = CountDate(paydate, startDate, [])
                                                        // endDate = paydate
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
                                                    // endDate = paydate
                                                    // if (nRate.length > 1) {
                                                    //     dayLoop = CountDate(paydate, startDate, [true])
                                                    // }
                                                } else {
                                                    dayLoop = CountDate(paydate, monthInvoicLoop, [])
                                                    if(i > 0 && groupPaydate.length > 1 && Number(startDate.format('YYYYMMDD')) >= Number(monthInvoicLoop.format('YYYYMMDD'))){
                                                        dayLoop = CountDate(paydate, startDate, [])
                                                    }
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
                                      
                                        const rateRes = CountRate(day, masterCondition, element.rate)

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
                                                            dayLoop = CountDate(paydate, monthInterestCalLoop, defaultPay.length > 0 ? [true] : [])
                                                            startDateRentalDay = monthInterestCalLoop //add 22/2/66
                                                        }else{
                                                            dayLoop = CountDate(paydate, oldDateNomal, [])
                                                            startDateRentalDay = oldDateNomal //add 22/2/66
                                                        }
                                                    }else{
                                                        const checkStartDate = DateFormat(_cloneDeep(groupPaydate[i - 1].paydate)).add(defaultPay.length > 0 ? 1 : 0, 'days')
                                                        if(checkStartDate.format('DD-MM-YYYY')>endDate.format('DD-MM-YYYY')){
                                                            dayLoop = 0
                                                        }else{
                                                            if(_cloneDeep(startDate).format('DD-MM-YYYY') < DateFormat(groupPaydate[i - 1].paydate).format('DD-MM-YYYY')){
                                                                startDateRentalDay = DateFormat(groupPaydate[i - 1].paydate)
                                                                dayLoop = CountDate(paydate, DateFormat(groupPaydate[i - 1].paydate), [])
                                                            }
                                                            ckStartDateRentalDay = (groupPaydate.length - 1) == i ? false : true
                                                        }
                                                    }
                                                }
                                                if (nRate.length > 1 && dayLoop > 0) {
                                                    if(setLastDateEnd.format('YYYY/MM/DD') >= element.endDate.format('YYYY/MM/DD')){
                                                        setLastDateEnd = element.endDate
                                                    }
                                                    if ((index + 1) === nRate.length) {
                                                        if(dayLoop + lastDay > day){
                                                            const x = (dayLoop + lastDay) - day
                                                            dayLoop = CountDate(_cloneDeep(endDateRentalDay).subtract(defaultPay.length ? 0 : 1, 'days'),_cloneDeep(endDateRentalDay).subtract(dayLoop - x, 'days') , [])
                                                        }else{
                                                            dayLoop = CountDate(endDateRentalDay.subtract(defaultPay.length ? 0 : 1, 'days'),startDateRentalDay, [true])
                                                            if(_cloneDeep(endDateRentalDay).subtract(defaultPay.length ? 0 : 1, 'days').format('DD-MM-YYYY') >= _cloneDeep(startDateRentalDay).add(1,'day').format('DD-MM-YYYY') && ckStartDateRentalDay){
                                                                dayLoop = CountDate(_cloneDeep(endDateRentalDay).subtract(defaultPay.length ? 0 : 1, 'days'),_cloneDeep(startDateRentalDay).add(1,'day') , [true])
                                                            }
                                                        }
                                                    } else {
                                                        if (Number(endDate.format('D')) < Number(paydate.format('D'))) {
                                                            dayLoop = CountDate(_cloneDeep(endDate), startDateRentalDay, [true])
                                                        }
                                                    }
                                                    if(dayLoop > 0 && defaultPay.length){
                                                        if(endDate.format('YYYY/MM/DD') == DateFormat(endDate).endOf('month').format('YYYY/MM/DD') && paydate.format('YYYY/MM/DD') == endDate.format('YYYY/MM/DD')){
                                                            const sumAmount = _sumBy(groupPaydate, function (o) { return Number(o.amount); })
                                                            const cal = Number(outstanding) - sumAmount
                                                            if(cal > 0){
                                                                dayLoop -= 1
                                                            }
                                                        }
            
                                                    }
                                                    param.rate = rateRes.value
                                                    param.day = dayLoop
                                                    if (param.day > 0) {
                                                        lastDateEnd = setLastDateEnd
                                                        listInvoice.push(groupData(param, formatToFixed))
                                                    }else{
                                                        day = lastDay
                                                    }
                                                }else{
                                                    param.rate = rateRes.value
                                                    param.day = dayLoop
                                                    if (param.day > 0) {
                                                        lastDateEnd = setLastDateEnd
                                                        listInvoice.push(groupData(param, formatToFixed))
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
                                                let newPaydate = CountDate(paydate, totalDataInvoice, defaultPay)
                                                let setLastDateEnd = totalDataInvoice
                                                if(newPaydate > 0){
                                                    if(defaultPay.length){
                                                        setLastDateEnd = paydate
                                                    }else{
                                                        setLastDateEnd = _cloneDeep(paydate).subtract(1,'day')
                                                    }
                                                }
                                                //new
                                                if (oldDate <= 0 && nRate.length === 1 && totalDataInvoice.format('YYYY/MM/DD') < startDate.format('YYYY/MM/DD') && paydate.format('YYYY/MM/DD') >= startDate.format('YYYY/MM/DD')) {
                                                    newPaydate = CountDate(paydate, startDate,  defaultPay)
                                                    if(defaultPay.length){
                                                        setLastDateEnd = paydate
                                                    }else{
                                                        setLastDateEnd = _cloneDeep(paydate).subtract(1,'day')
                                                    }
                                                }

                                                // if(Number(paydate.format('YYYYMMDD')) > Number(endDate.format('YYYYMMDD'))){
                                                //     if(Number(startDate.format('YYYYMMDD')) > Number(totalDataInvoice.format('YYYYMMDD'))){
                                                //         newPaydate = CountDate(endDate, startDate, [true])
                                                //     }else{
                                                //         newPaydate = CountDate(endDate, totalDataInvoice, [true])
                                                //     }
                                                //     setLastDateEnd = endDate
                                                // }
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
                                                            if( index == 0 && element.date <= totalDataInvoice && element.endDate >= totalDataInvoice){
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
                                                                    newPaydate = Number(element.endDate.format('D')) - oldDate - 1
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
                                                            newPaydate = CountDate(paydate, _cloneDeep(totalDataInvoice).add(1,'day'), defaultPay)
                                                        }
                                                    }
                                                }
                                                
                                                if (rateRes.type !== 9999 && totalDataInvoice.month() === DateFormat(date).month()) {

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
                                                    if (oldDate > 0) {
                                                        for (let i = 0; i < 2; i++) {
                                                            if (i === 0) {
                                                                param.rate = rateRes.oldValue
                                                                param.day = oldDate
                                                                // if(nRate.length > 1){
                                                                //     param.day = CountDate(_cloneDeep(paydate), startDate, [true])
                                                                // }
                                                            } else {

                                                                param.rate = rateRes.value
                                                                param.day = newPaydate
                                                            }
                                                            if (param.day > 0) {
                                                                  lastDateEnd = setLastDateEnd
                                                                listInvoice.push(groupData(param, formatToFixed))
                                                            }
                                                        }
                                                    } else {
                                                        param.rate = rateRes.value
                                                        param.day = newPaydate
                                                        if (param.day > 0) {
                                                              lastDateEnd = setLastDateEnd
                                                            listInvoice.push(groupData(param, formatToFixed))
                                                        }
                                                    }
                                                } else {

                                                    if (!_isUndefined(groupPaydate[i - 1]) && groupPaydate[i - 1].amount !== outstanding) {
                                                        let amount = 0
                                                        for (let iAmount = 0; iAmount <= (i - 1); iAmount++) {
                                                            amount += Number(groupPaydate[iAmount].amount)
                                                        }
                                                        param.outstanding = outstanding - amount
                                                        if(nRate.length > 1){
                                                            if(lastDay + dayLoop >= day){
                                                                const x = (dayLoop + lastDay) - day
                                                                dayLoop = dayLoop - x
                                                            }
                                                        }
                                                    }
                                                    param.rate = rateRes.value
                                                    // param.day = dateLoopCount > 0 ? dayLoop - dateLoopCount : dayLoop
                                                    param.day = dayLoop
                                                    if(nRate.length > 1){
                                                        param.day = dateLoopCount > 0 ? dayLoop - dateLoopCount : dayLoop
                                                    }
                                                    if(param.day > 0 && defaultPay.length){
                                                        if(endDate.format('YYYY/MM/DD') == DateFormat(endDate).endOf('month').format('YYYY/MM/DD') && paydate.format('YYYY/MM/DD') == endDate.format('YYYY/MM/DD')){
                                                            const sumAmount = _sumBy(groupPaydate, function (o) { return Number(o.amount); })
                                                            const cal = Number(outstanding) - sumAmount
                                                            if(cal > 0){
                                                                param.day -= 1
                                                            }
                                                        }
            
                                                    }
                                                    if (param.day > 0) {
                                                        lastDateEnd = setLastDateEnd
                                                        listInvoice.push(groupData(param, formatToFixed))
                                                    }
                                                }
                                            }
                                        }
                                        dayLoopDefault = day
                                        lastDay = day
                                        // lastDateEnd = endDate
                                    }
                                    dateLoopCount = dayLoop
                                }
                                const sumAmount = _sumBy(groupPaydate, function (o) { return Number(o.amount); })
                                const cal = Number(outstanding) - sumAmount
                                if (Number(outstanding).toFixed(2) !== sumAmount.toFixed(2) && cal > 20 && lastDate) { // คำนวนยอดที่จ่ายไม่เต็มจำนวน

                                    // console.log(`totalData`, totalData)
                                    const monthInvoic = DateFormat(invoiceDate)
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
                                    let dayRate = CountDate(endDate, monthInvoic, [true])

                                    if (interestCalDate) {
                                        const monthInterestCal = DateFormat(interestCalDate)
                                        const dayInterestCal = CountDate(endDate, monthInterestCal, [])
                                        if (dayInterestCal >= 0) {
                                            if (monthInterestCal.year() === startDate.year() && monthInterestCal.month() === startDate.month()) {
                                                if (addLastDate.unix() <= DateFormat(interestCalDate).unix()) {
                                                    day = CountDate(endDate, monthInterestCal, [true])
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
                                    param.outstanding = Number(outstanding) - sumAmount
                                    let checkRateRes = CountRate(dayRate - day, masterCondition, normalRate)
                                    let rateRes = CountRate(dayRate, masterCondition, normalRate)
                                    if(day > 0){
                                        for (let index = 0; index < nRate.length; index++) {
                                            const element = nRate[index];
                                            if(nRate.length > 1){
                                                if(addLastDate.format('DD-MM-YYYY') <= element.endDate.format('DD-MM-YYYY')){
                                                    rateRes = CountRate(dayRate, masterCondition, element.rate)
                                                    checkRateRes = CountRate(dayRate - day, masterCondition, element.rate)
                                                    if (rateRes.type === 'nomal') {
                                                        let dayNomal = CountDate(element.endDate, addLastDate, [true])
                                                        if(index > 0 && element.date.format('DD-MM-YYYY') > addLastDate.format('DD-MM-YYYY')){
                                                            dayNomal = CountDate(element.endDate, element.date, [true])
                                                        }
                                                        param.rate = rateRes.value
                                                        param.day = dayNomal
                                                        if (param.day > 0) {
                                                            listInvoice.push(groupData(param, formatToFixed))
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
                                                                param.rate = rateRes.value
                                                                param.day = oldDate
                                                                if (param.day > 0) {
                                                                    listInvoice.push(groupData(param, formatToFixed))
                                                                }
                                                            } else {
                                                                totalDate = _cloneDeep(DateFormat(invoiceDate)).add(359, 'days')
                                                                oldDate = CountDate(endDate, addLastDate, [true])
                                                                param.rate = rateRes.oldValue
                                                                param.day = oldDate
                                                                if (param.day > 0) {
                                                                    listInvoice.push(groupData(param, formatToFixed))
                                                                }
                                                            }
                                                        } else {
                                                            let totalDataInvoice = _cloneDeep(DateFormat(invoiceDate)).add(countDate, 'days')
                                                            if(totalDataInvoice.format('YYYY/MM/DD') > element.endDate.format('YYYY/MM/DD')){
                                                                totalDataInvoice =  element.endDate
                                                            }else if( Number(element.date.format('DDMMYYYY')) > Number(addLastDate.format('DDMMYYYY'))){
                                                                addLastDate = element.date
                                                            }
                                                            // let oldDate = CountDate(totalDataInvoice, startDate.add(dateLoopCount, 'days'), [])
                                                            let oldDate = CountDate(totalDataInvoice, addLastDate, [])
                                                            let newPaydate = CountDate(element.endDate, _cloneDeep(totalDataInvoice), [true])
                                                            if(index == 0){
                                                                if(totalDataInvoice.format('DD-MM-YYYY') >= element.endDate.format('DD-MM-YYYY')){
                                                                    oldDate = CountDate(element.endDate, addLastDate, [true])
                                                                    newPaydate = 0
                                                                }
                                                            }else if(index > 0 && addLastDate.format('DD-MM-YYYY') < element.date.format('DD-MM-YYYY') && totalDataInvoice.format('DD-MM-YYYY') <= element.date.format('DD-MM-YYYY')){
                                                                oldDate = CountDate(totalDataInvoice, element.date, [])
                                                                newPaydate = CountDate(element.endDate, element.date, [true])
                                                            
                                                            }else if(index > 0 && totalDataInvoice.format('DD-MM-YYYY') >= element.date.format('DD-MM-YYYY') && totalDataInvoice.format('DD-MM-YYYY') <= element.endDate.format('DD-MM-YYYY') && oldDate <= 0){
                                                                let startDate2 = element.date
                                                                let ay1 = [true]
                                                                let ay2 = []
                                                                if (startDate2.format("DD-MM-YYYY") < addLastDate.format('DD-MM-YYYY')) {
                                                                    startDate2 = addLastDate
                                                                    ay1 = []
                                                                    ay2 = [true]
                                                                }
                                                                oldDate = CountDate(totalDataInvoice, startDate2, ay1)
                                                                newPaydate = CountDate(element.endDate, totalDataInvoice, ay2)

                                                                if ((dayRate - lastDay) < (oldDate + newPaydate)) {
                                                                    oldDate = 0
                                                                    newPaydate = CountDate(element.endDate, addLastDate, [true])
                                                                }
                                                                if (oldDate <= 0 && newPaydate > 0) {
                                                                    if (addLastDate.format("DD-MM-YYYY") >= totalDataInvoice.format("DD-MM-YYYY")) {
                                                                        newPaydate = CountDate(element.endDate, addLastDate, [true])
                                                                    }
                                                                }
                    
                                                            }else{
                                                                if(oldDate < 0){
                                                                    newPaydate = CountDate(element.endDate, addLastDate, [true])
                                                                }
                                                            }
                                                            if (oldDate > 0) {
                                                                param.rate = rateRes.oldValue
                                                                param.day = oldDate
                                                                if (param.day > 0) {
                                                                    listInvoice.push(groupData(param, formatToFixed))
                                                                }
                                                                param.rate = rateRes.value
                                                                param.day = newPaydate
                                                                if (param.day > 0) {
                                                                    listInvoice.push(groupData(param, formatToFixed))
                                                                }
                                                            } else {
                                                                param.rate = rateRes.value
                                                                param.day = newPaydate
                                                                if (param.day > 0) {
                                                                    listInvoice.push(groupData(param, formatToFixed))
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
            
                                                if (isEqual(checkRateRes, rateRes) && isCheckDefault) {
                                                    param.rate = rateRes.value
                                                    param.day = day
                                                    if (param.day > 0) {
                                                        listInvoice.push(groupData(param, formatToFixed))
                                                    }
                                                } else if(isCheckDefault){
                                                    if (rateRes.type === 'nomal') {
                                                        param.rate = rateRes.value
                                                        param.day = day
                                                        if (param.day > 0) {
                                                            listInvoice.push(groupData(param, formatToFixed))
                                                        }
                                                    } else {
                                                        let countDate = rateRes.type - 30
            
                                                        if (rateRes.type === 9999) {
                                                            const countDay = dayRate - 360
                                                            let totalDate = _cloneDeep(DateFormat(invoiceDate)).add(dayRate, 'days')
                                                            let oldDate = CountDate(totalDate, startDate, [])
                                                            if (countDay >= startDate.daysInMonth()) {
                                                                param.rate = rateRes.value
                                                                param.day = oldDate
                                                                if (param.day > 0) {
                                                                    listInvoice.push(groupData(param, formatToFixed))
                                                                }
                                                            } else {
                                                                totalDate = _cloneDeep(DateFormat(invoiceDate)).add(359, 'days')
                                                                oldDate = CountDate(endDate, addLastDate, [true])
                                                                param.rate = rateRes.oldValue
                                                                param.day = oldDate
                                                                if (param.day > 0) {
                                                                    listInvoice.push(groupData(param, formatToFixed))
                                                                }
                                                            }
                                                        } else {
                                                            const totalDataInvoice = monthInvoic.add(countDate, 'days')
            
                                                            // let oldDate = CountDate(totalDataInvoice, startDate.add(dateLoopCount, 'days'), [])
                                                            let oldDate = CountDate(totalDataInvoice, addLastDate, [])
                                                            let newPaydate = CountDate(endDate, totalDataInvoice.subtract(1, 'days'), [])
            
                                                            if (oldDate > 0) {
                                                                param.rate = rateRes.oldValue
                                                                param.day = oldDate
                                                                if (param.day > 0) {
                                                                    listInvoice.push(groupData(param, formatToFixed))
                                                                }
                                                                param.rate = rateRes.value
                                                                param.day = newPaydate
                                                                if (param.day > 0) {
                                                                    listInvoice.push(groupData(param, formatToFixed))
                                                                }
                                                            } else {
                                                                param.rate = rateRes.value
                                                                param.day = newPaydate
                                                                if (param.day > 0) {
                                                                    listInvoice.push(groupData(param, formatToFixed))
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
                                        const element         = defaultPay[0];
                                        let   payDate1        = element.default_pay_date || endDate
                                        let   defaultPayDate1 = DateFormat(payDate1)
                                        if (endDate.format('YYYYMM') === defaultPayDate1.format('YYYYMM')) {
                                            param.outstanding = outstanding
                                        }
                                    }
                                }
                                for (let index = 0; index < defaultPay.length; index++) {
                                    const element        = defaultPay[index];
                                    let   payDate        = element.default_pay_date || endDate
                                    let   defaultPayDate = DateFormat(payDate)

                                    if(nRate.length > 1){
                                        startDate = nRate[0].date
                                    }

                                    if (startDate.format('YYYYMM') !== defaultPayDate.format('YYYYMM')) {
                                        defaultPayDate = DateFormat(endDate)
                                    }
                                    const dueDate    = DateFormat(element.default_due_date).add(1, 'days')
                                    let   newDueDate = CountDate(defaultPayDate, DateFormat(dueDate), defaultPay)

                                   

                                    if (startDate.year() !== dueDate.year() || dueDate.month() !== startDate.month()) {
                                        if(startDate.format('YYYYMMDD') <= defaultPayDate.format('YYYYMMDD')){ // เพิ่มใหม่
                                            newDueDate = CountDate(defaultPayDate, _cloneDeep(defaultPayDate).startOf('month'), defaultPay)
                                        }else{
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
                                        }
                                        if (groupPaydate.length) { // เช็คการจ่ายก่อนวันที่คำนวน
                                            let checkPayment = param.outstanding
                                            for (const iterator of groupPaydate) {
                                                if(monthInterestCalLoop.format('YYYYMM') === DateFormat(iterator.paydate).format('YYYYMM') && Number(DateFormat(iterator.paydate).format('DD')) <  Number(monthInterestCalLoop.format('DD'))){
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
                                        const checkPay  = _filter(groupPaydate, o => DateFormat(o.paydate).unix() >= dueDate.unix())
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
                                    // if (element.default_default === "AGING") {
                                    //     param.outstanding = element.default_installment
                                    // }
                                    if(element.default_installment){
                                        param.outstanding = element.default_installment
                                    }
                                    param.rate = defaultRate
                                    param.day  = newDueDate

                                    if (param.day > 0 && dayInterestCal >= 0) {
                                        if(calculateByFranchise){
                                            listInvoice.push(groupData(param, formatToFixed))
                                        }
                                    }

                                }

                            }

                            if ((!paymentPay && !defaultPay.length) || (defaultPay.length && !paymentPay)) {
                                param.outstanding = outstanding
                                let dayDefault = 0
                                for (let index = 0; index < nRate.length; index++) {
                                    const element   = nRate[index];
                                          startDate = _cloneDeep(element.date)
                                          endDate   = _cloneDeep(element.endDate)
                                    const day       = CountDate(endDate, DateFormat(invoiceDate), [true])
                                    let   totalData = CountDate(endDate, startDate, [true])
                                    if (DateFormat(invoiceDate).year() === startDate.year() && DateFormat(invoiceDate).month() === startDate.month()) {
                                        if (Number(element.date.format('D')) > Number(DateFormat(invoiceDate).format('D'))) {
                                            totalData = CountDate(endDate, startDate, [true])
                                        } else {
                                            totalData = CountDate(endDate, DateFormat(invoiceDate), [true])
                                        }
                                    }

                                    if (interestCalDate) {
                                        const monthInterestCalLoop = DateFormat(interestCalDate)
                                        const dayInterestCal = CountDate(endDate, monthInterestCalLoop, [])
                                        if (dayInterestCal >= 0) {
                                            if (monthInterestCalLoop.year() === startDate.year() && monthInterestCalLoop.month() === startDate.month()) {
                                                if (Number(element.date.format('D')) > Number(monthInterestCalLoop.format('D'))) {
                                                    totalData = CountDate(endDate, startDate, [true])
                                                } else {
                                                    totalData = CountDate(endDate, monthInterestCalLoop, [true])
                                                }
                                            } else {
                                                totalData = CountDate(endDate, startDate, [true])
                                            }
                                        } else {
                                            totalData = 0
                                        }
                                    }

                                    if (totalData > 0) {
                                        const rateRes = CountRate(day, masterCondition, element.rate)

                                        if (rateRes.type === 'nomal') {
                                            param.rate = rateRes.value
                                            param.day = totalData
                                            if (param.day > 0) {
                                                listInvoice.push(groupData(param, formatToFixed))
                                            }
                                        } else {
                                            let countDate = rateRes.type - 30
                                            if (rateRes.type === 9999) {
                                                const countDay = day - 360
                                                let totalDate = DateFormat(invoiceDate).add(day, 'days')
                                                let oldDate = CountDate(totalDate, startDate, [])
                                                if (countDay >= startDate.daysInMonth()) {
                                                    param.rate = rateRes.value
                                                    param.day = oldDate
                                                    if (param.day > 0) {
                                                        listInvoice.push(groupData(param, formatToFixed))
                                                    }
                                                } else {
                                                    totalDate = DateFormat(invoiceDate).add(359, 'days')
                                                    if(Number(startDate.format('MM')) != Number(totalDate.format('MM'))){
                                                        param.rate = rateRes.value
                                                        param.day = oldDate
                                                        if (param.day > 0) {
                                                            item.push(groupData(param, formatToFixed))
                                                        }
                                                    }else{
                                                        oldDate = CountDate(totalDate, startDate, [true])
                                                        let newPaydate = CountDate(endDate, totalDate, [])
                                                        if(totalDate.format('DD/MM/YYYY') < startDate.format('DD/MM/YYYY')){
                                                            newPaydate = CountDate(endDate, startDate, [true])
                                                        }
                                                        param.rate = rateRes.oldValue
                                                        param.day = oldDate
                                                        if (param.day > 0) {
                                                            listInvoice.push(groupData(param, formatToFixed))
                                                        }
                                                        param.rate = rateRes.value
                                                        param.day = newPaydate
                                                        if (param.day > 0) {
                                                            listInvoice.push(groupData(param, formatToFixed))
                                                        }
                                                    }
                                                }
                                            } else {

                                                const totalDate = DateFormat(invoiceDate).add(countDate, 'days')
                                                const oldDate = CountDate(totalDate, startDate, defaultPay.length ? [true]:[])
                                                let newTotalDate = CountDate(endDate, DateFormat(totalDate), [true])
                                                if(totalDate.format('MM') !== startDate.format("MM")){
                                                    newTotalDate = CountDate(endDate, DateFormat(startDate), [true])
                                                }
                                                if (oldDate > 0) {
                                                    param.rate = rateRes.oldValue
                                                    param.day = (oldDate - (defaultPay.length ? 1 : 0))

                                                    if (param.day > 0) {

                                                        listInvoice.push(groupData(param, formatToFixed))
                                                    }
                                                    param.rate = rateRes.value
                                                    param.day = newTotalDate

                                                    if (param.day > 0) {
                                                        listInvoice.push(groupData(param, formatToFixed))
                                                    }
                                                } else {
                                                    let  rentalDaySum = newTotalDate
                                                    if(dayDefault != 0 && (day-dayDefault) === (newTotalDate + oldDate)){
                                                        rentalDaySum = newTotalDate + oldDate
                                                    }
                                                    param.rate = rateRes.value
                                                    param.day = rentalDaySum
                                                    if (param.day > 0) {
                                                        listInvoice.push(groupData(param, formatToFixed))
                                                    }
                                                }

                                                // for (let i = 0; i < 2; i++) {
                                                //     if (i === 0) {
                                                //         param.rate = rateRes.oldValue
                                                //         param.day = oldDate
                                                //     } else {
                                                //         param.rate = rateRes.value
                                                //         param.day = newTotalDate
                                                //     }
                                                //     if (param.day > 0) {
                                                //         listInvoice.push(groupData(param))
                                                //     }
                                                // }
                                            }
                                        }
                                    }
                                    dayDefault = day
                                }
                            }
                        })
                        if (listInvoice.length === 0) {
                            delete item[dealer_code]
                        } else {
                            item[dealer_code].listInvoice = listInvoice
                        }
                    }
                }
            })
            item = _sortBy(item, ['dealer_condition_dealer_code'])

            setDataRender(item)
        }
    }, [invoiceData])

    const checkAll = (e) => {
        const form = e.target
        const checkDealer = document.getElementsByName('checkDealer')

        for (let index = 0; index < checkDealer.length; index++) {
            const element = checkDealer[index];
            element.checked = form.checked
        }
    }
    
    const renderBody = () => {
        let renderItem = []

        if (Object.keys(dataRender).length) {
            Object.keys(dataRender).map((res, index) => {
                const item = dataRender[res]
                let preVat = _sumBy(item.listInvoice, e => formatNumber(e.preVat,2))
                let vat = _sumBy(item.listInvoice, e => (e.vat))
                let withHolding = _sumBy(item.listInvoice, e => formatNumber(e.withHolding,2))
                let totalAdj = (preVat + Number(item.adjustment1))
                if (item.adjustment1) {
                    if (item.dealer_condition_loan_type === "INVENTORY") {
                        vat = ((totalAdj * Number(item.defaultVat)) / 100)
                    }
                    withHolding = ((totalAdj * Number(item.defaultWithHolding)) / 100)
                }
                let total = ((totalAdj + vat) - withHolding)
                if (item.adjustment2) {
                    total = total + Number(item.adjustment2)
                }
                renderItem.push(
                    <tr key={index}>
                        <td className="text-center">
                            <Form.Check type='checkbox' name="checkDealer" className="checkbook-custom" value={item.dealer_condition_dealer_code} />
                        </td>
                        <td>{item.dealer_condition_dealer_code}</td>
                        <td>{item.dealer_condition_dealer_name}</td>
                        <td>
                            <Button type="button" variant="link" onClick={() => setShowInvoice(res)}>
                                {item.invoiceNumber}
                            </Button>
                        </td>
                        <td>{formatAmount(preVat)}</td>
                        <td>
                            <Form.Control type="text" className="mb-2" value={item.adjustment1} onChange={(e) =>
                                setDataRender(oldValue => {
                                    return {
                                        ...oldValue,
                                        [res]: {
                                            ...oldValue[res],
                                            adjustment1: e.target.value
                                        }
                                    }
                                })}
                                placeholder="Adjustment 1" />
                            <Form.Control type="text" value={item.adjustment2} onChange={(e) =>
                                setDataRender(oldValue => {
                                    return {
                                        ...oldValue,
                                        [res]: {
                                            ...oldValue[res],
                                            adjustment2: e.target.value
                                        }
                                    }
                                })}
                                placeholder="Adjustment 2" />
                        </td>
                        <td>{formatAmount(total)}</td>
                    </tr>
                )
            })
        }
        return renderItem
    }


    return (
        <>

            {

                !_isUndefined(invoiceData) && !pendingSearch &&
                <Card className="my-3">

                    <Card.Header className="d-flex justify-content-between">
                        <Col>
                            <h3>Invoice by dealer</h3>
                        </Col>
                        <Col className="text-right">
                            <MyDocument dataRender={dataRender} dateShow={dateShow} dueDateShow={dueDateShow} reportStatementData={reportStatementData} />
                        </Col>
                    </Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            {
                                _isNull(showInvoice) ?

                                    <Table striped bordered hover>
                                        <thead className="text-center">
                                            <tr>
                                                <th>
                                                    <Form.Check type='checkbox' className="checkbook-custom" onClick={(e) => checkAll(e)} value={'all'} />
                                                </th>
                                                <th>Dealer Code</th>
                                                <th>Dealer Name</th>
                                                <th>Invoice Number</th>
                                                <th>ค่าเช่าประจำเดือน</th>
                                                <th>Adj.Amount</th>
                                                <th>Grand Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                renderBody()
                                            }
                                        </tbody>
                                    </Table>

                                    :
                                    <>
                                        <Col>
                                            <Row className="justify-content-end ">
                                                <Button variant='danger' onClick={() => setShowInvoice(null)}>Close</Button>
                                            </Row>
                                        </Col>
                                        <ShowInvoice data={dataRender[showInvoice]} reportStatementData={reportStatementData} onTextCustom={(e) =>
                                            setDataRender(oldValue => {
                                                return {
                                                    ...oldValue,
                                                    [showInvoice]: {
                                                        ...oldValue[showInvoice],
                                                        textCustom: e
                                                    }
                                                }
                                            })
                                        } />
                                    </>
                            }
                        </ListGroup.Item>
                    </ListGroup>

                </Card>
            }
           

        </>
    )
}

const mapStateToProps = (state) => {
    const {
        condition: {
            dealerCondition,
            invoiceAll,
            masterInterest,
            loanType,
            dueDate: dueDateShow,
            date: dateShow,
            reportStatement
        }
    } = state
    return {
        dealerCondition,
        invoiceAll,
        masterInterest,
        loanType,
        dueDateShow,
        dateShow,
        reportStatement
    }
}

const mapDispatchToProps = {
    notification: Ui.notification
}

export default connect(mapStateToProps, mapDispatchToProps)(Invoice)
