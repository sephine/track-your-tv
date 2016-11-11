var ProgrammeElement = React.createClass({
  propTypes: {
    info: React.PropTypes.object.isRequired,
  },

  render: function () {
    var item = this.props.info;
    var name = "" //TODO: should be passed a name by controller.
    var hyphenName = name.split(" ").join("-").toLowerCase();
    return (
      <div className="col-xs-4 col-sm-3 col-md-2">
        <a href={"/" + item.tvdb_ref + "/" + hyphenName}
            id={"programme-element-"+item.tvdb_ref}>
          {item.image != null && item.image != "" &&
              <div className="thumbnail">
                <img src={"http://thetvdb.com/banners/" + item.image} alt={name} />
              </div>}
          {(item.image == null || item.image == "") &&
              <div className="no-image-div thumbnail">
                <img src="/assets/NoThumbnailSearchImage.jpg" alt="no image" className="no-image-img" />
                <div className="no-image-title">
                  <h4>{name}</h4>
                </div>
              </div>}
        </a>
      </div>
    );
  }
});
