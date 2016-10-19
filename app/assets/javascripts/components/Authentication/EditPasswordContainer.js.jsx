var EditPasswordContainer = React.createClass({
  propTypes: {
    resetPasswordToken: React.PropTypes.string.isRequired
  },

  getInitialState: function () {
    return { errors: {} };
  },

  submitData: function (data) {
    var modified_data = {
      "user[password]": data.password,
      "user[password_confirmation]": data.password_confirmation,
      "user[reset_password_token]": this.props.resetPasswordToken
    };
    console.log(modified_data);
    $.ajax({
      type: "PUT",
      url: "/users/password",
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      },
      data: modified_data,
      success: function(msg) {
        console.log(msg);
        this.setState({errors: msg});
      }.bind(this),
      error: function(msg) {
        console.log(msg);
        alert("Error: failed to edit password.");
      }
    });
  },

  render: function () {
    return (
      <div>
        <EditPasswordForm errors={this.state.errors} onSubmitForm={this.submitData} />
      </div>
    );
  }
});
