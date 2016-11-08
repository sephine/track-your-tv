var PosterCarousel = React.createClass({
  propTypes: {
    posters: React.PropTypes.array.isRequired
  },

  sortPosters: function () {
    return this.props.posters.concat().sort(function (a, b) {
      return b.ratingsInfo.average - a.ratingsInfo.average;
    });
  },

  createItems: function () {
    var _this = this;
    var sortedPosters = this.sortPosters();
    return sortedPosters.map(function(data, index){
      var activeClass = index == 0 ? "item active" : "item";
      return (
        <div key={"item-id-"+index}
            className={activeClass}>
          <img src={"http://thetvdb.com/banners/" + data.thumbnail} alt={"Poster " + index} style={{width: '100%'}} />
        </div>
      );
    });
  },

  render: function () {
    if (this.props.posters.length == 0) {
      return null;
    }
    return (
      <div id="posterCarousel" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner" role="listbox">
          {this.createItems()}
        </div>
        <a className="left carousel-control" href="#posterCarousel" role="button" data-slide="prev">
          <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="right carousel-control" href="#posterCarousel" role="button" data-slide="next">
          <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
  }
});
