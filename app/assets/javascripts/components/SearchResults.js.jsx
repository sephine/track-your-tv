var SearchResults = React.createClass({
  propTypes: {
    searchText: React.PropTypes.string.isRequired,
    results: React.PropTypes.array.isRequired,
    count: React.PropTypes.number.isRequired,
    topPickID: React.PropTypes.number.isRequired,
    completed: React.PropTypes.bool.isRequired
  },

  componentWillMount: function () {
    window.addEventListener("scroll", this.handleScroll);
  },

  componentDidUpdate: function () {
    var proportionDone = this.props.results.length/this.props.count;
    NProgress.set(proportionDone);
  },

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  handleScroll: function (e) {
    if ($(window).scrollTop() > 20) {
      $('.search-header').fadeOut();
    } else {
      $('.search-header').fadeIn();
    }
  },

  handleClick: function (e) {
    alert("click " + e.target.text);
    e.preventDefault();
  },

  createTopPick: function () {
    for (let i = 0; i < this.props.results.length; i++) {
      let item = this.props.results[i];
      if (item.id == this.props.topPickID && item.posters.length != 0) {
        var bestRating = -1
        var bestThumbnail;
        for (let poster of item.posters) {
          if (poster.ratingsInfo.average > bestRating) {
            bestRating = poster.ratingsInfo.average;
            bestThumbnail = poster.thumbnail;
          }
        }
        return (
          <div className="container top-pick">
            <span className="col-xs-3 col-sm-1 col-md-1" />
            <div className="col-xs-6 col-sm-4 col-md-3">
              <a href="#"
                  onClick={this.handleClick}
                  id={"search-result-id-"+i}>
                <div className="thumbnail">
                  <img src={"http://thetvdb.com/banners/" + bestThumbnail} alt={item.seriesName} />
                </div>
              </a>
            </div>
            <span className="col-xs-3 hidden-sm" />
            <div className="col-xs-12 col-sm-6 col-md-7">
              <h2>{item.seriesName}</h2>
              <p><b>{item.genre.join(", ")}</b></p>
              <p>{item.overview.truncateOnWord(500)}</p>
            </div>
            <span className="hidden-xs col-sm-1 col-md-1" />
          </div>
        );
      }
    }
    return null;
  },

  createThumbnails: function () {
    if (this.props.completed && this.props.results.length == 0) {
      return (
        "No Results Found"
      );
    }
    if (this.props.results.length < this.props.count) {
      return null;
    }

    var _this = this;
    var hasTopPick = false;
    var inner = this.props.results.map(function(item, index){
      if (item.id == _this.props.topPickID && item.posters.length != 0) {
        hasTopPick = true;
        return null;
      }
      var bestRating = -1
      var bestThumbnail;
      for (let poster of item.posters) {
        if (poster.ratingsInfo.average > bestRating) {
          bestRating = poster.ratingsInfo.average;
          bestThumbnail = poster.thumbnail;
        }
      }
      return (
        <div className="col-xs-4 col-sm-3 col-md-2"
            key={"search-result-id-"+index}>
          <a href="#"
              onClick={_this.handleClick}
              id={"search-result-id-"+index}>
            {bestThumbnail &&
                <div className="thumbnail">
                  <img src={"http://thetvdb.com/banners/" + bestThumbnail} alt={item.seriesName} />
                </div>}
            {!bestThumbnail &&
                <div className="no-image-div thumbnail">
                  <img src="/assets/NoThumbnailSearchImage.jpg" alt="no image" className="no-image-img" />
                  <div className="no-image-title">
                    <h4>{item.seriesName}</h4>
                  </div>
                </div>}
          </a>
        </div>
      );
    });

    if (hasTopPick && this.props.results.length == 1) {
      return null;
    }

    var mainResultsClass = hasTopPick ? "other-results" : "all-results";
    return (
      <div className={mainResultsClass}>
        <div className="container">
          <div className="row">
            {inner}
          </div>
        </div>
      </div>
    );
  },

  render: function () {
    return (
      <div>
        <div className="search-header">
          <div className="container">
            <h3>Search Results for <b>{this.props.searchText}</b></h3>
          </div>
        </div>
        {this.createTopPick()}
        {this.createThumbnails()}
      </div>
    );
  }
});
