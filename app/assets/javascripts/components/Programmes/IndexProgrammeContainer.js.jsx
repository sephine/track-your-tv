var IndexProgrammeContainer = React.createClass({
  getInitialState: function () {
    return {
      programmes: null,
      programmesCompleted: false
    };
  },

  componentWillMount: function () {
    NProgress.start();
  },

  componentDidMount: function () {
    this.getProgrammes();
  },

  componentDidUpdate: function () {
    if (this.props.programmesCompleted) {
      NProgress.done();
    }
  },

  getProgrammes: function () {
    $.ajax({
      type: "GET",
      url: "/tracked_programmes/index",
      success: function(msg) {
        console.log(msg);
        this.setState({
          programmes: msg,
          programmesCompleted: true
        });
      }.bind(this),
      error: function() {
        alert("Error: failed to get series list");
      }
    });
  },

  render: function () {
    return (
      <div>
        <IndexProgramme programmes={this.state.programmes}
            programmesCompleted={this.state.programmesCompleted} />
      </div>
    );
  }
});
