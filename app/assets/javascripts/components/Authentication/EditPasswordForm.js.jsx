var EditPasswordForm = React.createClass({
  propTypes: {
    errors: React.PropTypes.object.isRequired,
    onSubmitForm: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {
      password: "",
      password_confirmation: ""
    };
  },

  handleSubmit: function (e) {
    e.preventDefault();
    this.props.onSubmitForm(this.state);
  },

  render: function () {
    var passwordDivClass = this.props.errors.hasOwnProperty('password') ? "form-group has-error" : "form-group";
    var passwordConfirmationDivClass = this.props.errors.hasOwnProperty('password_confirmation') ? "form-group has-error" : "form-group";
    return (
      <div>
        <form className="formEditPassword" onSubmit={ (e) => this.handleSubmit(e) }>
          <div className={passwordDivClass}>
            <input type="password" value={this.state.password} onChange={ (e) => this.setState({ password: e.target.value }) } className="form-control" placeholder="new password" />
            {this.props.errors.hasOwnProperty('password') &&
              <span className="help-block">password {this.props.errors.password}</span>}
          </div>

          <div className={passwordConfirmationDivClass}>
            <input type="password" value={this.state.password_confirmation} onChange={ (e) => this.setState({ password_confirmation: e.target.value }) } className="form-control" placeholder="confirm new password" />
            {this.props.errors.hasOwnProperty('password_confirmation') &&
              <span className="help-block">password confirmation {this.props.errors.password_confirmation}</span>}
          </div>

          <div className="form-group clearfix">
            <button type="submit" className="btn btn-default pull-right">Change my password</button>
          </div>
        </form>

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
