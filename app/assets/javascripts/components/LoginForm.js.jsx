var LoginForm = React.createClass({
  propTypes: {
    loginFailed: React.PropTypes.bool.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    onFormChange: React.PropTypes.func.isRequired,
    shouldRedirect: React.PropTypes.bool.isRequired
  },

  getInitialState: function () {
    return {
      email: "",
      password: "",
      remember_me: false
    };
  },

  handleSubmit: function (e) {
    this.props.onSubmit(this.state);
  },

  handleLinkClicked: function (e) {
    if (!this.props.shouldRedirect && (e.target.className == "sign-up-link"
        || e.target.className == "forgot-password-link")) {
      e.preventDefault();
      var newForm = e.target.className == "sign-up-link" ? "SignUp" : "ForgotPassword";
      this.props.onFormChange(newForm);
    }
  },

  render: function () {
    return (
      <div>
        <div className="form-group">
          <input type="email" value={this.state.email} onChange={ (e) => this.setState({ email: e.target.value }) } className="form-control" placeholder="email" />
        </div>

        <div className="form-group">
          <input type="password" value={this.state.password} onChange={ (e) => this.setState({ password: e.target.value }) } className="form-control" placeholder="password" />
          {this.props.loginFailed &&
            <label className="error-message">Invalid password or email</label>}
        </div>

        <div className="form-inline clearfix">
          <div className="checkbox">
            <label>
              <input type="checkbox" value={this.state.remember_me} onChange={ (e) => this.setState({ remember_me: e.target.value }) } />
              <b> Remember me</b>
            </label>
          </div>
          <button type="submit" onClick={this.handleSubmit} className="btn btn-default pull-right">Log In</button>
        </div>

        <hr/>

        <a href="/sign_up" onClick={this.handleLinkClicked} className="sign-up-link">
          Sign up
        </a>
        <br />
        <a href="/password/new" onClick={this.handleLinkClicked} className="forgot-password-link">
          Forgot your password?
        </a>
      </div>
    );
  }
});
