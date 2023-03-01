import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, NavLink, useHistory } from "react-router-dom";

import { Auth } from '../../redux/actions'
import { setCookie } from '../../utils/storage'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'

import _isUndefined from 'lodash/isUndefined'

export const MainNavbar = (props) => {
    const { userData: { data }, initLogout } = props
    let history = useHistory();

    useEffect(() => {
        if(_isUndefined(data.user_id)){
            setCookie('SESSION_TOKEN', '')
            history.push('/login')
        }
    }, [data])
    const onLogout = () => {
        // setCookie('SESSION_TOKEN', '')
        initLogout(data)
        // history.push('/login')
    }
    return (
        <>
            <Navbar>
                <Container fluid>
                    <Link className="navbar-brand" to="/">
                        <Image src="/images/logo.png" className="image-responsive" />
                    </Link>
                    <Nav className="mr-auto">
                        <NavLink activeClassName="active" className="nav-link" to="/import">Import</NavLink>
                        <NavLink activeClassName="active" className="nav-link" to="/list-item">List Item</NavLink>
                        <NavLink activeClassName="active" className="nav-link" to="/invoice">Invoice</NavLink>
                        <NavLink activeClassName="active" className="nav-link" to="/report">Report</NavLink>
                    </Nav>
                    <Nav className="ml-auto">
                        <NavLink activeClassName="active" className="nav-link" to="/profile">Profile</NavLink>
                        <Button variant='danger' onClick={() => onLogout()}>Logout</Button>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

const mapStateToProps = (state) => {
    const {
        auth: {
            userData
        }
    } = state
    return {
        userData
    }
}

const mapDispatchToProps = {
    initLogout: Auth.initLogout
}

export default connect(mapStateToProps, mapDispatchToProps)(MainNavbar)
