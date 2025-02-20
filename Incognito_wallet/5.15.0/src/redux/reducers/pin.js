import type from '@src/redux/types/pin';

const reducer = (
  state = {
    loading: false,
    pin: '',
    authen: false,
  },
  action,
) => {
  switch (action.type) {
  case type.AUTHEN: {
    return { ...state, authen: true };
  }
  case type.LOADING: {
    return {
      ...state,
      loading: action.payload,
    };
  }
  case type.UPDATE:
    return {
      ...state,
      pin: action.payload,
      authen: false,
    };
  case type.DELETE:
    return {
      ...state,
      pin: '',
    };
  default:
    return state;
  }
};

export default reducer;
