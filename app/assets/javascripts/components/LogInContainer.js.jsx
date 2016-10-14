var LoginContainer = React.createClass({
  propTypes: {
    onFormChange: React.PropTypes.func.isRequired,
    shouldRedirect: React.PropTypes.bool.isRequired
  },

  getInitialState: function () {
    return { error: "" };
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
      url: "/users/sign_in",
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      },
      data: modified_data,
      success: function(msg) {
        console.log("success");
        console.log(msg);
      }.bind(this),
      error: function(msg) {
        console.log("error");
        console.log(msg);
        this.setState({error: msg.responseText});
      }.bind(this)
    });
  },

  render: function () {
    return (
      <div>
        <LoginForm error={this.state.error} onSubmit={this.submitData} onFormChange={this.props.onFormChange} shouldRedirect={this.props.shouldRedirect}/>
      </div>
    );
  }
});
