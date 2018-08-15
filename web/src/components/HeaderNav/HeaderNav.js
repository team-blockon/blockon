import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './HeaderNav.scss';
/*import jQuery from './jquery.min';
window.$ = window.jQuery = jQuery;

(function($) {
  $(function () {   //when DOM ready

  });

})(jQuery);*/
/*document.getElementById('#nav-toggle').addEventListener('click', function() {
  this.classList.toggle('active');
});*/

export const HeaderNavItem = ({ children, selected, item, onSelect, to }) => {
  return (
    <Fragment>
      <li
        className={classNames({
          active: selected === item
        })}
        onClick={() => onSelect(item)}
      >
        <Link to={to}>{children}</Link>
      </li>
    </Fragment>
  );
};

/**
 * 헤더 아이템 컴포넌트
 * @param activeItem 현재 선택된 아이템
 * @param onSelect 아이템 선택 함수
 */
class HeaderNav extends Component {
  state = {
    toggled: false
  };

  //nav 클릭시 토클 변수를 추가해서 변수에 따라 메뉴가 나오고 사라질 수 있게 한다.
  nav_click = () => {
    this.setState({
      toggled: !this.state.toggled
    });
  };

  render() {
    const { activeItem, onSelect, userButtons } = this.props;
    const { toggled } = this.state;

    // Toggle open and close nav styles on click
    /*$('#nav-toggle').click(function() {
      $('nav ul').slideToggle();
    });*/

    return (
      <nav className="HeaderNav">
        <div className="nav-mobile">
          <a
            id="nav-toggle"
            href="#!"
            onClick={this.nav_click}
            className={toggled && 'active'}
          >
            <span />
          </a>
        </div>

        <ul className={toggled && 'active'}>
          <HeaderNavItem
            item="about"
            selected={activeItem}
            onSelect={onSelect}
            to="/"
          >
            소개
          </HeaderNavItem>
          <HeaderNavItem
            item="message"
            selected={activeItem}
            onSelect={onSelect}
            to="/search"
          >
            부동산 검색
          </HeaderNavItem>
          <HeaderNavItem
            item="help"
            selected={activeItem}
            onSelect={onSelect}
            to="/help"
          >
            고객센터
          </HeaderNavItem>
          {userButtons}
        </ul>
      </nav>
    );
  }
}

export default HeaderNav;
