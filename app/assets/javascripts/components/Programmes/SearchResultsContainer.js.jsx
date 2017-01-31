var SearchResultsContainer = React.createClass({
  propTypes: {
    searchText: React.PropTypes.string.isRequired
  },

  getInitialState: function () {
    return {
      results: [],
      count: 0,
      completed: false
    };
  },

  componentDidMount: function () {
    this.performSearch(this.props.searchText);
  },

  performSearch: function (searchText) {
    $.ajax({
      type: "GET",
      url: "/programme_infos/search",
      data: {
        "search_text": searchText,
      },
      success: function(msg) {
        if (msg.hasOwnProperty('data')) {
          this.setState({
            count: msg.data.length,
            completed: true
          });
          for (let item of msg.data) {
            this.getProgrammeInfo(item.id);
          }
        } else {
          this.setState({
            count: 0,
            completed: true
          });
        }
      }.bind(this),
      error: function(msg) {
        alert("Error: failed to perform search on page load.");
      }
    });
  },

  getProgrammeInfo: function (seriesID) {
    $.ajax({
      type: "GET",
      url: "/programme_infos/show",
      data: {
        "series_id": seriesID,
      },
      success: function(msg) {
        this.insertIntoResults(msg);
      }.bind(this),
      error: function(msg) {
        alert("Error: failed to get series info. Please try reloading the page.");
      }
    });
  },

  insertIntoResults: function(data) {
    for (var i = 0; i < this.state.results.length; i++) {
      var series = this.state.results[i];
      var inserted = false;
      if ((series.posters.length == 0 && data.posters.length > 0) ||
          (((series.posters.length == 0 && data.posters.length == 0) ||
          (series.posters.length > 0 && data.posters.length > 0)) &&
          series.ratingCount < data.ratingCount)) {
        var newResults = this.state.results.slice(0, i);
        newResults.append(data);
        newResults.append(this.state.results.slice(i, this.state.results.length));
        this.setState({
          results: newResults
        });
        inserted = true;
        break;
      }
    }
    if (!inserted) {
      this.setState({
        results: this.state.results.append(data)
      });
    }
  },

  render: function () {
    return (
      <div>
        <SearchResults searchText={this.props.searchText}
            results={this.state.results}
            count={this.state.count}
            completed={this.state.completed} />
      </div>
    );
  }
});
