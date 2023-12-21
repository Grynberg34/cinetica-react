import { connect } from 'react-redux';
import { store } from '../store';
import "../scss/header.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HeaderMenu from './HeaderMenu';
import { CheckMobile } from '../actions';
import { OpenCloseMenu } from '../actions';
import { Link } from "react-router-dom";

function Header(props) {

  var open = props.open;

  var mobile = props.mobile

  if (window.innerWidth < 768) {
    store.dispatch(CheckMobile(true))
  }

  function openCloseMenu() {
    open = !open;

    store.dispatch(OpenCloseMenu(open))
  }

  function closeMenu() {
    if (window.innerWidth < 767 && open === true) {
      open = !open;

      store.dispatch(OpenCloseMenu(open))
    }
  }

  return (
    <div id="header">

      <div className="header">
        <Container fluid>
            <Row>
              <Col md={2} xs={4}>
                <Link onClick={closeMenu} to="/"><img className='header__logo' src="/images/header/logo.svg" alt="" /></Link>
              </Col>

              {
                open === false ?
                <Col xs={4} md={1}></Col>
                :<Col xs={5}>
  
                  <div className="header__social-mobile">
                    <a target="_blank" rel="noreferrer" href="/"><img className="header__social-mobile__img" src="/images/header/instagram.svg" alt="" /></a>
                    <a target="_blank" rel="noreferrer" href="/"><img className="header__social-mobile__img" src="/images/header/facebook.svg" alt="" /></a>
                    <a target="_blank" rel="noreferrer" href="/"><img className="header__social-mobile__img" src="/images/header/twitter.svg" alt="" /></a>
                  </div>
  
                </Col>
              }

              {
                open === false && mobile === true?
                <Col xs={4}>
                  <img onClick={openCloseMenu} className="header__mobile" src="/images/header/menu.svg" alt="" />
                </Col>
                :null
              }

              {
                open === true && mobile === true?
                <Col xs={3}>
                  <Link to="/pesquisar">
                    <img onClick={closeMenu} className="header__search" src="/images/header/lupa-mobile.svg" alt="" />
                  </Link>
                </Col>
                :null
              }

              {
                mobile === false?
                <Col md={6}>

                  <HeaderMenu></HeaderMenu>

                </Col>
                :null
              }

              {
                mobile === false?
                <Col md={1}></Col>
                :null
              }

              {
                mobile === false?
                <Col md={2}>

                  <div className="header__social">
                  <Container fluid>
                    <Row>
                      <Col md={4}>
                        <a target="_blank" rel="noreferrer" href="/"><img className="header__social__img" src="/images/header/instagram.svg" alt="" /></a>
                      </Col>

                      <Col md={4}>
                        <a target="_blank" rel="noreferrer" href="/"><img className="header__social__img" src="/images/header/facebook.svg" alt="" /></a>
                      </Col>

                      <Col md={4}>
                        <a target="_blank" rel="noreferrer" href="/"><img className="header__social__img" src="/images/header/twitter.svg" alt="" /></a>
                      </Col>
                    </Row>
                  </Container>
                  </div>

                </Col>
                :null
              }


            </Row>
          </Container>

          
          {
            (mobile === true && open === true) ?
            <div>
              <HeaderMenu></HeaderMenu>
              <img onClick={openCloseMenu} className='header__arrow' src="/images/header/seta.svg" alt="" />
            </div>
            :null
          }

          

      </div>

    </div>
  )

  
}

function mapStateToProps(state) {
  return {
    open: state.open,
    mobile: state.mobile
  }
}

export default connect(
  mapStateToProps
)(Header);
