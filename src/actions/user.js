import UserConstants from '../constants/User';
import {
  createStagedAction,
} from 'gambit';

export const getUserSearch = createStagedAction(
  UserConstants.GET_USER_SEARCH,
  api => api.user.search,
  {
    id: (constant, { query }) => `${constant}_${query}`,
  },
);
