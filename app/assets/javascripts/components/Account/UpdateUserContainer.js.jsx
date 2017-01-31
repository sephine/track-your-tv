var UpdateUserContainer = React.createClass({
  propTypes: {
    currentUser: React.PropTypes.object.isRequired,
    formToShow: React.PropTypes.string.isRequired
  },

  getInitialState: function () {
    return { errors: {} };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({ errors: {} });
  },

  submitData: function (data) {
    var modified_data = {};
    if (data.hasOwnProperty('name')) {
      modified_data["user[name]"] = data.name;
    }
    if (data.hasOwnProperty('email')) {
      modified_data["user[email]"] = data.email;
    }
    if (data.hasOwnProperty('password')) {
      modified_data["user[password]"] = data.password;
      modified_data["user[password_confirmation]"] = data.password_confirmation;
    }
    modified_data["user[current_password]"] = data.current_password;

    $.ajax({
      type: "PUT",
      url: "/sign_up",
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      },
      data: modified_data,
      success: function(msg) {
        this.setState({errors: msg});
      }.bind(this),
      error: function() {
        alert("Error: failed update account.");
      }
    });
  },

  render: function () {
    return (
      <div>
        <UpdateUser formToShow={this.props.formToShow} errors={this.state.errors} currentUser={this.props.currentUser} onSubmitForm={this.submitData} />
      </div>
    );
  }
});
