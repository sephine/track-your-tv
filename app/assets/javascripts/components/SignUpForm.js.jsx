var SignUpForm = React.createClass({
  propTypes: {
    errors: React.PropTypes.object.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    onFormChange: React.PropTypes.func.isRequired,
    shouldRedirect: React.PropTypes.bool.isRequired
  },

  getInitialState: function () {
    return {
      email: "",
      password: "",
      password_confirmation: ""
    };
  },

  handleSubmit: function (e) {
    this.props.onSubmit(this.state);
  },

  handleLoginClicked: function (e) {
    if (!this.props.shouldRedirect) {
      e.preventDefault();
      this.props.onFormChange("Login");
    }
  },

  render: function () {
    return (
      <div>
        <h1>In sign up form</h1>
        <form className="form_sign_up">
          <div className="form-group">
            <input type="email" value={this.state.email} onChange={ (e) => this.setState({ email: e.target.value }) } className="form-control" placeholder="email" />
          </div>

          <div className="form-group">
            <input type="password" value={this.state.password} onChange={ (e) => this.setState({ password: e.target.value }) } className="form-control" placeholder="password" />
          </div>

          <div className="form-group">
            <input type="password" value={this.state.password_confirmation} onChange={ (e) => this.setState({ password_confirmation: e.target.value }) } className="form-control" placeholder="confirm password" />
          </div>
        </form>

        <div className="form-group clearfix">
          <button type="submit" onClick={this.handleSubmit} className="btn btn-default pull-right">Sign Up</button>
        </div>
        <hr/>

        <a href="/login" onClick={this.handleLoginClicked} className="login-link">
          Log in
        </a>
      </div>
    );
  }
});
