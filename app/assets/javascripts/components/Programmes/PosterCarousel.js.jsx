var PosterCarousel = React.createClass({
  propTypes: {
    posters: React.PropTypes.array.isRequired,
    chosenPoster: React.PropTypes.string,
    onImageChanged: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {
      items: []
    };
  },

  componentWillMount: function () {
    var chosenIndex = 0;
    for (let i = 0; i < this.props.posters.length; i++) {
      if (this.props.posters[i].tvdb_ref == this.props.chosenPoster) {
        chosenIndex = i;
        break;
      }
    }
    this.props.onImageChanged(this.props.posters[chosenIndex].tvdb_ref);
    var newItems = this.createItems(chosenIndex);
    this.setState({
      items: newItems
    })
  },

  createItems: function (startIndex) {
    var _this = this;
    return this.props.posters.map(function(data, index){
      var activeClass = index == startIndex ? "item active" : "item";
      imageSrc = data.url != null ? data.url : "https://thetvdb.com/banners/" + data.thumbnail;
      return (
        <div key={"item-id-"+index}
            className={activeClass}>
          <div className="image-sizer">
            <img src={imageSrc} alt={"Poster " + index} />
          </div>
        </div>
      );
    });
  },

  handleSlidePrev: function (e) {
    var idx = $('.carousel-inner .item.active').index();
    var newIdx = idx == 0 ? this.props.posters.length-1 : idx-1;
    this.props.onImageChanged(this.props.posters[newIdx].tvdb_ref);
  },

  handleSlideNext: function (e) {
    var idx = $('.carousel-inner .item.active').index();
    var newIdx = idx == this.props.posters.length-1 ? 0 : idx+1;
    this.props.onImageChanged(this.props.posters[newIdx].tvdb_ref);
  },

  render: function () {
    if (this.props.posters.length == 0) {
      return null;
    }
    return (
      <div id="poster-carousel" className="carousel slide" data-ride="carousel" data-interval="false">
        <div className="carousel-inner" role="listbox">
          {this.state.items}
        </div>
        {this.props.posters.length > 1 &&
            <div>
              <a className="left carousel-control" href="#poster-carousel" role="button" onClick={this.handleSlidePrev} data-slide="prev">
                <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="right carousel-control" href="#poster-carousel" role="button" onClick={this.handleSlideNext} data-slide="next">
                <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>}
      </div>
    );
  }
});
