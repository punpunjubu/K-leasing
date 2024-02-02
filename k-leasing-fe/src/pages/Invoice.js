import React, { Component } from 'react'
import { connect } from 'react-redux'
import isEqual from 'react-fast-compare'
import { Condition } from '../redux/actions'
import SearchInvoice from '../components/SearchBarReport/Invoice'
import Invoice from '../components/Invoice'

import _isUndefined from 'lodash/isUndefined'

export class InvoicePage extends Component {
    constructor(props) {
        super(props)

    }
    componentDidMount() {
        const { getDealerCondition, masterInterest: { data }, getMaster, loanType: { data: dataLoan }, getLoanType, getReportStatement, userData :{ data : userData } } = this.props
        getDealerCondition()
        if (_isUndefined(data)) {
            getMaster()
        }
        if (_isUndefined(dataLoan)) {
            getLoanType()
        }
        getReportStatement(userData.user_id)
    }
    componentDidUpdate(prevProps, prevState) {
        const { masterInterest: { data }, getMaster, loanType: { data: dataLoan }, getLoanType } = this.props
        const { masterInterest: { data: oldData }, loanType: { data: oldDataLoan } } = prevProps

        if (!isEqual(data, oldData) && !data) {
            getMaster()
        }
        if (!isEqual(dataLoan, oldDataLoan) && !dataLoan) {
            getLoanType()
        }
    }

    render() {

        return (
            <>
                <SearchInvoice />
                <Invoice />
            </>

        )
    }
}

const mapStateToProps = (state) => {
    const {
        condition: {
            masterInterest,
            loanType
        },
        auth:{userData}

    } = state
    return {
        masterInterest,
        loanType,
        userData
    }
}

const mapDispatchToProps = {
    getDealerCondition: Condition.getDealerCondition,
    getMaster         : Condition.getMaster,
    getLoanType       : Condition.getLoanType,
    getReportStatement: Condition.getReportStatement
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoicePage)
