var IndexProgrammeContainer = React.createClass({
  mixins: [Reflux.listenToMany(ProgrammeActions)],

  getInitialState: function () {
    return {
      programmes: null,
      programmesCompleted: false,
      showOnly: 'watch'
    };
  },

  componentWillMount: function () {
    NProgress.start();
    if (window.location.hash) {
      var hash = window.location.hash.substring(1);
      if (hash == "wait") {
        this.onFilterWait();
      } else if (hash == "ignore") {
        this.onFilterIgnore();
      } else {
        this.onFilterWatch();
      }
    } else {
      this.onFilterWatch();
    }
  },

  componentDidMount: function () {
    this.getProgrammes();
  },

  componentDidUpdate: function () {
    if (this.props.programmesCompleted) {
      NProgress.done();
    }
  },

  onFilterWatch: function () {
    $('.watch-link').addClass("active");
    $('.wait-link').removeClass("active");
    $('.ignore-link').removeClass("active");
    if (window.location.hash != "" && window.location.hash != "#watch") {
      window.location.hash = "#watch"
    }
    this.setState({
      showOnly: "watch"
    });
  },

  onFilterWait: function () {
    $('.watch-link').removeClass("active");
    $('.wait-link').addClass("active");
    $('.ignore-link').removeClass("active");
    window.location.hash = "#wait"
    this.setState({
      showOnly: "wait"
    });
  },

  onFilterIgnore: function () {
    $('.watch-link').removeClass("active");
    $('.wait-link').removeClass("active");
    $('.ignore-link').addClass("active");
    window.location.hash = "#ignore"
    this.setState({
      showOnly: "ignore"
    });
  },

  getProgrammes: function () {
    var data = {
      "timezone_offset": (new Date()).getTimezoneOffset()
    }
    console.log((new Date()).getTimezoneOffset());
    $.ajax({
      type: "GET",
      url: "/tracked_programmes/index",
      data: data,
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
            programmesCompleted={this.state.programmesCompleted}
            showOnly={this.state.showOnly} />
      </div>
    );
  }
});
