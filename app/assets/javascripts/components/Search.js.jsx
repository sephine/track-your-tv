var Search = React.createClass({
  propTypes: {
    results: React.PropTypes.array.isRequired,
    performSearch: React.PropTypes.func.isRequired,
  },

  getInitialState: function () {
    return {
      searchInput: "",
      searchDisplay: "",
      visibleResults: false
    };
  },

  componentWillMount: function () {
    this.debouncedPassSearchText = this.passSearchText.debounce(250);
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({
      visibleResults: newProps.results.length != 0
    });
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

  passSearchText: function () {
    this.props.performSearch(this.state.searchInput);
  },

  handleChange: function (e) {
    if (this.state.searchInput == this.state.searchDisplay) {
      this.setState({
        searchInput: e.target.value,
        searchDisplay: e.target.value
      });
      this.debouncedPassSearchText();
    }
  },

  handleSubmit: function (e) {
    alert("submit");
    e.preventDefault();
  },

  handleBlur: function (e) {
    this.setState({
      visibleResults: false
    });
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
              id={"search-result-id-"+index}
              style={{'whiteSpace': 'normal'}}>
            {string}
          </a>
        </li>
      );
    });
  },

  render: function () {
    var show = this.state.visibleResults ? "dropdown open" : " dropdown"
    return (
      <div className="navbar-right clearfix">
        <div className={show} style={{float: "left"}}>
        <form className="navbar-form navbar-search-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input type="text"
                value={this.state.searchDisplay}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                onBlur={this.handleBlur}
                className="form-control dropdown-toggle"
                data-toggle="dropdown"
                placeholder="Search" />
          </div>
        </form>
            <ul className="dropdown-menu" role="menu" style={{width: '270px'}}>
              {this.createListItems()}
            </ul>
            </div>
      </div>
    );
  }
});
