var ShowSeries = React.createClass({
  propTypes: {
    info: React.PropTypes.object,
    infoCompleted: React.PropTypes.bool.isRequired,
    episodes: React.PropTypes.object,
    episodesCompleted: React.PropTypes.bool.isRequired
  },

  componentWillMount: function () {
    NProgress.start();
    $('.page-filler').addClass("list-background");
  },

  componentDidUpdate: function () {
    if (this.props.infoCompleted && this.props.episodesCompleted) {
      NProgress.done();
    }
  },

  render: function () {
    if (this.props.infoCompleted && this.props.info.length == 0) {
      return (
        <h1>Series not found</h1>
      );
    } else {
      return (
        <div>
          {this.props.info != null &&
              <SeriesInfo info={this.props.info} />}
          {this.props.episodes != null &&
              <SeasonList episodes={this.props.episodes} />}
        </div>
      );
    }
  }
});
