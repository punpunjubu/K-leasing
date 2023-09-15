import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import moment from 'moment'
import { ExcelRenderer } from "react-excel-renderer"

import Preview from './Preview'
import { Ui, InputData } from '../../redux/actions'
import { numberWithSeparators, excelDateToJSDate } from '../../utils/helpers'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'


import _isEmpty from 'lodash/isEmpty'
import _isUndefined from 'lodash/isUndefined'
import _isString from 'lodash/isString'
import _split from 'lodash/split'

export const ImportFile = (props) => {
    const { activeInputFile, notification, getStatusFile,
        propsImportData: { data: statusImport, pending: statusImportPending, error: statusImportError }, userData: { data: user, }, setDataImport } = props
    const [uploadedFileName, setUploadedFileName] = useState(null);
    const [importData, setImportData] = useState({});
    const [pending, setPending] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const inputRef = useRef(null);
    const handleUpload = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };
    useEffect(() => {
        if (!_isUndefined(statusImport) && statusImport && !_isEmpty(importData)) {
            window.location.reload()
            setUploadSuccess(true)
        }

    }, [statusImport])
    const handleDisplayFileDetails = () => {
        setPending(true)
        if (inputRef.current) {
            const files = inputRef.current.files[0]
            const isFile = checkFile(files)
            if (isFile) {
                notification({
                    type: 'error',
                    text: isFile
                })
                setPending(false)
            } else {
                ExcelRenderer(files, (err, resp) => {
                    if (err) {
                        notification({
                            type: 'error',
                            text: err
                        })
                    } else {
                        let rows = []
                        for (let index = 0; index < resp.rows.length; index++) {
                            let element = resp.rows[index];
                            if (element.length) {
                                if (index != 0) {
                                    
                                    let key = []
                                    if (activeInputFile.type === 'out_standing') {
                                        key = [4, 5]
                                        if(element.length < 27){
                                            let setElement = []
                                            for (let i = 0; i < (27 - element.length); i++) {
                                                setElement.push('')
                                            }
                                            element = [...element,...setElement]
                                        }
                                    } else if (activeInputFile.type === 'payment') {
                                        key = [2, 4, 6, 8, 10, 12]
                                    } else if (activeInputFile.type === 'default') {
                                        key = [5, 6]
                                    } else if(activeInputFile.type === 'master_data' || activeInputFile.type === 'master_data_spec' ){
                                        if(element.length < 37){
                                            let setElement = []
                                            for (let i = 0; i < (37 - element.length); i++) {
                                                setElement.push(0)
                                            }
                                            element = [...element,...setElement]
                                        }

                                    }else if(activeInputFile.type === 'dealer_condition'){
                                        if(element.length < 26){
                                            let setElement = []
                                            for (let i = 0; i < (26 - element.length); i++) {
                                                setElement.push('')
                                            }
                                            element = [...element,...setElement]
                                        }

                                    }
                     
                                    for (let index = 0; index < key.length; index++) {
                                        const keyIndex = key[index];
                                        if (element[keyIndex]) {
                                            if (_isString(element[keyIndex])) {
                                                const str = _split(element[keyIndex], '/')
                                                const fd = `${str[2]}/${str[1]}/${str[0]}`
                                                let y = moment(fd)
                                                if (moment(fd).subtract(543, 'year').format('YYYY') > 2015) {
                                                    y = moment(fd).subtract(543, 'year')
                                                }
                                                element[keyIndex] = y.format('YYYY/MM/DD')
                                            } else {
                                                element[keyIndex] = excelDateToJSDate(element[keyIndex])
                                            }
                                            if (activeInputFile.type === 'default' && !element[9]) {
                                                element[9] = ''
                                            }
                                        }
                                    }
                                 
                                    rows.push(element)
                                }
                            } else {
                                break
                            }
                        }
                        setPending(false)
                        setImportData(rows)
                        setUploadedFileName(files.name);
                    }
                })
            }
        } else {
            setPending(false)
        }

    };
    const checkFile = (file) => {
        let errorMessage = "";
        const isExcel =
            file.type === "application/vnd.ms-excel" ||
            file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

        if (!isExcel) {
            errorMessage = "You can only upload Excel file!";
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            errorMessage = "File must be smaller than 2MB!";
        }
        return errorMessage;
    }
    const saveInputData = () => {
        const { columnsFile: { header, cols }, type } = activeInputFile
        const param = {
            dataImport: importData,
            type: type,
            user_id: user.user_id
        }
        setDataImport(param)
    }

    if (!activeInputFile) return null

    const classnames = classNames('btn',
        {
            'btn-outline-success': uploadedFileName ? true : false,
            'btn-outline-primary': uploadedFileName ? false : true
        })

    // console.log(`statusImportPending`, statusImportPending)
    return (
        <>
            {/* {ExcelDateToJSDate(44316)} */}
            <Row>
                <Col>
                    <h4>Import Excel File : {activeInputFile.title}</h4>
                    <Row className="m-0 py-3">
                        <Col className="d-flex">
                            <label className="px-3 m-0 align-self-center">Choose file:</label>
                            <input
                                ref={inputRef}
                                onChange={handleDisplayFileDetails}
                                className="d-none"
                                type="file"
                            />
                            <button
                                onClick={() => handleUpload()}
                                className={classnames}
                            >
                                {uploadedFileName ? uploadedFileName : "Upload"}
                            </button>
                            {
                                pending &&
                                <div className="pl-4">
                                    <Spinner animation="border" variant="success" />
                                </div>
                            }
                        </Col>
                        <Col className="text-right">
                            {
                                !_isEmpty(importData) &&
                                <Button
                                    onClick={() => saveInputData()}
                                    variant='success'
                                >
                                    {statusImportPending ? <Spinner animation="border" variant="success" /> : "Save"}
                                </Button>
                            }
                        </Col>
                    </Row>
                    {
                        uploadSuccess &&
                        <Row>
                            <Col>
                                <Alert variant={'success'}>
                                    Upload data success
                                </Alert>
                            </Col>
                        </Row>
                    }
                </Col>
            </Row>

            {
                !_isEmpty(importData) &&
                <>
                    <Row className="pt-3">
                        <Col>
                            <p>Count : {numberWithSeparators(importData.length)} rows</p>
                        </Col>
                    </Row>
                    <Row className="pt-3">
                        <Col>
                            <Preview importData={importData} />
                        </Col>
                    </Row>
                </>
            }
        </>
    )
}

const mapStateToProps = (state) => {
    const {
        inputData: {
            activeInputFile,
            importData: propsImportData
        },
        auth: {
            userData
        }
    } = state
    return {
        activeInputFile,
        userData,
        propsImportData
    }
}

const mapDispatchToProps = {
    notification: Ui.notification,
    setDataImport: InputData.setDataImport,
    getStatusFile: InputData.getStatusFile
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportFile)
