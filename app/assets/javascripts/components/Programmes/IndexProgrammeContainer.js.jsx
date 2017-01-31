var IndexProgrammeContainer = React.createClass({
  mixins: [Reflux.listenToMany(ProgrammeActions)],

  propTypes: {
    filterText: React.PropTypes.string.isRequired
  },

  getInitialState: function () {
    return {
      programmes: null,
      programmesCompleted: false,
      showOnly: 'watch'
    };
  },

  componentWillMount: function () {
    NProgress.start();
    this.onFilterChange(this.props.filterText);
  },

  componentDidMount: function () {
    this.getProgrammes();
  },

  componentDidUpdate: function () {
    if (this.props.programmesCompleted) {
      NProgress.done();
    }
  },

  onFilterChange: function (new_filter) {
    if (new_filter == "watch") {
      $('.watch-link').addClass("active");
      $('.wait-link').removeClass("active");
      $('.ignore-link').removeClass("active");
    } else if (new_filter == "wait") {
      $('.watch-link').removeClass("active");
      $('.wait-link').addClass("active");
      $('.ignore-link').removeClass("active");
    } else if (new_filter == "ignore") {
      $('.watch-link').removeClass("active");
      $('.wait-link').removeClass("active");
      $('.ignore-link').addClass("active");
    }
    this.setState({
      showOnly: new_filter
    });
  },

  getProgrammes: function () {
    var data = {
      "timezone_offset": (new Date()).getTimezoneOffset()
    }
    $.ajax({
      type: "GET",
      url: "/tracked_programmes/index",
      data: data,
      success: function(msg) {
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
            programmesCompleted={this.state.programmesCompleted}
            showOnly={this.state.showOnly} />
      </div>
    );
  }
});
