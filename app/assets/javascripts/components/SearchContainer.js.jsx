var SearchContainer = React.createClass({

  getInitialState: function () {
    return { results: [] };
  },

  performSearch: function (searchText) {
    alert("performing api call");
  },

  render: function () {
    return (
      <div>
        <Search results={this.state.results} performSearch={this.performSearch} />
      </div>
    );
  }
});
