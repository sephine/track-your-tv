var UpdateUser = React.createClass({
  propTypes: {
    formToShow: React.PropTypes.string.isRequired,
    errors: React.PropTypes.object.isRequired,
    currentUser: React.PropTypes.object.isRequired,
    onSubmitForm: React.PropTypes.func.isRequired
  },

  render: function () {
    var modalTitle = "";
    var modalBody = null;
    if (this.props.formToShow == "Personal") {
      modalTitle = "Update Personal Details";
      modalBody = <UpdatePersonalForm errors={this.props.errors} currentUser={this.props.currentUser} onSubmitForm={this.props.onSubmitForm} />;
    } else if (this.props.formToShow == "Email") {
      modalTitle = "Change Email Address";
      modalBody = <UpdateEmailForm errors={this.props.errors} currentUser={this.props.currentUser} onSubmitForm={this.props.onSubmitForm} />;
    } else if (this.props.formToShow == "Password") {
      modalTitle = "Change Password"
      modalBody = <UpdatePasswordForm errors={this.props.errors} currentUser={this.props.currentUser} onSubmitForm={this.props.onSubmitForm} />;
    }

    return (
      <div className="modal" id="modalAccount" data-backdrop="static">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">{modalTitle}</h4>
            </div>
            <div className="modal-body">
              {modalBody}
            </div>
          </div>
        </div>
      </div>
    );
  }
});
