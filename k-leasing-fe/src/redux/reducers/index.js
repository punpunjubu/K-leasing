import { combineReducers } from 'redux'
import uiReducter from './ui'
import authReducer from './auth'
import inputDataReducer from './inputData'
import userReducer from './user'
import conditionReducer from './condition'

const rootReducer = combineReducers({
    ui: uiReducter,
    auth: authReducer,
    inputData: inputDataReducer,
    user: userReducer,
    condition: conditionReducer
})

export default rootReducer