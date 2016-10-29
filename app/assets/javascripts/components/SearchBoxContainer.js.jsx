var SearchBoxContainer = React.createClass({

  getInitialState: function () {
    return { results: [] };
  },

  performSearch: function (searchText) {
    $.ajax({
      type: "GET",
      url: "/tvdb/search",
      data: {
        "search_text": searchText,
      },
      success: function(msg) {
        console.log(msg);
        if (msg.hasOwnProperty('data')) {
          this.setState({
            results: msg.data.slice(0, 5).map(function(entry){
              return entry.seriesName;
            })
          });
        } else {
          this.setState({results: []});
        }
      }.bind(this),
      error: function() {
        alert("Error: failed to perform search on input.");
      }
    });
  },

  render: function () {
    return (
      <div>
        <SearchBox results={this.state.results} performSearch={this.performSearch} />
      </div>
    );
  }
});
