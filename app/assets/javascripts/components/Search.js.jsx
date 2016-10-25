var Search = React.createClass({
  propTypes: {
    results: React.PropTypes.array.isRequired,
    performSearch: React.PropTypes.func.isRequired,
  },

  getInitialState: function () {
    return {
      searchInput: "",
      searchDisplay: ""
    };
  },

  handleMouseOver: function (e) {
    this.setState({
      searchDisplay: e.target.text
    });
  },

  handleMouseOut: function (e) {
    this.setState({
      searchDisplay: this.state.searchInput
    });
  },

  handleClick: function (e) {
    alert("click " + e.target.text);
    e.preventDefault();
  },

  handleChange: function (e) {
    if (this.state.searchInput == this.state.searchDisplay) {
      this.setState({
        searchInput: e.target.value,
        searchDisplay: e.target.value
      });
      this.props.performSearch(e.target.value);
    }
  },

  handleSubmit: function (e) {
    alert("submit");
    e.preventDefault();
  },

  createListItems: function () {
    var _this = this;
    return this.props.results.map(function(string, index){
      return (
        <li key={"search-result-id-"+index}>
          <a className="search-result-link"
              onMouseOver={_this.handleMouseOver}
              onMouseOut={_this.handleMouseOut}
              onClick={_this.handleClick}
              id={"search-result-id-"+index}>
            {string}
          </a>
        </li>
      );
    });
  },

  render: function () {
    var show = this.props.results.length == 0 ? "dropdown" : " dropdown open"
    return (
      <div className="navbar-right clearfix">
        <div className={show} style={{float: "left"}}>
        <form className="navbar-form navbar-search-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input type="text"
                value={this.state.searchDisplay}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                className="form-control dropdown-toggle"
                data-toggle="dropdown"
                placeholder="Search" />
          </div>
        </form>
            <ul className="dropdown-menu" role="menu">
              {this.createListItems()}
            </ul>
            </div>
      </div>
    );
  }
});
