import React from 'react';
import { MdClose as CloseIcon } from 'react-icons/lib/md';
import './JunggaeTradeModal.scss';

const JunggaeTradeModal = ({ onClose }) => {
  return (
    <div className="JunggaeTradeModal">
      <div className="dark" onClick={onClose} />
      <div className="modal">
        <div className="head">
          <h3>등기신청으로 이동하시겠습니까?</h3>
          <div className="exit" onClick={onClose}>
            <CloseIcon />
          </div>
        </div>
        <p>잔금은 받으셨나요</p>
        <p>인감증명은 받으셨나요</p>
        <p>대리계약은 아니었나요</p>
      </div>
    </div>
  );
};

export default JunggaeTradeModal;
