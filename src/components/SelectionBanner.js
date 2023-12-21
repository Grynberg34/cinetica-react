import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';
import "../scss/selection.scss";


function SelectionBanner(props) {

  var texto = props.texto;

  return (
    <div className='selection__banner'>
    
      <div className='selection__banner__img kenburns-bottom' style={{backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.7) 100%), url('https://cinetica.nyc3.digitaloceanspaces.com/Trabalhos/Cin%C3%A9tica/Imagens/${texto.imagem}')`}}></div>

      <Container fluid className='selection__banner__container'>
        <Row>
          <Col md={6}>
    
            <h2 className="selection__banner__date">{moment(texto.data).utcOffset('+000').format('D/M/Y')}</h2>
            <h1 className="selection__banner__title">{texto.titulo}</h1>
            <h1 className="selection__banner__film">{texto.filme}</h1>
            <h2 className="selection__banner__author">{texto.autores[0].nome} {texto.autores[1] !== undefined? <span>| {texto.autores[1].nome}</span>: null} {texto.autores[2] !== undefined? <span>| {texto.autores[2].nome}</span>: null} {texto.autores[3] !== undefined? <span>| {texto.autores[3].nome}</span>: null} </h2>
    
          </Col>
    
          <Col md={4}>
    
            <div className="selection__banner__words">
    
            { texto.categorias.map( (item, index) =>
    
              <Link key={item.id} className="selection__banner__words__categories" to={`/categorias/${item.categoria.toLowerCase()}/1`}>{item.categoria}</Link>
    
              )}
    
              { texto.tags.map( (item, index) =>
    
              <Link key={item.id} className="selection__banner__words__tag"  to={!item.tag.includes('20')?`/tags/${item.tag.toLowerCase()}/1`:`/anos/${item.tag.toLowerCase()}/1`}>{item.tag}</Link>
    
            )}
    
    
            </div>
    
          </Col>
    
          <Col md={2}>
            <Link className="selection__banner__link" to={`/texto/${texto.id}`}>Acessar</Link>
          </Col>
        </Row>
      </Container>
    
    </div>
  )




}

function mapStateToProps(state) {
  return {
    texto: state.texto,
  }
}

export default connect(
  mapStateToProps
)(SelectionBanner);
