var ShowSeriesContainer = React.createClass({
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
    this.getSeriesInfo(this.props.seriesID);
  },

  getSeriesInfo: function (seriesID) {
    $.ajax({
      type: "GET",
      url: "/tvdb/series",
      data: {
        "series_id": seriesID,
      },
      success: function(msg) {
        if (msg.hasOwnProperty('data')) {
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
          console.log(msg.data);
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
      if (Array.isArray(episode)) {
        for (let actualEpisode of episode) {
          if (!result.hasOwnProperty(actualEpisode.airedSeasonID)) {
            result[actualEpisode.airedSeasonID] = {}
          }
          result[actualEpisode.airedSeasonID][actualEpisode.id] = actualEpisode;
        }
      } else {
        if (!result.hasOwnProperty(episode.airedSeasonID)) {
          result[episode.airedSeasonID] = {}
        }
        result[episode.airedSeasonID][episode.id] = episode;
      }
    }
    this.setState({
      episodes: result,
      episodesCompleted: true
    });
  },

  render: function () {
    return (
      <div>
        <ShowSeries info={this.state.info}
            infoCompleted={this.state.infoCompleted}
            episodes={this.state.episodes}
            episodesCompleted={this.state.episodesCompleted} />
      </div>
    );
  }
});
