import * as types from '../constants';
// import storage from '../store';

const defaultState = {};

const accountKeys = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case types.MASTER_PUBLIC_PRIVATE_KEY: {
      return Object.assign({}, state, {
        // masterKey: payload.masterKey,
        publicAddress: payload.publicAddress,
        privateKey: payload.privateKey,
      });
    }
    case types.EMPTY_KEYS_STATE: {
      return defaultState;
    }
    default:
      return state;
  }
};

export default accountKeys;
