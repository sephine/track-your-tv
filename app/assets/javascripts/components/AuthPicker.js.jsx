var AuthPicker = React.createClass({


  render: function () {
    if (true) {
      return (
        <div>
        <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#modalSignUp">
          Launch demo modal
        </button>
        <div className="modal" id="modalSignUp" data-backdrop="static" data-keyboard={false}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title">Sign Up</h4>
              </div>
              <div className="modal-body">
                <h1>Hi!</h1>
              </div>
            </div>
          </div>
        </div>
        </div>
      );
    } else {

    }
  }
});
