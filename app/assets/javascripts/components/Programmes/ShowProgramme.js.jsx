var ShowProgramme = React.createClass({
  propTypes: {
    info: React.PropTypes.object,
    infoCompleted: React.PropTypes.bool.isRequired,
    disabled: React.PropTypes.bool.isRequired,
    onTrackClicked: React.PropTypes.func.isRequired,
    updateProgramme: React.PropTypes.func.isRequired,
    onDeleteClicked: React.PropTypes.func.isRequired,
    onEpisodeClicked: React.PropTypes.func.isRequired
  },

  componentWillMount: function () {
    NProgress.start();
    $('.page-filler').addClass("list-background");
  },

  componentDidUpdate: function () {
    if (this.props.disabled) {
      NProgress.start();
    } else if (this.props.infoCompleted && !this.props.disabled) {
      NProgress.done();
    }
  },

  render: function () {
    return (
      <div>
        {this.props.infoCompleted &&
            <ProgrammeInfo info={this.props.info}
                disabled={this.props.disabled}
                onTrackClicked={this.props.onTrackClicked}
                updateProgramme={this.props.updateProgramme}
                onDeleteClicked={this.props.onDeleteClicked}/>}
        {this.props.infoCompleted && Object.keys(this.props.info.episodes).length != 0 &&
            <SeasonList info={this.props.info}
                disabled={this.props.disabled}
                onEpisodeClicked={this.props.onEpisodeClicked} />}
      </div>
    );
  }
});
