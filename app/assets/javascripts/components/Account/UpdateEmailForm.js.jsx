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
    var emailDivClass = this.props.errors.hasOwnProperty('email') ? "form-group has-error" : "form-group";
    var currentPasswordDivClass = this.props.errors.hasOwnProperty('current_password') ? "form-group has-error" : "form-group";
    return (
      <div>
        <form className="formChangeEmail" onSubmit={ (e) => this.handleSubmit(e) }>
          <div className={emailDivClass}>
            <label>Current email: {this.props.currentUser.email}</label>
            <input type="email" value={this.state.email} onChange={ (e) => this.setState({ email: e.target.value }) } className="form-control" placeholder="new email address" />
            {this.props.errors.hasOwnProperty('email') &&
              <span className="help-block">new email address {this.props.errors.email}</span>}
          </div>

          <div className={currentPasswordDivClass}>
            <label>For security, please confirm your password</label>
            <input type="password" value={this.state.current_password} onChange={ (e) => this.setState({ current_password: e.target.value }) } className="form-control" placeholder="password" />
            {this.props.errors.hasOwnProperty('current_password') &&
              <span className="help-block">password {this.props.errors.current_password}</span>}
          </div>

          <div className="form-group clearfix">
            <button type="submit" className="btn btn-default pull-right">Save New Email</button>
          </div>
        </form>
      </div>
    );
  }
});
