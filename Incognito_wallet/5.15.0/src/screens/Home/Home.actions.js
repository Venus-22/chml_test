import {
  ACTION_FETCHING,
  ACTION_FETCHED,
  ACTION_FETCH_FAIL,
} from './Home.constant';
import { apiGetAppVersion } from './Home.services';
import { checkOutdatedVersion } from './Home.utils';

export const actionFetching = () => ({
  type: ACTION_FETCHING,
});

export const actionFetched = (payload) => ({
  type: ACTION_FETCHED,
  payload,
});

export const actionFetchFail = () => ({
  type: ACTION_FETCH_FAIL,
});

export const actionFetch = () => async (dispatch, getState) => {
  const { isFetching } = getState()?.home;
  if (isFetching) {
    return;
  }
  let appVersion;
  let outdatedVersion = false;
  try {
    await dispatch(actionFetching());
    const task = [apiGetAppVersion()];
    const [{ data: appVersionDt }] = await new Promise.all(task);
    appVersion = appVersionDt?.Result;
    if (appVersion && appVersion?.Version) {
      outdatedVersion = checkOutdatedVersion(appVersion?.Version);
    }
  } catch (error) {
    console.debug('error', error);
  } finally {
    await dispatch(
      actionFetched({
        appVersion: { ...appVersion, outdatedVersion },
      }),
    );
  }
};
