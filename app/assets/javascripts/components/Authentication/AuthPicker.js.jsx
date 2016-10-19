var AuthPicker = React.createClass({
  propTypes: {
    formToShow: React.PropTypes.string.isRequired,
    onFormChange: React.PropTypes.func.isRequired,
  },

  render: function () {
    var modalTitle;
    var modalBody;
    if (this.props.formToShow == "SignUp") {
      modalTitle = "Sign Up";
      modalBody = <SignUpContainer onFormChange={this.props.onFormChange} shouldRedirect={false}/>;
    } else if (this.props.formToShow == "Login") {
      modalTitle = "Log In";
      modalBody = <LoginContainer onFormChange={this.props.onFormChange} shouldRedirect={false}/>;
    } else if (this.props.formToShow == "Password") {
      modalTitle = "Forgot your password?"
      modalBody = <PasswordContainer onFormChange={this.props.onFormChange} shouldRedirect={false}/>;
    }

    return (
      <div className="modal" id="modalAuth" data-backdrop="static">
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
