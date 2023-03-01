import React from 'react'
import { connect } from 'react-redux'
import isEqual from 'react-fast-compare'
import { numberWithSeparators, formatAmount, CountRate, DateFormat, formatNumber } from '../../utils/helpers'

import _isUndefined from 'lodash/isUndefined'
import _find from 'lodash/find'
import _sortBy from 'lodash/sortBy'
import _findIndex from 'lodash/findIndex'
import _sumBy from 'lodash/sumBy'
import _filter from 'lodash/filter'
import _isNull from 'lodash/isNull'
import _reverse from 'lodash/reverse'
import _cloneDeep from 'lodash/cloneDeep'
import _ from 'lodash'

let INDEX_NO              = 0
let SUM_TOTAL_AMOUNT      = 0
let SUM_TOTAL_CHARGES     = 0
let SUM_TOTAL_VAT         = 0
let SUM_TOTAL_PREVAT      = 0
let SUM_TOTAL_WITHHOLDING = 0



const RenderDataList = (index, min, outstanding, rate, day, total, vat, preVat, withHolding, loanType, defaultWithHolding, defaultVat) => {

    let newPreVat = preVat
    let newVat = vat
    let newWithHolding = withHolding
    let newTotal = total
    if (!loanType) {
        newPreVat = total
        newVat = (total * Number(defaultVat)) / 100
        newWithHolding = (total * Number(defaultWithHolding)) / 100
        newTotal = newPreVat + newVat
    }
    INDEX_NO += 1
    SUM_TOTAL_PREVAT += formatNumber(newPreVat)
    SUM_TOTAL_AMOUNT += formatNumber(outstanding)
    SUM_TOTAL_CHARGES += formatNumber(newTotal)
    SUM_TOTAL_VAT += formatNumber(newVat)
    SUM_TOTAL_WITHHOLDING = formatNumber((SUM_TOTAL_PREVAT * Number(defaultWithHolding)) / 100)
    if (!loanType) {
        SUM_TOTAL_VAT = formatNumber((SUM_TOTAL_PREVAT * Number(defaultVat)) / 100)
        SUM_TOTAL_WITHHOLDING = formatNumber((SUM_TOTAL_PREVAT * Number(defaultWithHolding)) / 100)
    }
    return (
        <tr key={INDEX_NO}>
            <td>{INDEX_NO}</td>
            <td>{min}</td>
            <td>{formatAmount(outstanding)}</td>
            <td>{formatAmount(rate)}</td>
            <td>{day}</td>
            <td>{formatAmount(newPreVat)}</td>
            <td>{formatAmount(newVat)}</td>
            <td>{formatAmount(newWithHolding)}</td>
            <td>{formatAmount(newTotal)}</td>
        </tr>
    )
}
const NoDataRender = () => {
    return (
        <tr>
            <td colSpan="9">
                <h5 className="text-center">No Data</h5>
            </td>
        </tr>
    )
}
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
export const OutStanding = (props) => {
    const {
        dealerCondition: { data: dealerData },
        reportByDealer : { data: reportData },
        masterInterest : { data: mor_mlr },
        loanType       : { data: loanTypeData }
    } = props


    const groupData = (data) => {
        let {
            outstanding,
            rate,
            day,
            loanType,
            defaultWithHolding,
            defaultVat,
            numNo,
            midno
        } = data

        const total = TotalCharges(outstanding, rate, day)
        const preVat = TotalPreVat(total, loanType)
        const vat = loanType ? 0.00 : TotalVat(total, preVat)
        const withHolding = TotalWithHolding(preVat, defaultWithHolding)

        return RenderDataList(
            numNo,
            midno,
            outstanding,
            rate,
            day,
            total,
            vat,
            preVat,
            withHolding,
            loanType,
            defaultWithHolding,
            defaultVat
        )
    }

    const renderItem = () => {
        const {
            out_standing,
            default_file,
            master_condition,
            payment,
            date
        } = reportData

        if (_isUndefined(out_standing) || !out_standing) {
            return NoDataRender()
        }
        let   item                  = []
        let   numNo                 = 1
              INDEX_NO              = 0
              SUM_TOTAL_AMOUNT      = 0
              SUM_TOTAL_CHARGES     = 0
              SUM_TOTAL_VAT         = 0
              SUM_TOTAL_PREVAT      = 0
              SUM_TOTAL_WITHHOLDING = 0
        const dealer                = _find(dealerData, (e) => e.dealer_condition_dealer_code === out_standing[0].out_standing_dealer_code)

        if (_isUndefined(dealer)) {
            return NoDataRender()
        }
        const masterCondition = _find(master_condition, (e) => e.type === Number(dealer.dealer_condition_type_curtailment))
        const findNormalRate  = _find(mor_mlr, (e) => e.master_interest_type === dealer.dealer_condition_nor_rate_type.toLocaleLowerCase())
        let   nRate           = []
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
                nRate.push({
                    rate: Number(rate) + Number(dealer.dealer_condition_nor_rate),
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

        let normalRate = Number(findNormalRate.master_interest_start_rate) + Number(dealer.dealer_condition_nor_rate)

        const loan               = _find(loanTypeData, (e) => e.loan_type_by === 'loan')
        const inventory          = _find(loanTypeData, (e) => e.loan_type_by === 'inventory')
        const loanType           = dealer.dealer_condition_loan_type === "INVENTORY" ? false : true
        const defaultWithHolding = loanType ? loan.loan_type_tax : inventory.loan_type_tax
        const defaultVat         = loanType ? loan.loan_type_vat : inventory.loan_type_vat

        out_standing.map((res, index) => {
            const midno           = res.out_standing_midno
            const outstanding     = res.out_standing_outstanding
            const invoiceDate     = res.out_standing_invoice_date
            const interestCalDate = res.out_standing_interest_cal_date
            const defaultPay      = default_file.length && _filter(default_file, (e) => e.default_mid === res.out_standing_midno) || ''
            const paymentPay      = payment.length && _find(payment, (e) => e.payment_mid === res.out_standing_midno) || ''
            const franchise       = res.out_standing_franchise

            let param = {
                outstanding,
                rate: 1,
                day: 1,
                loanType,
                defaultWithHolding,
                defaultVat,
                numNo,
                midno
            }
            if (midno !== '') { // check id bug 024598
                // console.log('midno', midno,defaultPay,paymentPay)
                let startDate = DateFormat(date).startOf('month')
                // startDate = DateFormat('2021-07-11')
                let endDate = DateFormat(date).endOf('month')
                // const endDate = DateFormat('2021-07-20')
                const defaultMonth = DateFormat(date).month()

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
                                startDate = _cloneDeep(monthInvoicLoop)
                            }
                        
                            let paydate = DateFormat(groupPaydate[i].paydate)
                            let day = 0
                            // if(lastDateEnd){
                            //     console.log('lastDateEnd', lastDateEnd.format('YYYY/MM/DD'))
                            // }
                            
                            if(index != 0 && i > 0 && paydate.format('YYYY/MM/DD') >= startDate.format('YYYY/MM/DD')){
                                startDate = DateFormat(groupPaydate[i-1].paydate)
                               
                                if(lastDateEnd){
                              
                                    const lastDateEndCK = _cloneDeep(lastDateEnd).add(1,'day')
                                    // console.log('lastDateEnd2', startDate.format('YYYY-MM-DD') ,lastDateEndCK.format('YYYY-MM-DD'),'endDate',endDate.format('YYYY-MM-DD'))
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
                                // endDate = paydate
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
                                                dayLoop   = CountDate(endDate, monthInterestCalLoop, [])
                                                startDate = monthInterestCalLoop
                                            }
                                        }
                                    } else {
                                        if (Number(endDate.format('D')) > Number(paydate.format('D'))) {
                                            dayLoop = CountDate(paydate, startDate, [])
                                            // endDate = paydate
                                        } else {
                                            // dayLoop = day
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
                                       
                                    } else {
                                        // dayLoop = day
                                        dayLoop = CountDate(paydate, monthInvoicLoop, [])
                                    }
                                    // console.log('dayLoop', monthInvoicLoop.format('DD-MM-YYYY'),CountDate(paydate, monthInvoicLoop, []))
                                } else {
                                    if (Number(endDate.format('D')) > Number(paydate.format('D'))) {
                                        dayLoop = CountDate(paydate, startDate, [])
                                        if(Number(startDate.format('D')) === Number(paydate.format('D'))){
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
            
                            // console.log('rateRes',dayLoop, dayLoop + lastDay,day)
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
                            
                            // console.log('rateRes2',dayLoop, dayLoop + lastDay,day)
                            if (paydate.format('YYYY-MM-DD') === startDate.format('YYYY-MM-DD') && dayLoop === 0) {
                                if ((paydate.format('DD') !== '01' && paydate.format('DD') !== startDate.format('DD')) || defaultPay.length) {
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
                                    let ckStartDateRentalDay = false
                                    // console.log('endDateRentalDay', endDateRentalDay.format('DD-MM-YYYY'),endDate.format('DD-MM-YYYY'))
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
                                                startDateRentalDay = monthInterestCalLoop
                                            }else{
                                                dayLoop = CountDate(paydate, oldDateNomal, [])
                                                startDateRentalDay = oldDateNomal
                                            }
                                        }else{
                                            const checkStartDate = DateFormat(_cloneDeep(groupPaydate[i - 1].paydate)).add(defaultPay.length > 0 ? 1 : 0, 'days')
                                            if(checkStartDate.format('DD-MM-YYYY') > endDate.format('DD-MM-YYYY')){
                                                dayLoop = 0
                                               
                                            }else{
                                                // console.log('_cloneDeep(startDate).format', _cloneDeep(startDate).format('DD-MM-YYYY') , DateFormat(groupPaydate[i - 1].paydate).format('DD-MM-YYYY'))
                                                if(_cloneDeep(startDate).format('DD-MM-YYYY') < DateFormat(groupPaydate[i - 1].paydate).format('DD-MM-YYYY')){
                                                    startDateRentalDay = DateFormat(groupPaydate[i - 1].paydate)
                                                    dayLoop = CountDate(paydate, DateFormat(groupPaydate[i - 1].paydate), [])
                                                }
                                                // console.log('dayLoop = CountDate(paydate, DateFormat(groupPaydate[i - 1].paydate), [])', CountDate(paydate, DateFormat(groupPaydate[i - 1].paydate), []))
                                                ckStartDateRentalDay = (groupPaydate.length - 1) == i ? false : true
                                            }
                                        }
                                        
                                    }
                                    

                                    if (nRate.length > 1 && dayLoop > 0) {

                                        if(setLastDateEnd.format('YYYY/MM/DD') >= element.endDate.format('YYYY/MM/DD')){
                                            setLastDateEnd = element.endDate
                                        }
                                        // console.log('setLastDateEnd', setLastDateEnd.format('YYYY/MM/DD'),'startDate',startDate.format('YYYY/MM/DD'))
                                        // let newPaydate = CountDate(setLastDateEnd, startDate, [true])
                                        // let newPaydate = CountDate(paydate, setLastDateEnd, defaultPay)

                                       
                                        // console.log('newPaydate', newPaydate)
                                        if ((index + 1) === nRate.length ) {
                                            // console.log('dayLoop', dayLoop,_cloneDeep(endDateRentalDay).format('DD-MM-YYYY'))
                                            if(dayLoop + lastDay > day){
                                                const x = (dayLoop + lastDay) - day
                                                dayLoop = CountDate(_cloneDeep(endDateRentalDay).subtract(defaultPay.length ? 0 : 1, 'days'),_cloneDeep(endDateRentalDay).subtract(dayLoop - x, 'days') , [])
                                            }else{

                                                dayLoop = CountDate(_cloneDeep(endDateRentalDay).subtract(defaultPay.length ? 0 : 1, 'days'),startDateRentalDay , [true])
                                            
                                                const ckStartDay = _cloneDeep(startDateRentalDay)
                                                if(_cloneDeep(endDateRentalDay).subtract(defaultPay.length ? 0 : 1, 'days').format('DD-MM-YYYY') >= _cloneDeep(ckStartDay).add(1,'day').format('DD-MM-YYYY') && ckStartDateRentalDay){
                                                
                                                    dayLoop = CountDate(_cloneDeep(endDateRentalDay).subtract(defaultPay.length ? 0 : 1, 'days'),_cloneDeep(ckStartDay).add(1,'day') , [true])
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
                                            item.push(groupData(param))
                                        }else{
                                            day = lastDay
                                        }
                                    }else{
                                        param.rate = rateRes.value
                                        param.day = dayLoop

                                        if (param.day > 0) {
                                            lastDateEnd = setLastDateEnd
                                            item.push(groupData(param))
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

                                    let totalDataInvoice =_cloneDeep(monthInvoicLoop).add(countDate, 'days')
                                    // console.log('totalDataInvoice', totalDataInvoice.format('YYYY/MM/DD'))
                                    if (interestCalDate) {
                                        if (totalDataInvoice.unix() <= DateFormat(interestCalDate).unix()) {
                                            totalDataInvoice = DateFormat(interestCalDate)
                                        }
                                    }
                                    if(index != 0 && i > 0 && totalDataInvoice.format('YYYY/MM/DD') < startDate.format('YYYY/MM/DD')){
                                        totalDataInvoice = startDate
                                    }
                                    
                                    let oldDate = CountDate(totalDataInvoice, startDate, [])
                                    let newPaydate = CountDate(paydate, totalDataInvoice, defaultPay)
                                    let setLastDateEnd = totalDataInvoice
                                    
                                    // console.log('startDate',startDate.format('YYYY/MM/DD'),'endDate', endDate.format('YYYY/MM/DD'),'paydate',paydate.format('YYYY/MM/DD'),'totalDataInvoice',totalDataInvoice.format('YYYY/MM/DD'))
                             
                                    if(newPaydate > 0){
                                        if(defaultPay.length){
                                            setLastDateEnd = paydate
                                        }else{
                                            setLastDateEnd = _cloneDeep(paydate).subtract(1,'day')
                                        }
                                    }
                                    if(paydate.format('YYYY/MM/DD') > endDate.format('YYYY/MM/DD')){
                                        newPaydate = CountDate(endDate, totalDataInvoice, [true])
                                        setLastDateEnd = endDate
                                    }
                                    if (oldDate <= 0 && nRate.length === 1 && totalDataInvoice.format('YYYY/MM/DD') < startDate.format('YYYY/MM/DD') && paydate.format('YYYY/MM/DD') >= startDate.format('YYYY/MM/DD')) {
                                        newPaydate = CountDate(paydate, startDate,  defaultPay)
                                        if(defaultPay.length){
                                            setLastDateEnd = paydate
                                        }else{
                                            setLastDateEnd = _cloneDeep(paydate).subtract(1,'day')
                                        }
                                    }
                                    // console.log('oldDate',oldDate,'newPaydate', newPaydate,'dateLoopCount',dateLoopCount)
                                    if (dateLoopCount !== 0 && dateLoopCount > 0) {
                                        const dayTotalCal = dayLoop - dateLoopCount
                                        if (dayTotalCal > 0) {
                                            oldDate = CountDate(totalDataInvoice, DateFormat(groupPaydate[i - 1].paydate), [])
                                            if (nRate.length > 1) {
                                                if (index > 0) {
                                                    oldDate = CountDate(totalDataInvoice, _cloneDeep(DateFormat(groupPaydate[i - 1].paydate)).add(1, 'day'), [])
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
                              
                                            if(index > 0 && groupPaydate.length > 1 && index != (nRate.length - 1)){
                                                oldDate = CountDate(totalDataInvoice, _cloneDeep(DateFormat(groupPaydate[i - 1].paydate)).add(1,'day'), [])
                                            }
                                        }
                                    }else if (dateLoopCount === 0) {
                                        if (oldDate > 0 && nRate.length === 1) {

                                            if (!listTypeDay.includes(countDate) && Number(totalDataInvoice.format('D')) !== Number(paydate.format('D'))) {
                                                oldDate = Number(totalDataInvoice.format('D'))
                                                newPaydate = Number(paydate.format('D')) - oldDate - 1
                                                if (defaultPay.length) {
                                                    newPaydate = Number(paydate.format('D')) - oldDate
                                                }
                                            }else if(listTypeDay.includes(countDate) && oldDate != (Number(totalDataInvoice.format('D')) - Number(startDate.format('D')) + 1)){
                                                oldDate = Number(totalDataInvoice.format('D'))
                                                newPaydate = Number(paydate.format('D')) - oldDate - 1
                                                if (defaultPay.length) {
                                                    newPaydate = Number(paydate.format('D')) - oldDate
                                                }
                                            }
                                            
                                        }else if(nRate.length > 1){
                                           
                                            const d = defaultPay.length ? 1 : 0
             
                                            if(listTypeDay.includes(countDate) && oldDate >= 0 && oldDate != (Number(totalDataInvoice.format('D')) - Number(startDate.format('D')) + d)){
                                                // console.log('element.date', element.date.format('YYYY/MM/DD'),'totalDataInvoice',totalDataInvoice.format('YYYY/MM/DD'),'element.endDate',element.endDate.format('YYYY/MM/DD'))
                                                if(index == 0 && element.date <= totalDataInvoice && element.endDate >= totalDataInvoice){
                                                    console.log('1')
                                                    oldDate = Number(totalDataInvoice.format('D'))
                                                    let ckCountAllEnd = CountDate(totalDataInvoice, monthInvoicLoop, [true])
                                                    // if(totalDataInvoice.format('YYYY/MM/DD') == DateFormat(totalDataInvoice).startOf('month').format('YYYY/MM/DD')){
                                                    //     ckCountAllEnd = CountDate(totalDataInvoice, monthInvoicLoop, [true])
                                                    // }
                                                    if(ckCountAllEnd < day){
                                                        oldDate = (day - ckCountAllEnd) + 1
                                                    }else if(ckCountAllEnd === day && (day - dayLoopDefault) > 0){
                                                        const countRang = countDate - dayLoopDefault
                                                        oldDate = countRang
                                                    }
                                              
                                                    if(element.date <= paydate && element.endDate >= paydate){
                                                        newPaydate = (Number(paydate.format('D')) - oldDate) - 1
                                                        if(ckCountAllEnd < day){
                                                            newPaydate = (Number(paydate.format('D')) - oldDate) - 2
                                                        }else if(ckCountAllEnd === day && (day - dayLoopDefault) > 0){
                                                            const countRang = countDate - dayLoopDefault
                                                            newPaydate = (day - dayLoopDefault) - countRang
                                                        }
                                                    }else{
                                                        newPaydate = (Number(element.endDate.format('D')) - oldDate)
                                                       
                                                    }
                                                  
                                                }
                                            }else if(listTypeDay.includes(countDate) && oldDate < 0){
                                                if(element.date <= startDate && element.endDate >= startDate){
                                                    console.log('2')
                                                    newPaydate = CountDate(paydate, startDate, defaultPay)
                                                }
                                            }else if(index > 0 && listTypeDay.includes(countDate) && index != (nRate.length - 1) && startDate.format('YYYY/MM/DD') != totalDataInvoice.format('YYYY/MM/DD') && totalDataInvoice.format('YYYY/MM/DD') > paydate.format('YYYY/MM/DD')){

                                                oldDate = CountDate(totalDataInvoice, startDate, [true])
                                                newPaydate = CountDate(paydate, _cloneDeep(totalDataInvoice).add(1,'day'), defaultPay)
                                                console.log('3')
                                            }
                                        }
                                    }
                                    
                                    // console.log('oldDate', oldDate,'newPaydate',newPaydate,'day',day)
                               
                                    if (rateRes.type !== 9999 && totalDataInvoice.month() === DateFormat(date).month()) {
                                        console.log('if')
                                        if (!_isUndefined(groupPaydate[i - 1]) && groupPaydate[i - 1].amount !== outstanding) {
                                            let amount = 0
                                            for (let iAmount = 0; iAmount <= (i - 1); iAmount++) {
                                                amount += Number(groupPaydate[iAmount].amount)
                                            }
                                            param.outstanding = outstanding - amount
                          
                                        }
                                        // console.log('oldDate2', oldDate,'newPaydate2',newPaydate)
                                        if(newPaydate > 0 && defaultPay.length){
                                            if(endDate.format('YYYY/MM/DD') == DateFormat(endDate).endOf('month').format('YYYY/MM/DD') && paydate.format('YYYY/MM/DD') == endDate.format('YYYY/MM/DD')){
                                                const sumAmount = _sumBy(groupPaydate, function (o) { return Number(o.amount); })
                                                const cal = Number(outstanding) - sumAmount
                                                if(cal > 0){
                                                    newPaydate -= 1
                                                }
                                            }

                                        }
                                        // console.log('oldDate', oldDate,newPaydate)
                                        if (oldDate > 0) {
                                            for (let i = 0; i < 2; i++) {
                                                if (i === 0) {
                                                    param.rate = rateRes.oldValue
                                                    param.day = oldDate
                                                } else {
                                                    param.rate = rateRes.value
                                                    param.day = newPaydate
                                                }
                                                // console.log('param.day', param.day)
                                                if (param.day > 0) {
                                                    console.log('setLastDateEnd', setLastDateEnd.format('YYYY/MM/DD'))
                                                    lastDateEnd = setLastDateEnd
                                                    item.push(groupData(param))
                                                }
                                            }
                                        } else {
                                            param.rate = rateRes.value
                                            param.day = newPaydate
                                            if (param.day > 0) {
                                                lastDateEnd = setLastDateEnd
                                              
                                                item.push(groupData(param))
                                            }
                                        }
                                    } else {
                                       console.log('else')
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
                                            item.push(groupData(param))
                                        }else{
                                            day = lastDay
                                        }
                                    }
                                }
                            }
                            //End For Rate
                            dayLoopDefault = day
                            lastDay = day
                            // lastDateEnd = endDate
                            
                            console.log('จบวนลูป **************')
                        }
                        console.log('END Pay ==============================')
                        dateLoopCount = dayLoop
                    }
                    const sumAmount = _sumBy(groupPaydate, function (o) { return Number(o.amount); })
                    const cal = Number(outstanding) - sumAmount
                    if (Number(outstanding).toFixed(2) !== sumAmount.toFixed(2) && cal > 20 && lastDate) { // คำนวนยอดที่จ่ายไม่เต็มจำนวน
                        console.log(' คำนวนยอดที่จ่ายไม่เต็มจำนวน')
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
                        const dayRate = CountDate(endDate, monthInvoic, [true])
                        // console.log('dayRate 2', dayRate,endDate.format('DD-MM-YYYY'))
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
                        let checkRateRes      = CountRate(dayRate - day, masterCondition, normalRate)
                        let rateRes           = CountRate(dayRate, masterCondition, normalRate)
        //   console.log('lastDateEnd', lastDateEnd.format('DD-MM-YYYY'))
    
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
                                        // console.log('dayNomal', dayNomal,lastDay,day)
                                
                                        param.rate = rateRes.value
                                        param.day  = dayNomal
                                        if (param.day > 0) {
                                            item.push(groupData(param))
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
                                                    item.push(groupData(param))
                                                }
                                            } else {
                                                totalDate = _cloneDeep(DateFormat(invoiceDate)).add(359, 'days')
                                                oldDate = CountDate(element.endDate, addLastDate, [true])
                                                param.rate = rateRes.oldValue
                                                param.day = oldDate
                                                if (param.day > 0) {
                                                    item.push(groupData(param))
                                                }
                                            }

                                        } else {
                                
                                            let totalDataInvoice = _cloneDeep(DateFormat(invoiceDate)).add(countDate, 'days')
                                            if(totalDataInvoice.format('YYYY/MM/DD') > element.endDate.format('YYYY/MM/DD')){
                                                totalDataInvoice =  element.endDate
                                            }
                                            let oldDate = CountDate(totalDataInvoice, addLastDate, [])
                                            let newPaydate = CountDate(element.endDate,_cloneDeep(totalDataInvoice), [true])
                                        // console.log('addLastDate', addLastDate.format('DD-MM-YYYY'),'totalDataInvoice',totalDataInvoice.format('DD-MM-YYYY'),'element.endDate',element.endDate.format('DD-MM-YYYY'))
                                            if(index == 0){
                                                if(totalDataInvoice.format('DD-MM-YYYY') >= element.endDate.format('DD-MM-YYYY')){
                                                    oldDate = CountDate(element.endDate, addLastDate, [true])
                                                    newPaydate = 0
                                                    console.log('1')
                                                }
                                            }else if(index > 0 && addLastDate.format('DD-MM-YYYY') < element.date.format('DD-MM-YYYY') && totalDataInvoice.format('DD-MM-YYYY') <= element.date.format('DD-MM-YYYY')){
                                                oldDate = CountDate(totalDataInvoice, element.date, [])
                                                newPaydate = CountDate(element.endDate, element.date, [true])
                                                console.log('2')
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
                                    
                                                if((dayRate-lastDay) < (oldDate+newPaydate)){
                                                    oldDate = 0
                                                    newPaydate = CountDate(element.endDate, addLastDate, [true])
                                                }
                                                if (oldDate <= 0 && newPaydate > 0) {
                                                    if (addLastDate.format("DD-MM-YYYY") >= totalDataInvoice.format("DD-MM-YYYY")) {
                                                        newPaydate = CountDate(element.endDate, addLastDate, [true])
                                                    }
                                                }
                                                // oldDate = CountDate(totalDataInvoice,element.date , [true])
                                                // newPaydate = CountDate(element.endDate, totalDataInvoice, [])
                                               
                                                // if((dayRate-lastDay) <= (oldDate+newPaydate)){
                                                //     oldDate = 0
                                                //     newPaydate = CountDate(element.endDate,addLastDate , [true])   
                                                // }
                                                console.log('3')
                                            }else{
                                                if(oldDate < 0){
                                                    newPaydate = CountDate(element.endDate, addLastDate, [true])
                                                    console.log('4')
                                                }
                                            }
                                           
                            // console.log('oldDate,newPaydate', index,oldDate,newPaydate,totalDataInvoice.format('DD-MM-YYYY'), addLastDate.format('DD-MM-YYYY'),lastDay)
                                            if (oldDate > 0) {
                                                param.rate = rateRes.oldValue
                                                param.day = oldDate
                                                if (param.day > 0) {
                                                    item.push(groupData(param))
                                                }
                                                param.rate = rateRes.value
                                                param.day = newPaydate
                                                if (param.day > 0) {
                                                    item.push(groupData(param))
                                                }
                                            } else {
                                                param.rate = rateRes.value
                                                param.day = newPaydate
                                                if (param.day > 0) {
                                                    item.push(groupData(param))
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
                                        param.day  = day
                                        if (param.day > 0) {
                                            item.push(groupData(param))
                                        }
                                    } else if(isCheckDefault){
                                        if (rateRes.type === 'nomal') {
                                            param.rate = rateRes.value
                                            param.day  = day
                                            if (param.day > 0) {
                                                item.push(groupData(param))
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
                                                        item.push(groupData(param))
                                                    }
                                                } else {
                                                    totalDate = _cloneDeep(DateFormat(invoiceDate)).add(359, 'days')
                                                    oldDate = CountDate(endDate, addLastDate, [true])
                                                    param.rate = rateRes.oldValue
                                                    param.day = oldDate
                                                    if (param.day > 0) {
                                                        item.push(groupData(param))
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
                                                        item.push(groupData(param))
                                                    }
                                                    param.rate = rateRes.value
                                                    param.day = newPaydate
                                                    if (param.day > 0) {
                                                        item.push(groupData(param))
                                                    }
                                                } else {
                                                    param.rate = rateRes.value
                                                    param.day = newPaydate
                                                    if (param.day > 0) {
                                                        item.push(groupData(param))
                                                    }
                                                }
                                            }
            
                                        }
                                    }
                                }
                            }
                        }

                    }
                    // End Pay
                }

                if (defaultPay.length) { // คำนวนรถ Deault
                    console.log('// คำนวนรถ Deault Aging')
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
                            newDueDate = CountDate(defaultPayDate, startDate, defaultPay)
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
                                    if(monthInterestCalLoop.format('YYYYMM') === DateFormat(iterator.paydate).format('YYYYMM') && Number(DateFormat(iterator.paydate).format('DD')) <=  Number(monthInterestCalLoop.format('DD'))){
                                        if(param.outstanding > iterator.amount){
                                            param.outstanding = param.outstanding - iterator.amount
                                        }
                                        checkPayment = checkPayment - iterator.amount
                                    }
                                }
                         

                                if(dayInterestCal === 0 && checkPayment <= 20){
                                    if(franchise === 'SUZUKI NEW' || franchise === 'SUZUKINEW' || franchise === 'suzuki new'){
                                        calculateByFranchise = false
                                    }
                                }
                            }
                        }
                        if (groupPaydate.length > 1) {
                            const checkPay = _filter(groupPaydate, o => DateFormat(o.paydate).unix() >= dueDate.unix())
                            const sumAmount = _sumBy(checkPay, function (o) { return Number(o.amount); })
                            if (parseFloat(param.outstanding).toFixed(2) !== sumAmount.toFixed(2)) {
                                param.outstanding = sumAmount
                            }
                        }
                     
                        if(groupPaydate.length == 1){
                            const checkPay = _filter(groupPaydate, o => DateFormat(o.paydate).unix() >= dueDate.unix())
                            const sumAmount = _sumBy(checkPay, function (o) { return Number(o.amount); })
                            const total = parseFloat(param.outstanding).toFixed(2) - parseFloat(sumAmount)
                            if(total > 1){
                                param.outstanding = total.toFixed(2)
                            }
                        }
                        const defaultRate = element.default_default_rate
                        if (element.default_default === "AGING") {
                            param.outstanding = element.default_installment
                        }
                        param.rate = defaultRate
                        param.day  = newDueDate
                        if (param.day > 0 && dayInterestCal >= 0) {
                            if(calculateByFranchise){
                                item.push(groupData(param))
                            }
                        }

                    }

                }

                if ((!paymentPay && !defaultPay.length) || (defaultPay.length && !paymentPay)) {
                    console.log('ไม่มี paymentPay')
                    param.outstanding = outstanding
                    let dayDefault = 0
                    for (let index = 0; index < nRate.length; index++) {
                        const element = nRate[index];
                        startDate = _cloneDeep(element.date)
                        endDate = _cloneDeep(element.endDate)
                        const day = CountDate(endDate, DateFormat(invoiceDate), [true])
                        let totalData = CountDate(endDate, startDate, [true])

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
                                    item.push(groupData(param))
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
                                            item.push(groupData(param))
                                        }
                                    } else {
                                        // if(index != 0 && i > 0 && invoiceDate.format('YYYY/MM/DD') < startDate.format('YYYY/MM/DD')){
                                        //     invoiceDate = startDate
                                        // }
                                        totalDate = DateFormat(invoiceDate).add(359, 'days')
                                        oldDate = CountDate(totalDate, startDate, [true])
                                        let newPaydate = CountDate(endDate, totalDate, [])
                                        if(totalDate.format('DD/MM/YYYY') < startDate.format('DD/MM/YYYY')){
                                            newPaydate = CountDate(endDate, startDate, [true])
                                        }
                                        
                                        param.rate = rateRes.oldValue
                                        param.day = oldDate
                                        if (param.day > 0) {
                                            item.push(groupData(param))
                                        }
                                        param.rate = rateRes.value
                                        param.day = newPaydate
                                        if (param.day > 0) {
                                            item.push(groupData(param))
                                        }
                                    }

                                } else {
                                    // console.log('totalData ==', totalData,countDate,DateFormat(invoiceDate).format('YYYY-MM-DD'),day)
                                    const totalDate = DateFormat(invoiceDate).add(countDate, 'days')
                                    const oldDate = CountDate(totalDate, startDate, [])
                                    let newTotalDate = CountDate(endDate, DateFormat(totalDate), [true])
                                    // console.log('totalDate.format== startDate.format("MM")', newTotalDate, DateFormat(totalDate).format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'))
                                    if(totalDate.format('MM') !== startDate.format("MM")){
                                        newTotalDate = CountDate(endDate, DateFormat(startDate), [true])
                                    }
                                    // console.log('oldDate', oldDate,newTotalDate)
                                    if (oldDate > 0) {
                                        param.rate = rateRes.oldValue
                                        param.day = oldDate

                                        if (param.day > 0) {

                                            item.push(groupData(param))
                                        }
                                        param.rate = rateRes.value
                                        param.day = newTotalDate

                                        if (param.day > 0) {
                                            item.push(groupData(param))
                                        }
                                    } else {
                                         let  rentalDaySum = newTotalDate
                                        if(dayDefault != 0 && (day-dayDefault) === (newTotalDate + oldDate)){
                                            rentalDaySum = newTotalDate + oldDate
                                        }
                                        param.rate = rateRes.value
                                        param.day = rentalDaySum
                                        if (param.day > 0) {
                                            item.push(groupData(param))
                                        }
                                    }
                                }

                            }
                        }
                        dayDefault = day
                    }
                    //End ==> 3
                }
            }
        })
        if (!item.length) {
            return NoDataRender()
        }
        item.push(
            <tr key={'total'} className="font-weight-bold">
                <td></td>
                <td>{'TOTAL'}</td>
                <td>{formatAmount(SUM_TOTAL_AMOUNT)}</td>
                <td></td>
                <td></td>
                <td>{formatAmount(SUM_TOTAL_PREVAT)}</td>
                <td>{formatAmount(SUM_TOTAL_VAT)}</td>
                <td>{formatAmount(SUM_TOTAL_WITHHOLDING)}</td>
                <td>{formatAmount(SUM_TOTAL_CHARGES)}</td>
            </tr>
        )
        return item

    }
    return (
        <>
            {
                !_isUndefined(reportData) && !_isUndefined(dealerData) && !_isUndefined(mor_mlr) && !_isUndefined(reportData.out_standing) && reportData.out_standing.length ?
                    renderItem()
                    :
                    <tr>
                        <td colSpan="9">
                            <h5 className="text-center">No Data</h5>
                        </td>
                    </tr>
            }
        </>
    )
}

const mapStateToProps = (state) => {
    const {
        condition: {
            dealerCondition,
            reportByDealer,
            masterInterest,
            loanType
        }
    } = state
    return {
        dealerCondition,
        reportByDealer,
        masterInterest,
        loanType
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(OutStanding)
