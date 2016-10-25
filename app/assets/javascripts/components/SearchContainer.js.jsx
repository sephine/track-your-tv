var SearchContainer = React.createClass({

  getInitialState: function () {
    return { results: [] };
  },

  performSearch: function (searchText) {
    alert("performing api call");
    $.ajax({
      type: "POST",
      url: "/tvdb/login",
      success: function(msg) {
        console.log("success");
        console.log(msg);
      }.bind(this),
      error: function(msg) {
        console.log("error");
        console.log(msg);
      }
    });
  },

  render: function () {
    return (
      <div>
        <Search results={this.state.results} performSearch={this.performSearch} />
      </div>
    );
  }
});
