var UpdateEmailForm = React.createClass({
  propTypes: {
    errors: React.PropTypes.object.isRequired,
    currentUser: React.PropTypes.object.isRequired,
    onSubmitForm: React.PropTypes.func.isRequired,
  },

  getInitialState: function () {
    return {
      email: "",
      current_password: ""
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if (Object.getOwnPropertyNames(nextProps.errors).length == 0) {
      this.setState({
        email: "",
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
        <form className="formChangeEmail" onSubmit={ (e) => this.handleSubmit(e) }>
          <div className="form-group">
            <label>Current email: {this.props.currentUser.email}</label>
            <input type="email" value={this.state.email} onChange={ (e) => this.setState({ email: e.target.value }) } className="form-control" placeholder="new email address" />
            {this.props.errors.hasOwnProperty('email') &&
              <label className="error-message">email {this.props.errors.email}</label>}
          </div>

          <div className="form-group">
            <label>For security, please confirm your password</label>
            <input type="password" value={this.state.current_password} onChange={ (e) => this.setState({ current_password: e.target.value }) } className="form-control" placeholder="password" />
            {this.props.errors.hasOwnProperty('current_password') &&
              <label className="error-message">current password {this.props.errors.current_password}</label>}
          </div>

          <div className="form-group clearfix">
            <button type="submit" className="btn btn-default pull-right">Save New Email</button>
          </div>
        </form>
      </div>
    );
  }
});
