var Account = React.createClass({
  propTypes: {
    currentUser: React.PropTypes.object.isRequired,
    onShowForm: React.PropTypes.func.isRequired,
    onCancelClicked: React.PropTypes.func.isRequired
  },

  handleLinkClicked: function (e) {
    var newFormType;
    if (e.target.id == "update-personal-link") {
      newFormType = "Personal";
    } else if (e.target.id == "update-email-link") {
      newFormType = "Email";
    } else if (e.target.id == "update-password-link") {
      newFormType = "Password";
    }
    this.props.onShowForm(newFormType);
  },

  render: function () {
    return (
      <div>
        <h5>
          Personal Info
          <a onClick={this.handleLinkClicked} id="update-personal-link" className="pull-right">
            Update
          </a>
        </h5>
        <p>{this.props.currentUser.name}</p>

        <hr />

        <h5>
          Email
          <a onClick={this.handleLinkClicked} id="update-email-link" className="pull-right">
            Change
          </a>
        </h5>
        <p>{this.props.currentUser.email}</p>

        <hr />

        <h5>
          Password
          <a onClick={this.handleLinkClicked} id="update-password-link" className="pull-right">
            Change
          </a>
        </h5>
        <p>&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;</p>

        <hr />

        <h5>
          Cancel your account
          <a onClick={this.props.onCancelClicked} id="cancel-link" className="pull-right">
            Cancel
          </a>
        </h5>
      </div>
    );
  }
  });
