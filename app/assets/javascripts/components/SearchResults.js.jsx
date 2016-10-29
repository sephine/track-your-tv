var SearchResults = React.createClass({
  propTypes: {
    searchText: React.PropTypes.string.isRequired,
    results: React.PropTypes.array.isRequired,
    completed: React.PropTypes.bool.isRequired
  },

  componentWillMount: function () {
    window.addEventListener("scroll", this.handleScroll);
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

  createThumbnails: function () {
    var _this = this;
    return this.props.results.map(function(item, index){
      var bestRating = -1
      var bestThumbnail;
      if (item.hasOwnProperty('posters')) {
        for (let poster of item.posters) {
          if (poster.ratingsInfo.average > bestRating) {
            bestRating = poster.ratingsInfo.average;
            bestThumbnail = poster.thumbnail;
          }
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
                    <img src="/assets/NoThumbnailSearchImage.jpg" alt="no image" />
                    <div className="no-image-inner">
                      <h4>{item.seriesName}</h4>
                      <p>{item.overview}</p>
                    </div>
                  </div>}
          </a>
        </div>
      );
    });
  },

  render: function () {
    var noResults = this.props.completed && this.props.results.length == 0
    return (
      <div>
        <div className="search-header">
          <h3>Search Results for <b>{this.props.searchText}</b></h3>
          </div>
          <div className="container search-results">
          <div className="row">
            {this.createThumbnails()}
          </div>
          {noResults && "No Results Found"}
        </div>
      </div>
    );
  }
});
