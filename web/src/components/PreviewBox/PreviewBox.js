import React, { Component } from 'react';
import CloseIcon from 'react-icons/lib/md/close';
import './PreviewBox.scss';

class PreviewBox extends Component {
  render() {
    const { onClose } = this.props;

    return (
      <div className="PreviewBox">
        <div className="dark" onClick={onClose} />
        <div className="modal">
          <div className="head">
            <h3>부동산매매계약서</h3>
            <div className="exit" onClick={onClose}>
              <CloseIcon />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PreviewBox;
