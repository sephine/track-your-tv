var ForgotPasswordContainer = React.createClass({
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
    $.ajax({
      type: "POST",
      url: "/users/password",
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      },
      data: modified_data,
      success: function(msg) {
        this.setState({errors: msg});
      }.bind(this),
      error: function(msg) {
        alert("Error: failed to send password instructions.");
      }
    });
  },

  render: function () {
    return (
      <div>
        <ForgotPasswordForm errors={this.state.errors} onSubmitForm={this.submitData} onFormChange={this.props.onFormChange} shouldRedirect={this.props.shouldRedirect}/>
      </div>
    );
  }
});
