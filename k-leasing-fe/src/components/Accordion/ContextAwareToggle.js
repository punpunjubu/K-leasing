import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import _isUndefined from 'lodash/isUndefined'
export const ContextAwareToggle = (props) => {
    const { children, eventKey, decoratedOnClick, statusFile: {
        data: {
            dealer_condition,
            default_file,
            master_condition,
            master_condition_spec,
            out_standing,
            payment
        } = {}
    } } = props

    let showUpdateFile = null
    switch (eventKey) {
        case 'master_data':
            showUpdateFile = !_isUndefined(master_condition) && !_isUndefined(master_condition[0]) && master_condition[0].create_at
            break;
        case 'master_data_spec':
            showUpdateFile = !_isUndefined(master_condition_spec) && !_isUndefined(master_condition_spec[0]) && master_condition_spec[0].create_at
            break;
        case 'out_standing':
            showUpdateFile = !_isUndefined(out_standing) && !_isUndefined(out_standing[0]) && out_standing[0].out_standing_create_at
            break;
        case 'payment':
            showUpdateFile = !_isUndefined(payment) && !_isUndefined(payment[0]) && payment[0].payment_create_at
            break;
        case 'default':
            showUpdateFile = !_isUndefined(default_file) && !_isUndefined(default_file[0]) && default_file[0].default_create_at
            break;
        case 'dealer_condition':
            showUpdateFile = !_isUndefined(dealer_condition) && !_isUndefined(dealer_condition[0]) && dealer_condition[0].dealer_condition_create_at
            break;


    }
    return (
        <div
            className="context-aware-toggle d-flex justify-content-between"
            onClick={() => decoratedOnClick(eventKey)}
        >
            <h3>{children}</h3>
            {showUpdateFile && <span className="time-status">latest update : {moment(showUpdateFile).format("DD-MM-YYYY")}</span>}
        </div>
    )
}

const mapStateToProps = (state) => {
    const {
        inputData: {
            statusFile
        }
    } = state
    return {
        statusFile
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ContextAwareToggle)
