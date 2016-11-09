var SeriesInfo = React.createClass({
  propTypes: {
    info: React.PropTypes.object.isRequired,
    onTrackClicked: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {
      trackingRequested: false
    };
  },

  handleTrackClicked: function () {
    this.setState({
      trackingRequested: true
    });
    var sortedPosters = this.sortPosters();
    this.props.onTrackClicked(sortedPosters[0].thumbnail);
  },

  sortPosters: function () {
    return this.props.info.posters.concat().sort(function (a, b) {
      return b.ratingsInfo.average - a.ratingsInfo.average;
    });
  },

  render: function () {
    var splitDate = this.props.info.firstAired.split("-");
    var dateObject = new Date(splitDate[0], splitDate[1], splitDate[2]);
    var formattedDate = dateObject.medium();
    var sortedPosters = this.sortPosters();
    return (
      <div className="series-info">
        <div className="container">
          <span className="col-xs-3 col-sm-1 col-md-1" />
          <div className="col-xs-6 col-sm-5 col-md-4 col-lg-3">
            <PosterCarousel posters={sortedPosters} />
          </div>
          <span className="col-xs-3 hidden-sm" />
          <div className="col-xs-12 col-sm-5 col-md-6 col-lg-7">
            <h2>{this.props.info.seriesName}</h2>
            <p><b>{this.props.info.genre.join(", ")}</b></p>
            {this.props.info.status != "Ended" &&
                <p>{this.props.info.airsDayOfWeek} {this.props.info.airsTime} on {this.props.info.network}</p>}
            {this.props.info.status == "Ended" &&
                <p>{this.props.info.network} (ended)</p>}
            <p>Premiered {formattedDate}</p>
            <p>{this.props.info.overview.truncateOnWord(500)}</p>
            {!this.props.info.tracked &&
                <button className="btn btn-default" disabled={this.state.trackingRequested} onClick={this.handleTrackClicked}>Track</button>}

            {this.props.info.tracked &&
                <h4 style={{color: 'green'}}>Tracked</h4>}
          </div>
          <span className="hidden-xs col-sm-1 col-md-1" />
        </div>
      </div>
    );
  }
});
