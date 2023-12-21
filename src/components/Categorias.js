import { connect } from 'react-redux';
import { store } from '../store';
import { GetCategories } from '../actions';
import { Link } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../scss/categorias.scss";
import "../scss/loader.scss";


function Categorias(props) {

  var categorias = props.categorias;

  if (categorias === null) {
    store.dispatch(GetCategories())

    return (
      <div id='loader'>
        <Header></Header>

        <div className="spinner"></div>
      </div>
    )
  } else if (categorias !== null) {
    return (
      <div id='categorias' className='categorias'>
        <Header></Header>
  
        <div className='categorias__content'>
          <h2 className='categorias__content__title'>Categorias</h2>
  
          <div className='categorias__content__categories'>
            <Container fluid>
              <Row>
              { categorias.map( (categoria, index) =>
  
                <Col key={index} md={4}>
                  <div className='categorias__content__categoria'>
                    <div className='categorias__content__categoria__img' style={{backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.6) 100%), url('https://cinetica.nyc3.digitaloceanspaces.com/Trabalhos/Cin%C3%A9tica/Imagens/${categoria.imagem}')`}}></div>
                    <Link className='categorias__content__categoria__title'  to={`/categorias/${categoria.categoria.toLowerCase()}/1`}>{categoria.categoria}</Link>
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
    categorias: state.categorias
  }
}

export default connect(
  mapStateToProps
)(Categorias);
