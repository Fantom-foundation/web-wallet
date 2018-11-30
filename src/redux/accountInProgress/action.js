import * as types from '../constants';
import { dispatch } from '../store';

export function createAccount(data) {
  dispatch({
    type: types.CREATE_NEW_ACCOUNT,
    payload: data,
  });
}

export function emptyState() {
  dispatch({
    type: types.EMPTY_STATE,
    payload: {},
  });
}

export function createMnemonic(data) {
  dispatch({
    type: types.MNEMONIC_CODE,
    payload: data,
  });
}

export function incrementStepNo(data) {
  dispatch({
    type: types.INCREMENT_STEP_NO,
    payload: data,
  });
}