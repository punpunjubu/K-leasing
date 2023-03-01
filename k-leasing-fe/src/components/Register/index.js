import React from 'react'
import { connect } from 'react-redux'

export const Register = (props) => {
    return (
        <div className="justify-content-center">
            <div md={6}>
            Register
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
