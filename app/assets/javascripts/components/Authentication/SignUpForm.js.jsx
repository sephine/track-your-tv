var SignUpForm = React.createClass({
  propTypes: {
    errors: React.PropTypes.object.isRequired,
    onSubmitForm: React.PropTypes.func.isRequired,
    onFormChange: React.PropTypes.func,
    shouldRedirect: React.PropTypes.bool.isRequired
  },

  getInitialState: function () {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    };
  },

  handleSubmit: function (e) {
    e.preventDefault();
    this.props.onSubmitForm(this.state);
  },

  handleLoginClicked: function (e) {
    if (!this.props.shouldRedirect && e.target.className == "login-link") {
      e.preventDefault();
      this.props.onFormChange("Login");
    }
  },

  render: function () {
    return (
      <div>
        <form className="formSignUp" onSubmit={ (e) => this.handleSubmit(e) }>
          <div className="form-group">
            <input type="email" value={this.state.email} onChange={ (e) => this.setState({ email: e.target.value }) } className="form-control" placeholder="email" />
            {this.props.errors.hasOwnProperty('email') &&
              <label className="error-message">email {this.props.errors.email}</label>}
          </div>

          <div className="form-group">
            <input type="name" value={this.state.name} onChange={ (e) => this.setState({ name: e.target.value }) } className="form-control" placeholder="name" />
            {this.props.errors.hasOwnProperty('name') &&
              <label className="error-message">name {this.props.errors.email}</label>}
          </div>

          <div className="form-group">
            <input type="password" value={this.state.password} onChange={ (e) => this.setState({ password: e.target.value }) } className="form-control" placeholder="password" />
            {this.props.errors.hasOwnProperty('password') &&
              <label className="error-message">password {this.props.errors.password}</label>}
          </div>

          <div className="form-group">
            <input type="password" value={this.state.password_confirmation} onChange={ (e) => this.setState({ password_confirmation: e.target.value }) } className="form-control" placeholder="confirm password" />
            {this.props.errors.hasOwnProperty('password_confirmation') &&
              <label className="error-message">password confirmation {this.props.errors.password_confirmation}</label>}
          </div>

          <div className="form-group clearfix">
            <button type="submit" className="btn btn-default pull-right">Sign Up</button>
          </div>
        </form>

        <hr/>

        <a href="/login" onClick={this.handleLoginClicked} className="login-link">
          Log in
        </a>
      </div>
    );
  }
});
