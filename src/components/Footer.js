import "../scss/footer.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";

function Footer() {

  return (
    <div className="footer">
      <Container fluid>
        <Row>
          <Col md={8} xs={8}>
            <div className="footer__left">
              <h1 className="footer__left__title"><Link className="footer__left__title__link" to="/">Sobre Nós</Link></h1>
              <h2 className="footer__left__info">contato@cinetica.com.br</h2>
            </div>
          </Col>

          <Col md={4} xs={4} className="footer__col">
            <div className="footer__right">
              <img className="footer__right__img" src="/images/footer/logo-rodape.svg" alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )

  
}

export default Footer;
