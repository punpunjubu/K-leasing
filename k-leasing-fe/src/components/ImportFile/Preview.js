import React from 'react'
import { connect } from 'react-redux'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'

import InputControl from '../InputControl'

const Thead = ({ data }) => {
    return (
        <thead>
            <tr>
                {
                    data.map((res, index) => {
                        return (
                            <th key={index}>{res}</th>
                        )
                    })
                }
            </tr>
        </thead>
    )
}
const Tbody = ({ data, numRow }) => {
    let rows = [];
    let length = data.length
    if (length > 50) {
        length = 50
    }
    for (let index = 0; index < length; index++) {
        const element = data[index];
            rows.push(
                <tr key={`${index}-tr`}>
                    <TdRow itemData={element} numRow={numRow} indexCol={index} />
                </tr>
            )
    }
 
    return (
        <tbody>
            {
                rows
            }
        </tbody>
    )
}
const TdRow = ({ itemData, numRow, indexCol }) => {
    let returnItem = []
    for (let index = 0; index < numRow; index++) {
        const element = itemData[index];
        returnItem.push(
            <td key={`${index}-td`}>
                <InputControl
                    name={`${indexCol}_${index}`}
                    indexCol={indexCol}
                    indexRow={index}
                    itemData={itemData}
                    value={element || ''}
                    isNameFile={true}
                />
            </td>
        )
    }
    return returnItem;
}

export const Preview = (props) => {
    const { importData, activeInputFile: { columnsFile: { header, cols } } } = props

    return (
        <>
            <Form>
                <div className="table-preview">
                    <Table striped bordered hover >
                        <Thead data={header} />
                        <Tbody data={importData} numRow={cols} />
                    </Table>
                </div>
            </Form>
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Preview)
