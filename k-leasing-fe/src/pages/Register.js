import React, { Component } from 'react'
import { connect } from 'react-redux'

import Register from '../components/Register'

export class RegisterPage extends Component {
    render() {
        return (
            <dev>
                <Register />
            </dev>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage)
