import React from 'react';
import classNames from 'classnames';
import { Button } from 'antd';
import './GoodsList.scss';

const GoodsList = ({ activeItem, handleClick }) => {
  const items = [
    {
      duration: '2주',
      comment: '14일',
      original: '12,600원',
      discount: '4,900원'
    },
    {
      duration: '10일',
      comment: '10일',
      original: '9,000원',
      discount: '3,900원'
    },
    {
      duration: '7일',
      comment: '7일',
      original: '6,300원',
      discount: '2,900원'
    },
    {
      duration: '3일',
      comment: '3일',
      original: '2,700원',
      discount: '1,900원'
    },
    {
      duration: '1일',
      comment: '24시간',
      discount: '900원'
    }
  ];

  return items.map((item, index) => {
    return (
      <div
        className={classNames('item', { active: activeItem === index })}
        key={index}
        onClick={() => {
          handleClick(index);
        }}
      >
        <div className="left">
          <h2>{item.duration} 이용권</h2>
          <p>{item.comment}간 편하게 이용하실 수 있습니다.</p>
        </div>
        <div className="right">
          <div className="price">
            <span className="original">{item.original}</span>
            <span className="discount">{item.discount}</span>
          </div>
          <div>
            <Button type="primary">선택</Button>
          </div>
        </div>
      </div>
    );
  });
};

export default GoodsList;
