import { createReducer } from 'gambit';
import { fromJS, Map } from 'immutable';
import UserConstants from '../constants/User';


export default createReducer({
  userSearches: [new Map({}), {
    [UserConstants.GET_USER_SEARCH_DONE]: ({
      body: { items },
      query,
    }, prevState) => {
      return prevState.set(query, fromJS(items));
    },
  }],
  searching: [false, {
    [UserConstants.GET_USER_SEARCH_STARTING]: true,
    [
      UserConstants.GET_USER_SEARCH_DONE +
      UserConstants.GET_USER_SEARCH_FAILED
    ]: false,
  }],
  searchFailed: [new Map({}), {
    [UserConstants.GET_USER_SEARCH_FAILED]: ({
      query,
    }, prevState) => {
      return prevState.set(query, true);
    },
    [
      UserConstants.GET_USER_SEARCH_STARTING +
      UserConstants.GET_USER_SEARCH_DONE
    ]: ({
      query,
    }, prevState) => {
      return prevState.set(query, false);
    },
  }],
});
