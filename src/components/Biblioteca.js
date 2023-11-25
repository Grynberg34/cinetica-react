import { connect } from 'react-redux';
import { store } from '../store';
import { GetBiblioteca } from '../actions';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../scss/biblioteca.scss";

function Biblioteca(props) {

  var biblioteca = props.biblioteca;

  if (biblioteca === null) {
    store.dispatch(GetBiblioteca())

    return (
      <div></div>
    )
  } else {

    return (
      <div className='biblioteca' id='biblioteca'>
        <h1 className='biblioteca__title'>Biblioteca</h1>

        <div className='biblioteca__categorias'>

          <Container fluid className='biblioteca__container'>

            <Row>

              { biblioteca.map( (item, index) =>

                <Col md={6} className='biblioteca__col' key={item.categoria}>
                  <Link to={`/categorias/${item.categoria}/1`}>
                    <div className='biblioteca__categorias__categoria' style={{backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.8) 100%), url('https://cinetica.nyc3.digitaloceanspaces.com/Trabalhos/Cin%C3%A9tica/Imagens/${item.imagem}')`}}>
                      <h1 className='biblioteca__categorias__categoria__title'>{item.categoria}</h1>
                    </div>
                  </Link>
                </Col>

              )}

            </Row>

          </Container>

        </div>
       
      </div>
    )

  }
  
}

function mapStateToProps(state) {
  return {
    biblioteca: state.biblioteca
  }
}

export default connect(
  mapStateToProps
)(Biblioteca);
