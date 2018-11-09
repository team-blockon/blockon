import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import Logo from 'static/images/logo-header.png';
import LogoBlack from 'static/images/logo-header-black.png';
import './Header.scss';

class Header extends Component {
  state = {
    scrolled: false // 스크롤 여부
  };

  handleScroll = () => {
    const header = document.querySelector('header');

    if (window.scrollY > header.clientHeight) {
      // 헤더 높이보다 더 스크롤이 되었을 경우
      this.setState({
        scrolled: true
      });
    } else {
      this.setState({
        scrolled: false
      });
    }
  };

  componentDidMount() {
    // 스크롤 이벤트 리스너 설정
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    // 스크롤 이벤트 리스너 해제
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const { scrolled } = this.state;
    const { navItem, location } = this.props;

    return (
      <header
        className={classNames({
          /* / 라우트이면서 스크롤이 되지 않은 경우에만 landing 클래스 추가 */
          landing: location.pathname === '/' && !scrolled
        })}
      >
        <div className="menu">
          <Link to="/">
            <img
              src={location.pathname === '/' && !scrolled ? Logo : LogoBlack}
              className="logo"
              alt="logo"
            />
          </Link>
          {navItem}
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
