var UpdatePasswordForm = React.createClass({
  propTypes: {
    errors: React.PropTypes.object.isRequired,
    currentUser: React.PropTypes.object.isRequired,
    onSubmitForm: React.PropTypes.func.isRequired,
  },

  getInitialState: function () {
    return {
      password: "",
      password_confirmation: "",
      current_password: ""
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if (Object.getOwnPropertyNames(nextProps.errors).length == 0) {
      this.setState({
        password: "",
        password_confirmation: "",
        current_password: ""
      });
    }
  },

  handleSubmit: function (e) {
    e.preventDefault();
    this.props.onSubmitForm(this.state);
  },

  render: function () {
    var passwordDivClass = this.props.errors.hasOwnProperty('password') ? "form-group has-error" : "form-group";
    var passwordConfirmationDivClass = this.props.errors.hasOwnProperty('password_confirmation') ? "form-group has-error" : "form-group";
    var currentPasswordDivClass = this.props.errors.hasOwnProperty('current_password') ? "form-group has-error" : "form-group";
    return (
      <div>
        <form className="formChangePassword" onSubmit={ (e) => this.handleSubmit(e) }>
          <div className={passwordDivClass}>
            <input type="password" value={this.state.password} onChange={ (e) => this.setState({ password: e.target.value }) } className="form-control" placeholder="new password" />
            {this.props.errors.hasOwnProperty('password') &&
              <span className="help-block">new password {this.props.errors.password}</span>}
          </div>

          <div className={passwordConfirmationDivClass}>
            <input type="password" value={this.state.password_confirmation} onChange={ (e) => this.setState({ password_confirmation: e.target.value }) } className="form-control" placeholder="confirm new password" />
            {this.props.errors.hasOwnProperty('password_confirmation') &&
              <span className="help-block">password confirmation {this.props.errors.password_confirmation}</span>}
          </div>

          <div className={currentPasswordDivClass}>
            <label>For security, please confirm your current password</label>
            <input type="password" value={this.state.current_password} onChange={ (e) => this.setState({ current_password: e.target.value }) } className="form-control" placeholder="current password" />
            {this.props.errors.hasOwnProperty('current_password') &&
              <span className="help-block">current password {this.props.errors.current_password}</span>}
          </div>

          <div className="form-group clearfix">
            <button type="submit" className="btn btn-default pull-right">Save New Password</button>
          </div>
        </form>
      </div>
    );
  }
});
