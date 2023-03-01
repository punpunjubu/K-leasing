import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Condition } from '../redux/actions'
import Interest from '../components/Interest'

export class ListItem extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { getMaster, getLoanType } = this.props
        getMaster()
        getLoanType()
    }


    render() {

        return (
            <>
                <Interest />
            </>

        )
    }
}

const mapStateToProps = (state) => {
    const {
        condition: {
            masterInterest
        }
    } = state
    return {

    }
}

const mapDispatchToProps = {
    getMaster: Condition.getMaster,
    getLoanType: Condition.getLoanType
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItem)
