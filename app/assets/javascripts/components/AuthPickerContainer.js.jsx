var AuthPickerContainer = React.createClass({
  propTypes: {
    authAction: React.PropTypes.string.isRequired
  },

  componentWillMount: function () {
    this.setState({
      formToShow: this.props.authAction
    });
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
