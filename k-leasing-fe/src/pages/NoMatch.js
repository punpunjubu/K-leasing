import React, { Component } from 'react'
import { connect } from 'react-redux'

export class NoMatch extends Component {
    render() {
        return (
            <div>
                NoMatch
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(NoMatch)
