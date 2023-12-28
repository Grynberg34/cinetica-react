import { connect } from 'react-redux';
import { store } from '../store';
import { GetYears } from '../actions';
import { Link } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../scss/anos.scss";
import "../scss/loader.scss";


function Anos(props) {

  var anos = props.anos;

  if (anos === null) {
    store.dispatch(GetYears())

    return (
      <div id='loader'>
        <Header></Header>

        <div className="spinner"></div>
      </div>
    )
  } else if (anos !== null) {
    return (
      <div id='anos' className='anos'>
        <Header></Header>

        <div className='anos__content'>
          <h2 className='anos__content__title'>Por ano</h2>
  
          <div>
            <Container fluid>
              <Row>
              { anos.map( (ano, index) =>
  
                <Col key={index} md={4} xs={6}>
                  <div className='anos__content__ano'>
                  <div className='anos__content__ano__img' style={{backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.6) 100%), url('https://cinetica.nyc3.digitaloceanspaces.com/Trabalhos/Cin%C3%A9tica/Imagens/${ano.imagem}')`}}></div>
                    <Link className='anos__content__ano__title'  to={`/anos/${ano.numero}/1`}>{ano.numero}</Link>
                  </div>
                </Col>
              )}
              </Row>
            </Container>
          </div>
  
        </div>

        <Footer></Footer>
  
      </div>
    )
  }
  
}

function mapStateToProps(state) {
  return {
    anos: state.anos
  }
}

export default connect(
  mapStateToProps
)(Anos);
