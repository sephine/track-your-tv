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
    return (
      <div>
        <form className="formChangePassword" onSubmit={ (e) => this.handleSubmit(e) }>
          <div className="form-group">
            <input type="password" value={this.state.password} onChange={ (e) => this.setState({ password: e.target.value }) } className="form-control" placeholder="new password" />
            {this.props.errors.hasOwnProperty('password') &&
              <label className="error-message">password {this.props.errors.password}</label>}
          </div>

          <div className="form-group">
            <input type="password" value={this.state.password_confirmation} onChange={ (e) => this.setState({ password_confirmation: e.target.value }) } className="form-control" placeholder="confirm new password" />
            {this.props.errors.hasOwnProperty('password_confirmation') &&
              <label className="error-message">password confirmation {this.props.errors.password_confirmation}</label>}
          </div>

          <div className="form-group">
            <label>For security, please confirm your current password</label>
            <input type="password" value={this.state.current_password} onChange={ (e) => this.setState({ current_password: e.target.value }) } className="form-control" placeholder="current password" />
            {this.props.errors.hasOwnProperty('current_password') &&
              <label className="error-message">current password {this.props.errors.current_password}</label>}
          </div>

          <div className="form-group clearfix">
            <button type="submit" className="btn btn-default pull-right">Save New Password</button>
          </div>
        </form>
      </div>
    );
  }
});
