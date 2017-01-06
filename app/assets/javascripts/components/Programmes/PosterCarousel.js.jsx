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
      selectedIndex: 0,
      items: []
    };
  },

  componentWillMount: function () {
    var chosenIndex = 0;
    for (let i = 0; i < this.props.posters.length; i++) {
      if (this.props.posters[i].thumbnail == this.props.chosenPoster) {
        chosenIndex = i;
        break;
      }
    }
    var newItems = this.createItems(chosenIndex);
    this.setState({
      currentIndex: chosenIndex,
      selectedIndex: chosenIndex,
      items: newItems
    })
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.chosenPoster != this.props.chosenPoster) {
      var chosenIndex = 0;
      for (let i = 0; i < nextProps.posters.length; i++) {
        if (nextProps.posters[i].thumbnail == nextProps.chosenPoster) {
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
      return (
        <div key={"item-id-"+index}
            className={activeClass}>
          <img src={"http://thetvdb.com/banners/" + data.thumbnail} alt={"Poster " + index} style={{width: '100%'}} />
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
    this.props.updateProgramme(this.props.posters[this.state.currentIndex].thumbnail, this.props.ignored, false);
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
        <a className="left carousel-control" href="#poster-carousel" role="button" onClick={this.handleSlidePrev} data-slide="prev">
          <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="right carousel-control" href="#poster-carousel" role="button" onClick={this.handleSlideNext} data-slide="next">
          <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
        {this.props.allowSelection && this.state.currentIndex == this.state.selectedIndex &&
            <button type="button" className="btn btn-default" style={{color: 'green'}} disabled={true} onClick={this.handleSelection}>Selected</button>}
        {this.props.allowSelection && this.state.currentIndex != this.state.selectedIndex &&
            <button type="button" className="btn btn-default" onClick={this.handleSelection}>Select</button>}
      </div>
    );
  }
});
