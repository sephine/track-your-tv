var SeasonList = React.createClass({
  propTypes: {
    episodes: React.PropTypes.object.isRequired,
  },

  getInitialState: function () {
    return {
      checked: false
    };
  },
  handleCheckboxChange: function (e) {
    alert('clicked');
    this.setState({
      checked: !this.state.checked
    });
  },

  createSortedSeasons: function () {
    var _this = this;
    var sortedSeasonIDs = Object.keys(this.props.episodes).sort(function (a, b) {
      var seasonNumberA = _this.props.episodes[a][Object.keys(_this.props.episodes[a])[0]].airedSeason;
      var seasonNumberB = _this.props.episodes[b][Object.keys(_this.props.episodes[b])[0]].airedSeason;
      return seasonNumberB - seasonNumberA;
    });
    return sortedSeasonIDs.map(function(id, index) {
      return _this.createSeason(id, index, sortedSeasonIDs.length);
    });
  },

  createSeason: function (seasonID, index, count) {
    var seasonNumber = this.props.episodes[seasonID][Object.keys(this.props.episodes[seasonID])[0]].airedSeason;
    var aClass = index == 0 ? "" : "collapsed";
    var divClass = index == 0 ? "panel-collapse collapse in" : "panel-collapse collapse"
    return (
      <div className="panel panel-default" key={"season-section-" + index}>
        <div className="panel-heading" role="tab" id={"heading" + index}>
          <h4 className="panel-title">
            <a className={aClass} role="button" data-toggle="collapse" href={"#collapse" + index} aria-expanded="true" aria-controls={"collapse" + index}>
              {index != count-1 &&
                  "Season " + seasonNumber}
              {index == count-1 &&
                  "Specials"}
            </a>
            <div className="season-checkbox">
              <span className="text-muted">Mark as watched &nbsp;</span>
              <input type="checkbox" />
            </div>
          </h4>
        </div>
        <div id={"collapse" + index} className={divClass} role="tabpanel" aria-labelledby={"heading" + index}>
          <div className="list-group">
            {this.createSortedEpisodes(seasonID)}
          </div>
        </div>
      </div>
    );
  },

  createSortedEpisodes: function (seasonID) {
    var _this = this;
    var sortedEpisodeIDs = Object.keys(this.props.episodes[seasonID]).sort(function (a, b) {
      var episodeNumberA = _this.props.episodes[seasonID][a].airedEpisodeNumber;
      var episodeNumberB = _this.props.episodes[seasonID][b].airedEpisodeNumber;
      return episodeNumberB - episodeNumberA;
    });
    return sortedEpisodeIDs.map(function (episodeID, index) {
      return _this.createEpisode(seasonID, episodeID, index);
    });
  },

  createEpisode: function (seasonID, episodeID, index) {
    var data = this.props.episodes[seasonID][episodeID];
    return (
      <div className="episode-section" key={"episode-section-" + index}>
      <a className="list-group-item collapsed" style={{'paddingRight': '40px'}} data-toggle="collapse" href={"#episode-collapse-" + index}>
        <b>{"Episode " + data.airedEpisodeNumber + ": " + data.episodeName}</b>
        <div id={"episode-collapse-" + index} className="panel-collapse collapse" role="tabpanel">
          {data.overview}
        </div>
      </a>
      <input className="episode-checkbox" type="checkbox" checked={this.state.checked} onChange={this.handleCheckboxChange} />
      </div>
    );
  },

  render: function () {
    if (this.props.episodes.length == 0) {
      return null;
    }
    return (
      <div className="episode-list">
        <div className="container">
          <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
            {this.createSortedSeasons()}
          </div>
        </div>
      </div>
    );
  }
});
