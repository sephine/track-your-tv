var AccountContainer = React.createClass({
  propTypes: {
    currentUser: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return { formToShow: "" };
  },

  showFormType: function (newFormType) {
    this.setState({ formToShow: newFormType });
    this.showModal();
  },

  showModal: function () {
    $('#modalAccount').modal('show');
  },

  cancelAccount: function () {
    var cancel = confirm("Are you sure you want to cancel your account?");
    if (cancel) {
      $.ajax({
        type: "DELETE",
        url: "/sign_up",
        headers: {
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(msg) {
          console.log(msg);
        }.bind(this),
        error: function() {
          alert("Error: failed to cancel account.");
        }
      });
    }
  },

  render: function () {
    return (
      <div>
        <Account currentUser={this.props.currentUser} onShowForm={this.showFormType} onCancelClicked={this.cancelAccount} />
        <UpdateUserContainer currentUser={this.props.currentUser} formToShow={this.state.formToShow} />
      </div>
    );
  }
});
