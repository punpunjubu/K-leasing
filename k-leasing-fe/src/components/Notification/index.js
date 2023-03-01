import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import Toast from 'react-bootstrap/Toast'

export const Notification = (props) => {
    const { notification: { type = 'error', text,count } } = props

    const [show, setShow] = useState(false)
    useEffect(() => {
        if (text) {
            setShow(true)
        }
        
    }, [count])
    let variant = 'danger'
    switch (type) {
        case 'error':
            variant = 'danger'
            break;
        case 'success':
            variant = 'success'
            break;
        case 'info':
            variant = 'info'
            break;
    }
    return (
        <>
            <Toast show={show} className={`notification bg-${variant}`} animation={false} onClose={() => setShow(false)}>
                <Toast.Header>
                    <strong className="me-auto">{type.toUpperCase()}</strong>
                </Toast.Header>
                <Toast.Body className={variant === 'danger' && 'text-white'}>{text}</Toast.Body>
            </Toast>
        </>
    )
}

const mapStateToProps = (state) => {
    const {
        ui: {
            notification
        }
    } = state
    return {
        notification
    }
}


export default connect(mapStateToProps)(Notification)
