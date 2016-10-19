var LoginContainer = React.createClass({
  propTypes: {
    onFormChange: React.PropTypes.func,
    shouldRedirect: React.PropTypes.bool.isRequired
  },

  getInitialState: function () {
    return { loginFailed: false };
  },

  submitData: function (data) {
    var modified_data = {
      "user[email]": data.email,
      "user[password]": data.password,
      "user[remember_me]": data.remember_me
    };
    console.log(modified_data);
    $.ajax({
      type: "POST",
      url: "/login",
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      },
      data: modified_data,
      error: function(msg) {
        this.setState({loginFailed: true});
      }.bind(this)
    });
  },

  render: function () {
    return (
      <div>
        <LoginForm loginFailed={this.state.loginFailed} onSubmit={this.submitData} onFormChange={this.props.onFormChange} shouldRedirect={this.props.shouldRedirect}/>
      </div>
    );
  }
});
