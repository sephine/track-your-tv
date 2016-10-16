var PasswordForm = React.createClass({
  propTypes: {
    errors: React.PropTypes.object.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    onFormChange: React.PropTypes.func,
    shouldRedirect: React.PropTypes.bool.isRequired
  },

  getInitialState: function () {
    return {
      email: "",
    };
  },

  handleSubmit: function (e) {
    this.props.onSubmit(this.state);
  },

  handleLinkClicked: function (e) {
    if (!this.props.shouldRedirect && (e.target.className == "login-link"
        || e.target.className == "sign-up-link")) {
      e.preventDefault();
      var newForm = e.target.className == "login-link" ? "Login" : "SignUp";
      this.props.onFormChange(newForm);
    }
  },

  render: function () {
    return (
      <div>
        <div className="form-group">
          <input type="email" value={this.state.email} onChange={ (e) => this.setState({ email: e.target.value }) } className="form-control" placeholder="email" />
          {this.props.errors.hasOwnProperty('email') &&
            <label className="error-message">email {this.props.errors.email}</label>}
        </div>

        <div className="form-group clearfix">
          <button type="submit" onClick={this.handleSubmit} className="btn btn-default pull-right">Send me reset password instructions</button>
        </div>
        <hr/>

        <a href="/login" onClick={this.handleLinkClicked} className="login-link">
          Log in
        </a>
        <br />
        <a href="/sign_up" onClick={this.handleLinkClicked} className="sign-up-link">
          Sign up
        </a>
      </div>
    );
  }
});
