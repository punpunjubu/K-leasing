import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import isEqual from 'react-fast-compare';
import routes from "./routes";
import { LoadFullPage } from './components/Loading'
import { getCookie } from './utils/storage'
import { Auth } from './redux/actions'

import PrivateRoute from './PrivateRoute'
import Login from './pages/Login'
import _isNull from 'lodash/isNull'
import _isUndefined from 'lodash/isUndefined'

import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import './styles/main.scss';

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: null
    }
  }

  componentDidMount() {
    const { initConnectServer } = this.props

    const session = getCookie('SESSION_TOKEN')
    let param = ''
    if (session) {
      param = JSON.parse(session)
    }
    initConnectServer(param)
  }

  componentDidUpdate(prevProps, prevState) {
    const { userData: { data, pending, error } } = this.props
    const { userData: { data: oldData, error: oldError } } = prevProps
    const { loggedIn } = this.state
    if (!pending) {
      if (!isEqual(data, oldData) && !_isNull(_isNull) && data.user_token) {
        this.setState({ loggedIn: true })
      } else if (!isEqual(data, oldData) && _isUndefined(data.user_token) && !_isNull(_isNull) && _isNull(loggedIn)) {
        this.setState({ loggedIn: false })
      }
    }
  }

  render() {
    const { loggedIn } = this.state
    return (
      <>
        {
          !_isNull(loggedIn) ?
            <Router>
              <Switch>
                <Route path="/login" component={Login} />

                {
                  routes.map((route, index) => {
                    return (
                      <PrivateRoute
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        loggedIn={loggedIn}
                        component={() => (
                          <route.layout >
                            <route.component />
                          </route.layout>
                        )}
                      />
                    );
                  })
                }
              </Switch>
            </Router>
            :
            <LoadFullPage />
        }
      </>
    )
  }
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
  initConnectServer: Auth.initConnectServer
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
