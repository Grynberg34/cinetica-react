import "../scss/header.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";

function Header() {

  return (
    <div id="header">

      <div className="header">
        <Container fluid>
            <Row>
              <Col md={2}>
                <img className='header__logo' src="/images/header/logo.svg" alt="" />
              </Col>

              <Col md={1}></Col>

              <Col md={6}>

                <div className="header__menu">

                  <Container fluid>
                    <Row>

                      <Col md={3}>
                        
                        <Link className="header__menu__link" to="/">Circuito</Link>

                      </Col>

                      <Col md={3}>
                        
                        <Link className="header__menu__link" to="/">Pauta</Link>

                      </Col>


                      <Col md={3}>
                        
                        <Link className="header__menu__link" to="/">Cobertura</Link>

                      </Col>

                      <Col md={3}>
                        
                        <Link className="header__menu__link" to="/">Biblioteca</Link>

                      </Col>

                    </Row>
                  
                </Container>

                </div>

                <div className="header__sub">

                  <Container fluid>
                    <Row>

                      <Col md={1}>

                        <Link to="/"><img className="header__sub__lens" src="/images/header/lupa.svg" alt="" /></Link>
                        
                      </Col>

                      <Col md={11}>

                        <Container fluid>
                          <Row>
                            <Col md={3}>
                              <Link className="header__sub__link" to="/">Categorias</Link>
                            </Col>

                            <Col md={3}>
                              <Link className="header__sub__link" to="/">Tags</Link>
                            </Col>

                            <Col md={3}>
                              <Link className="header__sub__link" to="/">Autores</Link>
                            </Col>

                            <Col md={3}>
                              <Link className="header__sub__link" to="/">Anos</Link>
                            </Col>
                          </Row>
                        </Container>

                      </Col>

                    </Row>
                  </Container>

                </div>


              </Col>

              <Col md={1}></Col>

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
            </Row>
          </Container>

    </div>

    </div>
  )

  
}

export default Header;
