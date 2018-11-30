import * as types from '../constants';
import { dispatch } from '../store';

export function createPublicPrivateKeys(data) {
  dispatch({
    type: types.MASTER_PUBLIC_PRIVATE_KEY,
    payload: data,
  });
}

export function emptyKeysState() {
  dispatch({
    type: types.MASTER_PUBLIC_PRIVATE_KEY,
    payload: {},
  });
}