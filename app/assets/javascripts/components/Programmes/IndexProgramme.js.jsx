var IndexProgramme = React.createClass({
  propTypes: {
    programmes: React.PropTypes.array,
    programmesCompleted: React.PropTypes.bool.isRequired
  },

  componentWillMount: function () {
    NProgress.start();
  },

  componentDidUpdate: function () {
    if (this.props.programmesCompleted) {
      NProgress.done();
    }
  },

  createProgrammeElements: function () {
    var _this = this;
    return this.props.programmes.map(function(programme, index) {
      return (
        <div key={"programme-element-"+programme.tvdb_ref}>
          <ProgrammeElement info={programme} />
        </div>
      );
    });
  },

  render: function () {
    if (this.props.programmesCompleted && this.props.programmes.length == 0) {
      return (
        <h1>No programmes added yet</h1>
      );
    } else {
      return (
        <div className="programme-list">
          <div className="container">
            <div className="row">
            {this.props.programmes != null &&
                this.createProgrammeElements()}
            </div>
          </div>
        </div>
      );
    }
  }
});
