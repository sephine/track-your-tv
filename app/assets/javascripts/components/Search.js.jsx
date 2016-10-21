var Search = React.createClass({
  render: function () {
    return (
      <div className="navbar-right clearfix">
        <form className="navbar-form navbar-search-form">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Search" />
          </div>
        </form>
      </div>
    );
  }
});
