import React from 'react';
import logo from 'static/images/logo-footer.png';
import './Footer.scss';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div className="company">
            <img src={logo} alt="logo" />
          </div>

          <nav>
            <div>
              <ul>
                <li>서비스</li>
                <li>부동산검색</li>
                <li>평판열람</li>
                <li>리뷰관리</li>
              </ul>
            </div>
            <div>
              <ul>
                <li>고객센터</li>
                <li>자주묻는질문</li>
                <li>공지사항</li>
                <li>개인정보관리</li>
              </ul>
            </div>
            <div>
              <ul>
                <li>마이페이지</li>
                <li>메시지함</li>
                <li>거래확인</li>
                <li>평점/리뷰</li>
              </ul>
            </div>
          </nav>
        </div>
        <hr />

        <div className="copyright">
          Copyright &copy; BLOCKON. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
