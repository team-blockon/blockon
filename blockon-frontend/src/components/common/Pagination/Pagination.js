import React from 'react';
import PrevIcon from 'static/images/icon/pagination-prev.svg';
import NextIcon from 'static/images/icon/pagination-next.svg';
import './Pagination.scss';

const Pagination = () => {
  return (
    <div className="Pagination">
      <img src={PrevIcon} alt="prev" />
      <ul>
        <li className="active">1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </ul>
      <img src={NextIcon} alt="next" />
    </div>
  );
};

export default Pagination;
