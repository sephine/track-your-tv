var SignUpContainer = React.createClass({
  propTypes: {
    onFormChange: React.PropTypes.func,
    shouldRedirect: React.PropTypes.bool.isRequired
  },

  getInitialState: function () {
    return { errors: {} };
  },

  submitData: function (data) {
    var modified_data = {
      "user[name]": data.name,
      "user[email]": data.email,
      "user[password]": data.password,
      "user[password_confirmation]": data.password_confirmation
    };
    $.ajax({
      type: "POST",
      url: "/sign_up",
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      },
      data: modified_data,
      success: function(msg) {
        this.setState({errors: msg});
      }.bind(this),
      error: function() {
        alert("Error: failed to create new user.");
      }
    });
  },

  render: function () {
    return (
      <div>
        <SignUpForm errors={this.state.errors} onSubmitForm={this.submitData} onFormChange={this.props.onFormChange} shouldRedirect={this.props.shouldRedirect}/>
      </div>
    );
  }
});
