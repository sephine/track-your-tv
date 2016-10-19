var PasswordContainer = React.createClass({
  propTypes: {
    onFormChange: React.PropTypes.func,
    shouldRedirect: React.PropTypes.bool.isRequired
  },

  getInitialState: function () {
    return { errors: {} };
  },

  submitData: function (data) {
    var modified_data = {
      "user[email]": data.email,
    };
    console.log(modified_data);
    $.ajax({
      type: "POST",
      url: "/users/password",
      data: modified_data,
      success: function(msg) {
        console.log(msg);
        this.setState({errors: msg});
      }.bind(this),
      error: function(msg) {
        console.log(msg);
        alert("Error: failed to send password instructions.");
      }
    });
  },

  render: function () {
    return (
      <div>
        <PasswordForm errors={this.state.errors} onSubmitForm={this.submitData} onFormChange={this.props.onFormChange} shouldRedirect={this.props.shouldRedirect}/>
      </div>
    );
  }
});
