var ShowProgrammeContainer = React.createClass({
  propTypes: {
    seriesID: React.PropTypes.string.isRequired
  },

  getInitialState: function () {
    return {
      info: null,
      infoCompleted: false,
      disabled: false
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
      infoCompleted: true,
      disabled: false
    });
  },

  trackProgramme: function (image) {
    this.setState({
      disabled: true
    });
    var data = {
      "series_id": this.props.seriesID,
      "image": image
    }
    $.ajax({
      type: "POST",
      url: "/tracked_programmes/create",
      data: data,
      success: function(msg) {
        this.getProgrammeInfo(this.props.seriesID);
      }.bind(this),
      error: function(msg) {
        alert("Error: failed to track series");
        this.getProgrammeInfo(this.props.seriesID);
      }.bind(this)
    });
  },

  deleteProgramme: function (image) {
    this.setState({
      disabled: true
    });
    var data = {
      "series_id": this.props.seriesID
    }
    $.ajax({
      type: "DELETE",
      url: "/tracked_programmes/delete",
      data: data,
      success: function(msg) {
        this.getProgrammeInfo(this.props.seriesID);
      }.bind(this),
      error: function(msg) {
        alert("Error: failed to delete series");
        this.getProgrammeInfo(this.props.seriesID);
      }.bind(this)
    });
  },

  updateProgramme: function (image, ignored, disable) {
    if (disable) {
      this.setState({
        disabled: true
      });
    }
    var data = {
      "series_id": this.props.seriesID,
      "image": image,
      "ignored": ignored
    }
    $.ajax({
      type: "PATCH",
      url: "/tracked_programmes/update",
      data: data,
      success: function(msg) {
        this.getProgrammeInfo(this.props.seriesID);
      }.bind(this),
      error: function(msg) {
        alert("Error: failed to track series");
        this.getProgrammeInfo(this.props.seriesID);
      }.bind(this)
    });
  },

  updateEpisode: function (episodes, watched, refresh) {
    if (refresh) {
      this.setState({
        disabled: true
      });
    }
    var episodeArray = []
    for (let episode of episodes) {
      episodeArray.append(episode.id);
    }
    var data = {
      "series_id": this.props.seriesID,
      "watched": watched,
      "episode_array": episodeArray
    }
    $.ajax({
      type: "PUT",
      url: "/watched_episodes/update",
      data: data,
      success: function(msg) {
        if (refresh) {
          this.getProgrammeInfo(this.props.seriesID);
        }
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
            disabled={this.state.disabled}
            onTrackClicked={this.trackProgramme}
            updateProgramme={this.updateProgramme}
            onDeleteClicked={this.deleteProgramme}
            onEpisodeClicked={this.updateEpisode} />
      </div>
    );
  }
});
