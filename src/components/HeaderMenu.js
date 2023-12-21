import { connect } from 'react-redux';
import { store } from '../store';
import "../scss/header.scss";
import { OpenCloseMenu } from '../actions';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { NavLink, Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

function HeaderMenu(props) {

  var open = props.open;

  
  function openCloseMenu() {
    if (window.innerWidth < 767 && open === true) {
      open = !open;

      store.dispatch(OpenCloseMenu(open))
    }
  }


  return (
    <div>

      <div className="header__menu">

        <Container fluid>
          <Row>

            <Col md={3} xs={3}>
              
              <NavLink onClick={openCloseMenu}  className="header__menu__link" to="/categorias/circuito/1">Circuito</NavLink>

            </Col>

            <Col md={3} xs={3}>
              
              <NavLink onClick={openCloseMenu} className="header__menu__link" to="/categorias/pauta/1">Pauta</NavLink>

            </Col>


            <Col md={3} xs={3}>
              
              <NavLink onClick={openCloseMenu} className="header__menu__link" to="/categorias/cobertura/1">Cobertura</NavLink>

            </Col>

            <Col md={3} xs={3}>
              
              <HashLink onClick={openCloseMenu} className="header__menu__link" to="/#biblioteca">Biblioteca</HashLink>

            </Col>

          </Row>

        </Container>

      </div>

      <div className="header__sub">

        <Container fluid>
          <Row>

            <Col md={1}>

              <Link to="/pesquisar"><img className="header__sub__lens" src="/images/header/lupa.svg" alt="" /></Link>
              
            </Col>

            <Col md={11} xs={12}>

              <Container fluid className='header__sub__container'>
                <Row>
                  <Col md={3} xs={3}>
                    <NavLink onClick={openCloseMenu} className="header__sub__link" to="/categorias">Categorias</NavLink>
                  </Col>

                  <Col md={3} xs={3}>
                    <NavLink onClick={openCloseMenu} className="header__sub__link" to="/tags">Tags</NavLink>
                  </Col>

                  <Col md={3} xs={3}>
                    <NavLink onClick={openCloseMenu} className="header__sub__link" to="/autores">Autores</NavLink>
                  </Col>

                  <Col md={3} xs={3}>
                    <NavLink onClick={openCloseMenu} className="header__sub__link" to="/anos">Por ano</NavLink>
                  </Col>
                </Row>
              </Container>

            </Col>

          </Row>
        </Container>

      </div>

    </div>
  )

  
}

function mapStateToProps(state) {
  return {
    open: state.open,
    mobile: state.mobile,
  }
}

export default connect(
  mapStateToProps
)(HeaderMenu);
