import React, { Component } from 'react';
import {
  TiStarFullOutline as StarIcon,
  TiStarOutline as StarOutlineIcon,
  TiStarHalfOutline as StarHalfOutlineIcon
} from 'react-icons/lib/ti';
import JunggaeImage from 'static/images/junggae.png';
import StarRatingComponent from 'react-star-rating-component';
import './JunggaeReveiw.scss';

class JunggaeReview extends Component {
  state = {
    rating: 3.5
  };

  getReviews = () => {
    const { rating } = this.state;
    const reviews = [];

    const review = (
      <div className="reviews">
        <div className="point">
          <h2>3.5</h2>
          <div style={{ fontSize: 24 }}>
            <StarRatingComponent
              starColor="#ffb400"
              emptyStarColor="#ffb400"
              value={rating}
              renderStarIcon={(index, value) => {
                return index <= value ? <StarIcon /> : <StarOutlineIcon />;
              }}
              renderStarIconHalf={() => {
                return <StarHalfOutlineIcon />;
              }}
            />
          </div>
          <p>2018. 08. 12.</p>
          <p>김준*</p>
        </div>

        <div className="review">
          <p>
            신뢰 : 믿을만해요 | 업무: 메시지전달이 빨라요 | 친절: 남자분
            불친절해요
          </p>
          <div className="content">
            거래과정 변경시 메시지 전달이 매우 빨라서 좋았습니다.
            <br />
            다만 공인중개사분이 불친절해서 질문을 하고싶어도 못했던 적이
            있었습니다.
          </div>
          <div className="answer">
            <div className="title">
              <div className="l" />
              <span>답 변</span>
            </div>
            <div className="content">
              안녕하세요. 빠른업무처리로 답답하시지 않으셨다니 다행이네요. 제가
              요즘 일이 많아서 약간 불친절했던 점이 불편하셨다면 죄송합니다.
              다음에 또 준영공인중개소를 들러주시면 친절하게 안내드리겠습니다.
              감사합니다.
            </div>
          </div>
        </div>
      </div>
    );

    for (let i = 0; i < 7; i++) {
      reviews.push(review);
    }

    return reviews;
  };

  render() {
    const { rating } = this.state;

    return (
      <div className="JunggaeReview">
        <h1>나의 평점</h1>
        <div className="point-average">
          <div className="image">
            <img src={JunggaeImage} alt="junggae" />
          </div>
          <div>
            <h2>준영공인중개사무소</h2>
            <div className="stars">
              <StarRatingComponent
                starColor="#ffb400"
                emptyStarColor="#ffb400"
                value={rating}
                renderStarIcon={(index, value) => {
                  return index <= value ? <StarIcon /> : <StarOutlineIcon />;
                }}
                renderStarIconHalf={() => {
                  return <StarHalfOutlineIcon />;
                }}
              />
              <div className="point">3.5 / 5.0</div>
            </div>
            <div>
              신뢰 <span>믿을만해요</span> 업무 <span>빠른업무처리</span> 친절
              <span>약간불친절</span>
            </div>
          </div>
        </div>

        <h1>리뷰 (30건)</h1>
        {this.getReviews()}
        <ul className="pagination">
          <li className="active">1</li>
          <li>2</li>
        </ul>
      </div>
    );
  }
}

export default JunggaeReview;
