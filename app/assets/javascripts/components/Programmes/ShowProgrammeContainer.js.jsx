var ShowProgrammeContainer = React.createClass({
  propTypes: {
    seriesID: React.PropTypes.string.isRequired
  },

  getInitialState: function () {
    return {
      info: null,
      infoCompleted: false,
      episodes: null,
      episodesCompleted: false
    };
  },

  componentDidMount: function () {
    this.getProgrammeInfo(this.props.seriesID);
  },

  getProgrammeInfo: function (seriesID) {
    $.ajax({
      type: "GET",
      url: "/tvdb/series",
      data: {
        "series_id": seriesID,
      },
      success: function(msg) {
        if (msg.hasOwnProperty('data')) {
          console.log(msg.data);
          this.setState({
            info: msg.data,
            infoCompleted: true
          })
          this.getEpisodes(seriesID);
        } else {
          this.setState({
            infoCompleted: true
          })
        }
      }.bind(this),
      error: function() {
        alert("Error: failed to get series info");
      }
    });
  },

  getEpisodes: function (seriesID) {
    $.ajax({
      type: "GET",
      url: "/tvdb/episodes",
      data: {
        "series_id": seriesID,
      },
      success: function(msg) {
        if (msg.hasOwnProperty('data')) {
          this.organizeEpisodes(msg.data);
        } else {
          this.setState({
            episodesCompleted: true
          })
        }
      }.bind(this),
      error: function() {
        alert("Error: failed to get episodes");
      }
    });
  },

  organizeEpisodes: function (episodeArray) {
    result = {};
    for (let episode of episodeArray) {
      if (!result.hasOwnProperty(episode.airedSeasonID)) {
        result[episode.airedSeasonID] = {}
      }
      result[episode.airedSeasonID][episode.id] = episode;
    }
    console.log(result);
    this.setState({
      episodes: result,
      episodesCompleted: true
    });
  },

  trackProgramme: function (image) {
    var data = {
      "programme[name]": this.state.info.seriesName,
      "programme[tvdb_ref]": this.props.seriesID,
      "programme[image]": image
    }
    $.ajax({
      type: "POST",
      url: "/programmes/create",
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
        "name": episode.name,
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
      url: "/episodes/update",
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
            episodes={this.state.episodes}
            episodesCompleted={this.state.episodesCompleted}
            onTrackClicked={this.trackProgramme}
            onEpisodeClicked={this.updateEpisode} />
      </div>
    );
  }
});
