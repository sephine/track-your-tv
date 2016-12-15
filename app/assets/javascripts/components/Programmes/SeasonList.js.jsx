var SeasonList = React.createClass({
  propTypes: {
    info: React.PropTypes.object.isRequired,
    disabled: React.PropTypes.bool.isRequired,
    onEpisodeClicked: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {
      checkboxState: {}
    };
  },

  componentWillMount: function () {
    this.updateStateForProps(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.info != this.props.info) {
      this.updateStateForProps(nextProps);
    }
  },

  updateStateForProps: function(nextProps) {
    var newCheckboxState = {};
    for (let seasonNumber of Object.keys(nextProps.info.episodes)) {
      var episodes = {};
      for (let epObj of Object.values(nextProps.info.episodes[seasonNumber])) {
        episodes[epObj.tvdb_ref] = epObj.watched;
      }
      newCheckboxState[seasonNumber] = episodes;
    }
    this.setState({
      checkboxState: newCheckboxState
    });
  },

  handleEpisodeCheckboxChange: function (e) {
    parts = e.target.id.split("-")
    seasonNumber = parts[1]
    episodeID = parts[2];
    watched = e.target.checked;
    this.state.checkboxState[seasonNumber][episodeID] = watched;
    this.setState({
      checkboxState: this.state.checkboxState
    });
    this.props.onEpisodeClicked([{id: episodeID}], watched, false);
  },

  handleSeasonCheckboxChange: function (e) {
    parts = e.target.id.split("-");
    seasonNumber = parts[1];
    watched = e.target.checked;
    episodeArray = [];
    for (let data of Object.values(this.props.info.episodes[seasonNumber])) {
      episodeArray.append({id: data.tvdb_ref});
      this.state.checkboxState[seasonNumber][data.tvdb_ref] = watched;
    }
    this.setState({
      checkboxState: this.state.checkboxState
    });
    this.props.onEpisodeClicked(episodeArray, watched, false);
  },

  createSortedSeasons: function () {
    var _this = this;
    var sortedSeasonNumbers = Object.keys(this.props.info.episodes).sort(function (a, b) {
      return b - a;
    });
    return sortedSeasonNumbers.map(function(number, index) {
      return _this.createSeason(number, index);
    });
  },

  createSeason: function (seasonNumber, index) {
    var watched = this.allSeasonWatched(seasonNumber);
    var aClass = index == 0 ? "" : "collapsed";
    var divClass = index == 0 ? "panel-collapse collapse in" : "panel-collapse collapse"
    return (
      <div className="panel panel-default" key={"season-section-" + index}>
        <div className="panel-heading" role="tab" id={"heading" + index}>
          <h4 className="panel-title">
            <a className={aClass} role="button" data-toggle="collapse" href={"#collapse" + index} aria-expanded="true" aria-controls={"collapse" + index}>
              {seasonNumber != 0 &&
                  "Season " + seasonNumber}
              {seasonNumber == 0 &&
                  "Specials"}
            </a>
            {this.props.info.tracked &&
                <div className="season-checkbox">
                  <span className="text-muted">Mark as watched &nbsp;</span>
                  <input type="checkbox"
                      id={"checkbox-" + seasonNumber}
                      checked={watched}
                      onChange={this.handleSeasonCheckboxChange} />
                </div>}
          </h4>
        </div>
        <div id={"collapse" + index} className={divClass} role="tabpanel" aria-labelledby={"heading" + index}>
          <div className="list-group">
            {this.createSortedEpisodes(seasonNumber)}
          </div>
        </div>
      </div>
    );
  },

  allSeasonWatched: function (seasonNumber) {
    for (let watched of Object.values(this.state.checkboxState[seasonNumber])) {
      if (!watched) {
        return false;
      }
    }
    return true;
  },

  createSortedEpisodes: function (seasonNumber) {
    var _this = this;
    var sortedEpisodeIDs = Object.keys(this.props.info.episodes[seasonNumber]).sort(function (a, b) {
      var episodeNumberA = _this.props.info.episodes[seasonNumber][a].episode_number;
      var episodeNumberB = _this.props.info.episodes[seasonNumber][b].episode_number;
      return episodeNumberB - episodeNumberA;
    });
    return sortedEpisodeIDs.map(function (episodeID, index) {
      return _this.createEpisode(seasonNumber, episodeID, index);
    });
  },

  createEpisode: function (seasonNumber, episodeID, index) {
    var data = this.props.info.episodes[seasonNumber][episodeID];
    var splitDate = data.firstAired.split("-");
    var dateObject = new Date(splitDate[0], splitDate[1]-1, splitDate[2]);
    var formattedDate = dateObject.medium();
    var dateString = null;
    if (dateObject <= new Date()) {
      dateString = <span style={{color: 'green'}}>{"First Aired: " + formattedDate}</span>
    } else {
      dateString = <span style={{color: 'red'}}>{"Will Air: " + formattedDate}</span>
    }
    return (
      <div className="episode-section" key={"episode-section-" + index}>
      <a className="list-group-item collapsed" style={{'paddingRight': '40px'}} data-toggle="collapse" href={"#season" + seasonNumber + "episodecollapse" + index}>
        {data.episodeName != null && data.episodeName != "" &&
            <b>{"Episode " + data.episode_number + ": " + data.episodeName}</b>}
        {(data.episodeName == null || data.episodeName == "") &&
            <b>{"Episode " + data.episode_number}</b>}
        <div id={"season" + seasonNumber + "episodecollapse" + index} className="panel-collapse collapse" role="tabpanel">
          {data.firstAired == "" && data.overview == null &&
              "No details available yet"}
          {data.firstAired != "" &&
              dateString}
          <br />
          {data.overview != null &&
              data.overview}
        </div>
      </a>
      {this.props.info.tracked &&
          <label className="episode-checkbox" for={"checkbox-" + seasonNumber + "-" + episodeID}>
            <input id={"checkbox-" + seasonNumber + "-" + episodeID}
                type="checkbox"
                checked={this.state.checkboxState[seasonNumber][episodeID]}
                onChange={this.handleEpisodeCheckboxChange} />
          </label>}
      </div>
    );
  },

  render: function () {
    if (this.props.info.episodes.length == 0) {
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
