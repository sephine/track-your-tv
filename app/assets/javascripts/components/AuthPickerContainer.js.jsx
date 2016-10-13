var AuthPickerContainer = React.createClass({


  getInitialState: function () {
    return {
      fromToShow: ""
    };
  },

  componentWillReceiveProps: function (nextProps) {
    this.setState({
      formToShow: nextProps.authAction
    });
  },

  changeFormToShow: function (newForm) {
    this.setState({
      formToShow: newForm
    });
  },

  render: function () {
    return (
      <AuthPicker formToShow={this.state.formToShow} onFormChange={this.changeFormToShow} />
    );
  }
});
