import React, { useState } from 'react'
import { connect } from 'react-redux'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import ContextAwareToggle from './ContextAwareToggle'
import { InputData } from '../../redux/actions'

export const MainAccordion = (props) => {
    const { fileList, children, ActiveInputFile } = props
    const [eventKey, setEventKey] = useState('')

    const onSetEventKey = (e) => {
        if (eventKey === e.type) {
            setEventKey('')
        } else {
            setEventKey(e.type)
        }
        ActiveInputFile(e)
    }
    return (
        <Accordion className="card-shadow">
            {
                fileList.map((res, index) => {
                    return (
                        <Card key={index}>
                            <Card.Header className="p-0">
                                <ContextAwareToggle className='w-100' eventKey={res.type} decoratedOnClick={(e) => onSetEventKey(res)}>
                                    {res.title}
                                   
                                </ContextAwareToggle>
                                
                            </Card.Header>
                            <Accordion.Collapse eventKey={res.type} className={eventKey === res.type ? 'show' : ''}>
                                <Card.Body>
                                    {children}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    )
                })
            }

        </Accordion>
    )
}

const mapStateToProps = (state) => {
    const {
        inputData: {
            fileList,
            statusFile
        }
    } = state
    return {
        fileList,
        statusFile
    }
}

const mapDispatchToProps = {
    ActiveInputFile: InputData.activeInputFile
}

export default connect(mapStateToProps, mapDispatchToProps)(MainAccordion)
