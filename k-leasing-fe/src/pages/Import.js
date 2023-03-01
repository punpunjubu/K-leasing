import React, { Component } from 'react'
import { connect } from 'react-redux'

import ImportFile from '../components/ImportFile'
import { Accordion } from '../components/Accordion'
import { InputData } from '../redux/actions'

export class Import extends Component {
    constructor(props) {
        super(props)

    }
    componentDidMount() {
        const { getStatusFile } = this.props
        getStatusFile()
    }


    render() {

        return (
            <>
                <Accordion >
                    <ImportFile />
                </Accordion>
            </>

        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    getStatusFile: InputData.getStatusFile
}

export default connect(mapStateToProps, mapDispatchToProps)(Import)
