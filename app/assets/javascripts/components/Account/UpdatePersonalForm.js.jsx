var UpdatePersonalForm = React.createClass({
  propTypes: {
    errors: React.PropTypes.object.isRequired,
    currentUser: React.PropTypes.object.isRequired,
    onSubmitForm: React.PropTypes.func.isRequired,
  },

  getInitialState: function () {
    return {
      name: "",
      current_password: ""
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if (Object.getOwnPropertyNames(nextProps.errors).length == 0) {
      this.setState({
        name: "",
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
        <form className="formChangePersonal" onSubmit={ (e) => this.handleSubmit(e) }>
          <div className="form-group">
            <label>Current name: {this.props.currentUser.name}</label>
            <input type="name" value={this.state.name} onChange={ (e) => this.setState({ name: e.target.value }) } className="form-control" placeholder="new name" />
            {this.props.errors.hasOwnProperty('name') &&
              <label className="error-message">name {this.props.errors.name}</label>}
          </div>

          <div className="form-group">
            <label>For security, please confirm your password</label>
            <input type="password" value={this.state.current_password} onChange={ (e) => this.setState({ current_password: e.target.value }) } className="form-control" placeholder="password" />
            {this.props.errors.hasOwnProperty('current_password') &&
              <label className="error-message">current password {this.props.errors.current_password}</label>}
          </div>

          <div className="form-group clearfix">
            <button type="submit" className="btn btn-default pull-right">Save New Personal Details</button>
          </div>
        </form>
      </div>
    );
  }
});
