import React, { useState } from 'react'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form'
export const InputControl = (props) => {
    let { activeInputFile: { type: activeType }, itemData, indexRow, name, value, type = 'text', isNameFile = false } = props
    const [state, setState] = useState(value)
    const onSetState = (val) => {
        itemData[indexRow] = val
        setState(val)
    }
    if (isNameFile) {
        name = `${activeType}_${name}`
    }
    return (
        <Form.Control type={type} name={name} value={state} onChange={(e) => onSetState(e.target.value)} />
    )
}

const mapStateToProps = (state) => {
    const {
        inputData: {
            activeInputFile
        }
    } = state
    return {
        activeInputFile
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(InputControl)
