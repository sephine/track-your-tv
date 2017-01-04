var ProgrammeInfo = React.createClass({
  propTypes: {
    info: React.PropTypes.object.isRequired,
    disabled: React.PropTypes.bool.isRequired,
    onTrackClicked: React.PropTypes.func.isRequired,
    updateProgramme: React.PropTypes.func.isRequired,
    onDeleteClicked: React.PropTypes.func.isRequired
  },

  handleTrackClicked: function () {
    var sortedPosters = this.sortPosters();
    this.props.onTrackClicked(sortedPosters.length > 0 ? sortedPosters[0].thumbnail : "");
  },

  handleIgnoreClicked: function () {
    var sortedPosters = this.sortPosters();
    var image = this.props.info.image;
    var ignored = !this.props.info.ignored;
    this.props.updateProgramme(image, ignored);
  },

  handleDeleteClicked: function () {
    this.props.onDeleteClicked();
  },

  sortPosters: function () {
    return this.props.info.posters.concat().sort(function (a, b) {
      return b.rating_average - a.rating_average;
    });
  },

  render: function () {
    var splitDate = this.props.info.firstAired.split("-");
    var dateObject = new Date(splitDate[0], splitDate[1]-1, splitDate[2]);
    var formattedDate = dateObject.medium();
    var firstAiredText = dateObject <= new Date() ? "Premiered " + formattedDate : "Premiers " + formattedDate;
    var sortedPosters = this.sortPosters();
    var whereToWatch = null;
    if (this.props.info.status != "Ended") {
      if (this.props.info.airsDayOfWeek != null &&
            this.props.info.airsDayOfWeek != "" &&
            this.props.info.airsTime != null &&
            this.props.info.airsTime != "") {
        if (this.props.info.network != null && this.props.info.network != "") {
          whereToWatch = <p>{this.props.info.airsDayOfWeek} {this.props.info.airsTime} on {this.props.info.network}</p>
        } else {
          whereToWatch = <p>{this.props.info.airsDayOfWeek} {this.props.info.airsTime}</p>
        }
      } else if (this.props.info.network != null && this.props.info.network != "") {
        whereToWatch = <p>{this.props.info.network}</p>
      }
    } else {
      if (this.props.info.network != null && this.props.info.network != "") {
        whereToWatch = <p>{this.props.info.network} (ended)</p>
      } else {
        whereToWatch = <p>(ended)</p>
      }
    }

    return (
      <div className="series-info">
        <div className="container">
          <span className="col-xs-3 col-sm-1 col-md-1" />
          <div className="col-xs-6 col-sm-5 col-md-4 col-lg-3">
            <PosterCarousel posters={sortedPosters}
                allowSelection={this.props.info.tracked}
                chosenPoster={this.props.info.image}
                updateProgramme={this.props.updateProgramme}
                ignored={this.props.info.ignored}/>
          </div>
          <span className="col-xs-3 hidden-sm" />
          <div className="col-xs-12 col-sm-5 col-md-6 col-lg-7">
            <h2>
              {this.props.info.seriesName}
              {this.props.info.ignored &&
                  <span style={{color: 'red'}}>&nbsp;(Ignored)</span>}
              {!this.props.info.ignored && this.props.info.tracked &&
                  <span style={{color: 'green'}}>&nbsp;(Tracked)</span>}
            </h2>
            {this.props.info.genre != null && this.props.info.genre != "" &&
                <p><b>{this.props.info.genre}</b></p>}
            {whereToWatch != null &&
                whereToWatch}
            {this.props.info.firstAired != null && this.props.info.firstAired != "" &&
                <p>{firstAiredText}</p>}
            {this.props.info.overview != null && this.props.info.overview != "" &&
                <p>{this.props.info.overview.truncateOnWord(500)}</p>}
            {!this.props.info.tracked &&
                <button className="btn btn-default" disabled={this.props.disabled} onClick={this.handleTrackClicked}>Track</button>}
            {this.props.info.tracked &&
                <div className="btn-group" role="group">
                  <button type="button" className="btn btn-default" disabled={this.props.disabled} onClick={this.handleIgnoreClicked}>
                    {this.props.info.ignored? "Remove Ignore" : "Ignore"}
                  </button>
                  <button type="button" className="btn btn-default" disabled={this.props.disabled} onClick={this.handleDeleteClicked}>Delete</button>
                </div>}
          </div>
          <span className="hidden-xs col-sm-1 col-md-1" />
        </div>
      </div>
    );
  }
});
