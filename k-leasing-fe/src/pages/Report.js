import React, { Component } from 'react'
import { connect } from 'react-redux'
import isEqual from 'react-fast-compare'
import { Condition } from '../redux/actions'
import SearchBarReport from '../components/SearchBarReport'
import { UnitReport, YieldReport } from '../components/Report'

import _isUndefined from 'lodash/isUndefined'

export class Report extends Component {
    constructor(props) {
        super(props)

    }
    componentDidMount() {
        const { getDealerCondition, masterInterest: { data }, getMaster, loanType: { data: dataLoan }, getLoanType } = this.props
        getDealerCondition()
        if (_isUndefined(data)) {
            getMaster()
        }
        if (_isUndefined(dataLoan)) {
            getLoanType()
        }
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
                <YieldReport />
                <SearchBarReport />
                <UnitReport />
            </>

        )
    }
}

const mapStateToProps = (state) => {
    const {
        condition: {
            masterInterest,
            loanType
        }

    } = state
    return {
        masterInterest,
        loanType
    }
}

const mapDispatchToProps = {
    getDealerCondition: Condition.getDealerCondition,
    getMaster: Condition.getMaster,
    getLoanType: Condition.getLoanType
}

export default connect(mapStateToProps, mapDispatchToProps)(Report)
