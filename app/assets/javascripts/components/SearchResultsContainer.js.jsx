var SearchResultsContainer = React.createClass({
  propTypes: {
    searchText: React.PropTypes.string.isRequired
  },

  getInitialState: function () {
    return {
      results: [],
      topPickID: "",
      completed: false
    };
  },

  componentDidMount: function () {
    this.performSearch(this.props.searchText);
  },

  performSearch: function (searchText) {
    $.ajax({
      type: "GET",
      url: "/tvdb/search",
      data: {
        "search_text": searchText,
      },
      success: function(msg) {
        if (msg.hasOwnProperty('data')) {
          var bestMatchID;
          for (let item of msg.data) {
            if (item.seriesName.toLowerCase() == searchText.toLowerCase()) {
              bestMatchID = item.id;
              this.getSeriesInfo(item);
              this.setState({
                topPickID: item.id
              });
              break;
            }
          }
          for (let item of msg.data) {
            if (item.id != this.state.topPickID) {
              this.getSeriesInfo(item);
            }
          }
        } else {
          this.setState({
            completed: true
          });
        }
      }.bind(this),
      error: function() {
        alert("Error: failed to perform search on page load.");
      }
    });
  },

  getSeriesInfo: function (item) {
    $.ajax({
      type: "GET",
      url: "/tvdb/series",
      data: {
        "series_id": item.id,
      },
      success: function(msg) {
        if (msg.hasOwnProperty('data')) {
          this.insertIntoResults(msg.data);
        }
      }.bind(this),
      error: function() {
        alert("Error: failed to get poster.");
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
          series.siteRatingCount < data.siteRatingCount)) {
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
            topPickID={this.state.topPickID}
            completed={this.state.completed} />
      </div>
    );
  }
});
