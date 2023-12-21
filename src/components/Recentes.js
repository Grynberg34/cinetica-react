import { connect } from 'react-redux';
import { store } from '../store';
import { GetRecentTexts } from '../actions';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import moment from 'moment';
import "../scss/recentes.scss";

function Recentes(props) {

  var recentes = props.recentes;

  if (recentes === null) {
    store.dispatch(GetRecentTexts())

    return (
      <div></div>
    )
  } else {

    if (window.innerWidth < 768) {
      return (
        <div className='recentes'>
          <h1 className='recentes__title'>Recentes</h1>

          <Carousel id="recentes" interval={null} autoPlay={false} indicators={false}>
            { recentes.map( (text, index) =>

              <Carousel.Item key={text.id} className="banner">
                <div className='recentes__text'>
                  <div className='recentes__text__inner'>

                    <Link to={`/texto/${text.id}`}><div className='recentes__text__inner__img' style={{backgroundImage: `url('https://cinetica.nyc3.digitaloceanspaces.com/Trabalhos/Cin%C3%A9tica/Imagens/${text.imagem}')`}}></div></Link>
                    <Container fluid className='recentes__text__container'>
                      <Row>
                        <Col md={8} xs={8}>
                          <Link className='recentes__text__inner__link' to={`/texto/${text.id}`}>
                            <div className="recentes__text__inner__info">
                              <h2 className="recentes__text__inner__info__title"> {text.titulo.length > 30 ? <span>{text.titulo.substring(0, 30) + '...'}</span>: <span>{text.titulo}</span>}</h2>
                              <h3 className='recentes__text__inner__info__film'>{text.filme}</h3>
                            </div>
                          </Link>
                        </Col>
                        <Col md={4} xs={4}>
                          <h4 className="recentes__text__inner__date">{moment(text.data).utcOffset('+000').format('D/M/Y')}</h4>
                        </Col>
                      </Row>
                    </Container>

                    <div className="recentes__text__inner__words">
                    
                      { text.categorias.map( (item, index) =>

                        <Link key={item.id} className="recentes__text__inner__words__categories" to={`/categorias/${item.categoria.toLowerCase()}/1`}>{item.categoria}</Link>

                      )}

                      { text.tags.map( (item, index) =>

                        <Link key={item.id} className="recentes__text__inner__words__tag" to={!item.tag.includes('20')?`/tags/${item.tag.toLowerCase()}/1`:`/anos/${item.tag.toLowerCase()}/1`}>{item.tag}</Link>

                      )}

                    
                    </div>
                          
                  </div>
                </div>
              </Carousel.Item>
            )}
    
        </Carousel>
        </div>
      )

    } else {
      return (
        <div className='recentes'>
          <h1 className='recentes__title'>Recentes</h1>
  
          <Container fluid className='recentes__container'>
            <Row>
            { recentes.map( (text, index) =>
              <Col key={text.id} md={4}>
  
                <div className='recentes__text'>
                  <div className='recentes__text__inner'>
  
                    <Link className='recentes__text__link' to={`/texto/${text.id}`}><div className='recentes__text__inner__img' style={{backgroundImage: `url('https://cinetica.nyc3.digitaloceanspaces.com/Trabalhos/Cin%C3%A9tica/Imagens/${text.imagem}')`}}></div></Link>
                    <Container fluid>
                      <Row>
                        <Col md={8}>
                          <Link className='recentes__text__inner__link' to={`/texto/${text.id}`}>
                            <div className="recentes__text__inner__info">
                              <h2 className="recentes__text__inner__info__title"> {text.titulo.length > 30 ? <span>{text.titulo.substring(0, 30) + '...'}</span>: <span>{text.titulo}</span>}</h2>
                              <h3 className='recentes__text__inner__info__film'>{text.filme}</h3>
                            </div>
                          </Link>
                        </Col>
                        <Col md={4}>
                          <h4 className="recentes__text__inner__date">{moment(text.data).utcOffset('+000').format('D/M/Y')}</h4>
                        </Col>
                      </Row>
                    </Container>
  
                    <div className="recentes__text__inner__words">
                    
                      { text.categorias.map( (item, index) =>
  
                        <Link key={item.id} className="recentes__text__inner__words__categories" to={`/categorias/${item.categoria.toLowerCase()}/1`}>{item.categoria}</Link>
  
                      )}
  
                      { text.tags.map( (item, index) =>
  
                        <Link key={item.id} className="recentes__text__inner__words__tag" to={!item.tag.includes('20')?`/tags/${item.tag.toLowerCase()}/1`:`/anos/${item.tag.toLowerCase()}/1`}>{item.tag}</Link>
  
                      )}
  
                    
                    </div>
                          
                  </div>
                </div>
                
  
  
              </Col>
            )}
            </Row>
          </Container>          
  
        </div>
      )
    }


      

  }


  
}

function mapStateToProps(state) {
  return {
    recentes: state.recentes
  }
}

export default connect(
  mapStateToProps
)(Recentes);
