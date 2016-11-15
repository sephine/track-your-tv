var ShowProgramme = React.createClass({
  propTypes: {
    info: React.PropTypes.object,
    infoCompleted: React.PropTypes.bool.isRequired,
    onTrackClicked: React.PropTypes.func.isRequired,
    onEpisodeClicked: React.PropTypes.func.isRequired
  },

  componentWillMount: function () {
    NProgress.start();
    $('.page-filler').addClass("list-background");
  },

  componentDidUpdate: function () {
    if (this.props.infoCompleted) {
      NProgress.done();
    }
  },

  render: function () {
    return (
      <div>
        {this.props.infoCompleted &&
            <ProgrammeInfo info={this.props.info} onTrackClicked={this.props.onTrackClicked}/>}
        {this.props.infoCompleted && Object.keys(this.props.info.episodes).length != 0 &&
            <SeasonList info={this.props.info} onEpisodeClicked={this.props.onEpisodeClicked} />}
      </div>
    );
  }
});
