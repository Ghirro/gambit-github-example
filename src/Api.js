import { GambitApi } from 'gambit';

export default new GambitApi({
  user: {
    search({ query }) {
      return this.get({
        url: `search/users?q=${query}`,
      });
    },
  },
}, 'https://api.github.com/');
