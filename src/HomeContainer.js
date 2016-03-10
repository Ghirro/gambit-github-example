import {
  createContainer,
  hasNotBeenCalled,
} from 'gambit';

import {
  getUserSearch,
} from './actions/user';

import Home from './Home';

export default createContainer(Home, {
  fetch: {
    results: {
      as: (state) => state.user.get('userSearches'),
    },
    loading: {
      as: (state) => state.user.get('searching'),
    },
    failed: {
      as: (state) => state.user.get('searchFailed'),
    },
  },
  methods: {
    search: dispatch => query => {
      return dispatch(getUserSearch({ query }, hasNotBeenCalled));
    },
  },
});
