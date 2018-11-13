import React from 'react';
import classNames from 'classnames';
import PrevIcon from 'static/images/icon/pagination-prev.svg';
import NextIcon from 'static/images/icon/pagination-next.svg';
import './Pagination.scss';

const getPageItems = (numberOfPage, changePage, currentPage) => {
  const pageItems = [];
  for (let i = 1; i <= numberOfPage; i++) {
    pageItems.push(
      <li
        className={classNames({ active: currentPage === i })}
        onClick={() => {
          changePage(i);
        }}
        key={i}
      >
        {i}
      </li>
    );
  }
  return pageItems;
};

const Pagination = ({ listLength, changePage, currentPage }) => {
  const numberOfPage = Math.ceil(listLength / 9);
  return (
    <div className="Pagination">
      <img src={PrevIcon} alt="prev" />
      <ul>{getPageItems(numberOfPage, changePage, currentPage)}</ul>
      <img src={NextIcon} alt="next" />
    </div>
  );
};

export default Pagination;
