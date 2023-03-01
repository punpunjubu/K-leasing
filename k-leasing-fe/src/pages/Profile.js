import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Condition } from '../redux/actions'
import Profile from '../components/Profile'

export class ProfilePage extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { getMaster, getLoanType } = this.props

    }


    render() {

        return (
            <>
                <Profile />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
