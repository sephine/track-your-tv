var SearchBox = React.createClass({
  propTypes: {
    results: React.PropTypes.array.isRequired,
    performSearch: React.PropTypes.func.isRequired,
  },

  getInitialState: function () {
    return {
      searchInput: "",
      searchDisplay: "",
    };
  },

  componentWillMount: function () {
    this.debouncedPassSearchText = this.passSearchText.debounce(250);
  },

  componentWillReceiveProps: function(newProps) {
    if (newProps.results.length != 0) {
      $('#search-box-dropdown').addClass('open');
    } else {
      $('#search-box-dropdown').removeClass('open');
    }
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
    e.preventDefault();
    if (this.state.searchInput.length != 0) {
      window.location.href = "/search?q=" + this.state.searchInput;
    }
  },

  createListItems: function () {
    var _this = this;
    return this.props.results.map(function(data, index){
      var hyphenName = data.seriesName.replaceAll(/[\.?!]/g, "").split(" ").join("-").toLowerCase();
      return (
        <li key={"search-result-id-"+index}>
          <a href={"/" + data.id + "/" + hyphenName}
              onMouseOver={_this.handleMouseOver}
              onMouseOut={_this.handleMouseOut}
              id={"search-result-id-"+index}
              style={{'whiteSpace': 'normal'}}>
            {data.seriesName}
          </a>
        </li>
      );
    });
  },

  render: function () {
    return (
      <div className="navbar-header pull-right">
        <div className="dropdown" id="search-box-dropdown">
          <form className="navbar-form navbar-search-form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text"
                  value={this.state.searchDisplay}
                  onChange={this.handleChange}
                  onSubmit={this.handleSubmit}
                  className="form-control"
                  placeholder="Search" />
              <a href="#" onClick={this.handleSubmit} id="search-icon">
                <span className="glyphicon glyphicon-search"></span>
              </a>
            </div>
          </form>
          <a className="hidden" data-toggle="dropdown" />
          <ul className="dropdown-menu" role="menu" style={{width: '270px'}}>
            {this.createListItems()}
          </ul>
        </div>
      </div>
    );
  }
});
