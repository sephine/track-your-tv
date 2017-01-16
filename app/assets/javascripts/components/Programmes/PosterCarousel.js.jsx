var PosterCarousel = React.createClass({
  propTypes: {
    posters: React.PropTypes.array.isRequired,
    allowSelection: React.PropTypes.bool.isRequired,
    chosenPoster: React.PropTypes.string,
    updateProgramme: React.PropTypes.func.isRequired,
    ignored: React.PropTypes.bool.isRequired
  },

  getInitialState: function () {
    return {
      currentIndex: 0,
      selectedIndex: null,
      items: []
    };
  },

  componentWillMount: function () {
    var chosenIndex = null;
    for (let i = 0; i < this.props.posters.length; i++) {
      if (this.props.posters[i].tvdb_ref == this.props.chosenPoster) {
        chosenIndex = i;
        break;
      }
    }
    var newItems = this.createItems(chosenIndex != null ? chosenIndex : 0);
    this.setState({
      currentIndex: chosenIndex != null ? chosenIndex : 0,
      selectedIndex: chosenIndex,
      items: newItems
    })
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.chosenPoster != this.props.chosenPoster) {
      var chosenIndex = null;
      for (let i = 0; i < nextProps.posters.length; i++) {
        if (nextProps.posters[i].tvdb_ref == nextProps.chosenPoster) {
          chosenIndex = i;
          break;
        }
      }
      this.setState({
        selectedIndex: chosenIndex
      })
    }
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
    this.setState({
      currentIndex: newIdx
    });
  },

  handleSlideNext: function (e) {
    var idx = $('.carousel-inner .item.active').index();
    var newIdx = idx == this.props.posters.length-1 ? 0 : idx+1;
    this.setState({
      currentIndex: newIdx
    });
  },

  handleSelection: function (e) {
    this.props.updateProgramme(this.props.posters[this.state.currentIndex].tvdb_ref, this.props.ignored, false);
    this.setState({
      selectedIndex: this.state.currentIndex
    });
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
        {this.props.allowSelection && this.state.currentIndex == this.state.selectedIndex &&
            <button type="button" className="btn btn-default" style={{color: 'green'}} disabled={true} onClick={this.handleSelection}>Selected</button>}
        {this.props.allowSelection && this.state.currentIndex != this.state.selectedIndex &&
            <button type="button" className="btn btn-default" onClick={this.handleSelection}>Select</button>}
      </div>
    );
  }
});
