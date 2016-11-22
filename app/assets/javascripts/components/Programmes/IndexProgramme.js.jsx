var IndexProgramme = React.createClass({
  propTypes: {
    programmes: React.PropTypes.array,
    programmesCompleted: React.PropTypes.bool.isRequired,
    showOnly: React.PropTypes.string.isRequired
  },

  componentWillMount: function () {
    NProgress.start();
  },

  componentDidUpdate: function () {
    if (this.props.programmesCompleted) {
      NProgress.done();
    }
  },

  createProgrammeElements: function () {
    var elements = [];
    for (let programme of this.props.programmes) {
      if ((this.props.showOnly == "watch" && programme.unwatched_episodes != 0 && !programme.ignored) ||
          (this.props.showOnly == "wait" && programme.status != "Ended" && !programme.ignored && programme.unwatched_episodes == 0 ) ||
          (this.props.showOnly == "ignore" && (programme.ignored || (programme.status == "Ended" && programme.unwatched_episodes == 0)))) {
        elements.append(programme);
      }
    }

    if (this.props.showOnly == "watch") {
      elements.sort(function (a, b) {
        if (a.lastUnwatchedAirDate == null && b.lastUnwatchedAirDate == null) {
          if (a.seriesName < b.seriesName) {
            return -1;
          } else if (a.seriesName > b.seriesName) {
            return 1;
          } else {
            return 0;
          }
        } else if (a.lastUnwatchedAirDate != null && b.lastUnwatchedAirDate == null) {
          return -1;
        } else if (a.lastUnwatchedAirDate == null && b.lastUnwatchedAirDate != null) {
          return 1;
        } else {
          var aSplitDate = a.lastUnwatchedAirDate.split("-");
          var aDateObject = new Date(aSplitDate[0], aSplitDate[1]-1, aSplitDate[2], aSplitDate[3], aSplitDate[4]);
          var bSplitDate = b.lastUnwatchedAirDate.split("-");
          var bDateObject = new Date(bSplitDate[0], bSplitDate[1]-1, bSplitDate[2], bSplitDate[3], bSplitDate[4]);
          if (aDateObject < bDateObject) {
            return 1;
          } else if (aDateObject > bDateObject) {
            return -1;
          } else {
            return 0;
          }
        }
      });
    } else if (this.props.showOnly == "wait") {
      elements.sort(function (a, b) {
        if (a.nextAirDate == null && b.nextAirDate == null) {
          if (a.seriesName < b.seriesName) {
            return -1;
          } else if (a.seriesName > b.seriesName) {
            return 1;
          } else {
            return 0;
          }
        } else if (a.nextAirDate != null && b.nextAirDate == null) {
          return -1;
        } else if (a.nextAirDate == null && b.nextAirDate != null) {
          return 1;
        } else {
          var aSplitDate = a.nextAirDate.split("-");
          var aDateObject = new Date(aSplitDate[0], aSplitDate[1]-1, aSplitDate[2], aSplitDate[3], aSplitDate[4]);
          var bSplitDate = b.nextAirDate.split("-");
          var bDateObject = new Date(bSplitDate[0], bSplitDate[1]-1, bSplitDate[2], bSplitDate[3], bSplitDate[4]);
          if (aDateObject < bDateObject) {
            return -1;
          } else if (aDateObject > bDateObject) {
            return 1;
          } else {
            return 0;
          }
        }
      });
    } else {
      elements.sort(function (a, b) {
        if (a.seriesName < b.seriesName) {
          return -1;
        } else if (a.seriesName > b.seriesName) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    console.log(elements);
    return elements.map(function (programme) {
      return (
        <div key={"programme-element-"+programme.tvdb_ref}>
          <ProgrammeElement info={programme} />
        </div>
      );
    });
  },

  render: function () {
    if (this.props.programmesCompleted) {
      var elements = this.createProgrammeElements();
      if (elements.length == 0) {
        return (
          <h1>No programmes added yet</h1>
        );
      } else {
        return (
          <div className="programme-list">
            <div className="container">
              <div className="row">
                {elements}
              </div>
            </div>
          </div>
        );
      }
    } else {
      return null;
    }
  }
});
