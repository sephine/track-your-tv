var ProgrammeElement = React.createClass({
  propTypes: {
    info: React.PropTypes.object.isRequired,
  },

  render: function () {
    var item = this.props.info;
    var name = item.seriesName
    var hyphenName = name.split(" ").join("-").toLowerCase();
    var labelText = item.unwatched_episodes;
    var labelClass = "label label-success"
    if (item.unwatched_episodes == 0) {
      if (item.nextAirDate != null) {
        var splitDate = item.nextAirDate.split("-");
        var dateObject = new Date(splitDate[0], splitDate[1]-1, splitDate[2], splitDate[3], splitDate[4]);
        labelText = dateObject.relative().split(" from now")[0];
        labelClass = "label label-info"
      } else if (item.status == "Ended") {
        labelText = "ended"
        labelClass = "label label-danger"
      } else {
        labelText = null;
      }
    }
    return (
      <div className="col-xs-4 col-sm-3 col-md-2">
        <a href={"/" + item.tvdb_ref + "/" + hyphenName}
            id={"programme-element-"+item.tvdb_ref}>
          {item.image != null && item.image != "" &&
              <div className="thumbnail">
                <img src={"http://thetvdb.com/banners/" + item.image} alt={name} />
                {labelText != null &&
                    <div className="thumbnail-label">
                      <h4><span className={labelClass}>{labelText}</span></h4>
                    </div>}
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
