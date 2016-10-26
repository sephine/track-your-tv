var LoginForm = React.createClass({
  propTypes: {
    loginFailed: React.PropTypes.bool.isRequired,
    onSubmitForm: React.PropTypes.func.isRequired,
    onFormChange: React.PropTypes.func,
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
    e.preventDefault();
    this.props.onSubmitForm(this.state);
  },

  handleLinkClicked: function (e) {
    if (!this.props.shouldRedirect && (e.target.className == "sign-up-link"
        || e.target.className == "forgot-password-link")) {
      e.preventDefault();
      var newForm = e.target.className == "sign-up-link" ? "SignUp" : "Password";
      this.props.onFormChange(newForm);
    }
  },

  render: function () {
    var formGroupDivClass = this.props.loginFailed ? "form-group has-error" : "form-group";
    return (
      <div>
        <form className="formLogin" onSubmit={ (e) => this.handleSubmit(e) }>
          <div className={formGroupDivClass}>
            <input type="email" value={this.state.email} onChange={ (e) => this.setState({ email: e.target.value }) } className="form-control" placeholder="email" />
          </div>

          <div className={formGroupDivClass}>
            <input type="password" value={this.state.password} onChange={ (e) => this.setState({ password: e.target.value }) } className="form-control" placeholder="password" />
            {this.props.loginFailed &&
              <span className="help-block">Invalid password or email</span>}
          </div>

          <div className="form-inline clearfix">
            <div className="checkbox">
              <label>
                <input type="checkbox" value={this.state.remember_me} onChange={ (e) => this.setState({ remember_me: e.target.value }) } />
                <b> Remember me</b>
              </label>
            </div>
            <button type="submit" className="btn btn-default pull-right">Log In</button>
          </div>
        </form>

        <hr/>

        <a href="/sign_up" onClick={this.handleLinkClicked} className="sign-up-link">
          Sign up
        </a>
        <br />
        <a href="users/password/new" onClick={this.handleLinkClicked} className="forgot-password-link">
          Forgot your password?
        </a>
      </div>
    );
  }
});
