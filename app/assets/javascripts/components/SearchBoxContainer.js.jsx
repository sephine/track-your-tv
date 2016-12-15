var SearchBoxContainer = React.createClass({

  getInitialState: function () {
    return { results: [] };
  },

  performSearch: function (searchText) {
    $.ajax({
      type: "GET",
      url: "/programme_infos/search",
      data: {
        "search_text": searchText,
      },
      success: function(msg) {
        console.log(msg);
        if (msg.hasOwnProperty('data')) {
          this.setState({
            results: msg.data.slice(0, 5)
          });
        } else {
          this.setState({results: []});
        }
      }.bind(this),
      error: function() {
        this.setState({results: []});
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
