import * as types from '../types'

export const activeModal = (param) => ({
    type: types.MODAL_ACTIVE,
    value: param
})

export const notification = (param) => ({
    type: types.NOTIFICATION,
    value: param
})