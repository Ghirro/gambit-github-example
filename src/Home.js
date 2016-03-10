import React from 'react';
import Immutable from 'react-immutable-proptypes';
import { Map } from 'immutable';

export default class Home extends React.Component {
  static propTypes = {
    search: React.PropTypes.func.isRequired,
    results: Immutable.map.isRequired,
    failed: Immutable.map.isRequired,
    loading: React.PropTypes.bool.isRequired,
  };

  static defaultProps = {
    loading: false,
    failed: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      query: null,
    };
  }

  onChange = (event) => {
    const query = event.target.value;
    this.setState({
      query,
    }, () => {
      if (query.length > 3) {
        this.props.search(query);
      }
    });
  }

  render() {
    const { loading } = this.props;
    let { results, failed } = this.props;

    results = results.get(this.state.query, new Map({}));
    failed = failed.get(this.state.query, false);

    return (
      <div>
        <input
          type="text"
          onChange={this.onChange}
        />
        {!loading && (
          <div>
            {results.map(user => (
              <p>{user.get('id')} {user.get('login')}</p>
            ))}
          </div>
        )}
        {loading && (
          <p>Loading</p>
        )}
        {failed && (
          <p>Failed to fetch, probably over API limit... wait a few </p>
        )}
      </div>
    );
  }
}
