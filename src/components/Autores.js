import { connect } from 'react-redux';
import { store } from '../store';
import { GetAuthors } from '../actions';
import { Link } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../scss/autores.scss";
import "../scss/loader.scss";


function Autores(props) {

  var autores = props.autores;

  if (autores === null) {
    store.dispatch(GetAuthors())

    return (
      <div id='loader'>
        <Header></Header>

        <div class="spinner"></div>
      </div>
    )
  } else if (autores !== null) {
    return (
      <div id='autores' className='autores'>
        <Header></Header>
  
        <div className='autores__content'>
          <h2 className='autores__content__title'>Autores</h2>
  
          <div className='autores__content__categories'>
            <Container fluid>
              <Row>
              { autores.map( (autor, index) =>
  
                <Col key={index} md={4}>
                  <div className='autores__content__autor'>
                    <Link className='autores__content__autor__title'  to={`/autores/${autor.nome.toLowerCase()}/1`}>{autor.nome}</Link>
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
    autores: state.autores
  }
}

export default connect(
  mapStateToProps
)(Autores);
