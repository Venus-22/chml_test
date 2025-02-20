import type from '@src/redux/types/pin';
import LocalDatabase from '@utils/LocalDatabase';
import convertUtil from '@utils/convert';
import { ExHandler } from '@src/services/exception';

export const actionAuthen = () => ({ type: type.AUTHEN });

export const actionLoadingPin = (payload) => ({
  type: type.LOADING,
  payload,
});

export const loadPin = () => async (dispatch) => {
  try {
    await dispatch(actionLoadingPin(true));
    const pin = await LocalDatabase.getPIN();
    await dispatch({
      type: type.UPDATE,
      payload: pin,
    });
    return pin;
  } catch (error) {
    new ExHandler(error).showErrorToast();
  } finally {
    await dispatch(actionLoadingPin(false));
  }
};

export const updatePin = (newPin) => async (dispatch) => {
  const hashPin = convertUtil.toHash(newPin);
  await LocalDatabase.savePIN(hashPin);
  dispatch({
    type: type.UPDATE,
    payload: hashPin,
  });
  return hashPin;
};
