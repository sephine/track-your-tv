var ShowProgrammeContainer = React.createClass({
  propTypes: {
    seriesID: React.PropTypes.string.isRequired
  },

  getInitialState: function () {
    return {
      info: null,
      infoCompleted: false,
    };
  },

  componentDidMount: function () {
    this.getProgrammeInfo(this.props.seriesID);
  },

  getProgrammeInfo: function (seriesID) {
    $.ajax({
      type: "GET",
      url: "/tracked_programmes/show",
      data: {
        "series_id": seriesID,
      },
      success: function(msg) {
        console.log(msg);
        this.organizeEpisodes(msg);
      }.bind(this),
      error: function() {
        alert("Error: failed to get series info");
      }
    });
  },

  organizeEpisodes: function (data) {
    var episodeArray = data.episodes;
    var episodeObject = {}
    for (let episode of episodeArray) {
      if (!episodeObject.hasOwnProperty(episode.season_number)) {
        episodeObject[episode.season_number] = {}
      }
      episodeObject[episode.season_number][episode.tvdb_ref] = episode;
    }
    data.episodes = episodeObject;
    this.setState({
      info: data,
      infoCompleted: true
    });
  },

  trackProgramme: function (image) {
    var data = {
      "series_id": this.props.seriesID,
      "image": image
    }
    $.ajax({
      type: "POST",
      url: "/tracked_programmes/create",
      data: data,
      success: function(msg) {
        this.state.info.tracked = true;
        this.setState({
          info: this.state.info
        });
      }.bind(this),
      error: function(msg) {
        alert("Error: failed to track series");
      }.bind(this)
    });
  },

  updateEpisode: function (episodes, watched) {
    var episodeArray = []
    for (let episode of episodes) {
      episodeArray.append({
        "tvdb_ref": episode.id,
        "watched": watched,
      });
    }
    var data = {
      "series_id": this.props.seriesID,
      "episode_array": episodeArray
    }
    $.ajax({
      type: "POST",
      url: "/watched_episodes/update",
      data: data,
      success: function(msg) {
        console.log("update episode success");
      }.bind(this),
      error: function(msg) {
        alert("Error: failed to update episodes");
        this.getProgrammeInfo(this.props.seriesID);
      }.bind(this)
    });
  },

  render: function () {
    return (
      <div>
        <ShowProgramme info={this.state.info}
            infoCompleted={this.state.infoCompleted}
            onTrackClicked={this.trackProgramme}
            onEpisodeClicked={this.updateEpisode} />
      </div>
    );
  }
});
