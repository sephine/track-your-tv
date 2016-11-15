var SearchResultsContainer = React.createClass({
  propTypes: {
    searchText: React.PropTypes.string.isRequired
  },

  getInitialState: function () {
    return {
      results: [],
      completed: false
    };
  },

  componentDidMount: function () {
    this.performSearch(this.props.searchText);
  },

  performSearch: function (searchText) {
    $.ajax({
      type: "GET",
      url: "/programme_infos/full_search",
      data: {
        "search_text": searchText,
      },
      success: function(msg) {
        console.log('SUCCESS');
        console.log(msg);
        if (msg.hasOwnProperty('data')) {
          this.sortResults(msg.data);
        } else {
          this.setState({
            completed: true
          });
        }
      }.bind(this),
      error: function(msg) {
        console.log(msg);
        alert("Error: failed to perform search on page load.");
      }
    });
  },

  sortResults: function(results) {
    results.sort(function(a, b) {
      if (a.posters.length != 0 && b.posters.length == 0) {
        return -1;
      } else if (a.posters.length == 0 && b.posters.length != 0) {
        return 1;
      } else {
        return b.ratingCount - a.ratingCount;
      }
    });
    this.setState({
      results: results,
      completed: true
    });
  },

  render: function () {
    return (
      <div>
        <SearchResults searchText={this.props.searchText}
            results={this.state.results}
            completed={this.state.completed} />
      </div>
    );
  }
});
