var ShowProgramme = React.createClass({
  propTypes: {
    info: React.PropTypes.object,
    infoCompleted: React.PropTypes.bool.isRequired,
    episodes: React.PropTypes.object,
    episodesCompleted: React.PropTypes.bool.isRequired,
    onTrackClicked: React.PropTypes.func.isRequired,
    onEpisodeClicked: React.PropTypes.func.isRequired
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
              <ProgrammeInfo info={this.props.info} onTrackClicked={this.props.onTrackClicked}/>}
          {this.props.episodes != null &&
              <SeasonList info={this.props.info} episodes={this.props.episodes} onEpisodeClicked={this.props.onEpisodeClicked} />}
        </div>
      );
    }
  }
});
