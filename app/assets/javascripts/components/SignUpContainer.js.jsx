var SignUpContainer = React.createClass({
  propTypes: {
    onFormChange: React.PropTypes.func.isRequired,
    shouldRedirect: React.PropTypes.bool.isRequired
  },

  getInitialState: function () {
    return { errors: {} };
  },

  submitData: function (data) {
    alert("entered");
    console.log(data);
    var modified_data = {
      "user[email]": data.email,
      "user[password]": data.password,
      "user[password_confirmation]": data.password_confirmation
    };
    console.log(modified_data);
    $.ajax({
      type: "POST",
      url: "/",
      data: modified_data,
      success: function(msg) {
        console.log(msg);
      },
      error: function() {
        alert("failure");
      }
    });
  },

  render: function () {
    return (
      <div>
        <SignUpForm errors={this.state.errors} onSubmit={this.submitData} onFormChange={this.props.onFormChange} shouldRedirect={this.props.shouldRedirect}/>
        <div id="response">
        </div>
      </div>
    );
  }
});
