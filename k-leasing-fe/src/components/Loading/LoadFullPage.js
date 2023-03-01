import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

const LoadFullPage = () => {
    return (
        <div className="loading-full">
            <Spinner animation="border" role="status" size="">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    )
}
export default LoadFullPage