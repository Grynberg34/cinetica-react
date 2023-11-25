import { connect } from 'react-redux';
import { store } from '../store';
import { GetTag } from '../actions';
import { GetText } from '../actions';
import { Link, useParams, useNavigate } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';
import "../scss/tagsId.scss";


function TagsIdId(props) {

  var { id } = useParams();

  var { page } = useParams();

  var history = useNavigate();

  var tag = props.tag;

  var texto = props.texto;

  function getTextBanner(id) {
    store.dispatch(GetText(id))
  }

  if (tag === null || tag.titulo.toLowerCase() !== id || page !== tag.page ) {
    store.dispatch(GetTag(id, page))

    return (
      <div>

      </div>
    )
  } else {

    if (texto === null || !tag.textos.find((texto__banner) => texto__banner.textoId === texto?.id)) {

      if (tag.textos[0]) {
        store.dispatch(GetText(tag.textos[0].Texto.id))
      }
      

      return (
        <div></div>
      )
    } else {
      return (
        <div className='tag'>
          <Header></Header>
  
          <div className='tag__banner' style={{backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.7) 100%), url('https://cinetica.nyc3.digitaloceanspaces.com/Trabalhos/Cin%C3%A9tica/Imagens/${texto.imagem}')`}}>
  
            <Container fluid>
              <Row>
                <Col md={6}>

                  <h2 className="tag__banner__date">{moment(texto.data).utcOffset('+000').format('D/M/Y')}</h2>
                  <h1 className="tag__banner__title">{texto.titulo}</h1>
                  <h1 className="tag__banner__film">{texto.filme}</h1>
                  <h2 className="tag__banner__author">{texto.autores[0].nome} {texto.autores[1] !== undefined? <span>| {texto.autores[1].nome}</span>: null} {texto.autores[2] !== undefined? <span>| {texto.autores[2].nome}</span>: null} {texto.autores[3] !== undefined? <span>| {texto.autores[3].nome}</span>: null} </h2>

                </Col>

                <Col md={4}>

                  <div className="tag__banner__words">

                  { texto.categorias.map( (item, index) =>
                  

                    <Link key={item.id} className="tag__banner__words__categories" to={`/categorias/${item.categoria.toLowerCase()}/1`}>{item.categoria}</Link>
                      
                    )}

                    { texto.tags.map( (item, index) =>

                    <Link key={item.id} className="tag__banner__words__tag"  to={!item.tag.includes('20')?`/tags/${item.tag.toLowerCase()}/1`:`/anos/${item.tag.toLowerCase()}/1`}>{item.tag}</Link>

                  )}


                  </div>

                </Col>

                <Col md={2}>
                  <Link className="tag__banner__link" to={`/texto/${texto.id}`}>Acessar</Link>
                </Col>
              </Row>
            </Container>
  
          </div>
  
          <div className='tag__content'>
            
            <div className='tag__content__header'>
              <Container fluid>
                <Row>
                  <Col md={1}>
                    <img onClick={() => history(-1)} className='tag__content__header__icon' src="/images/icons/previous.svg" alt="" />
                  </Col>
  
                  <Col md={8}>
                    <h2 className='tag__content__header__title'>{tag.titulo}</h2>
                  </Col>
                </Row>
              </Container>
  
            </div>
  
            <div className="tag__content__texts">
              <Container fluid>
                <Row>
                  { tag.textos.map( (text, index) =>
                    <Col key={text.Texto.id} md={3}>
                      <div onClick={()=> getTextBanner(text.Texto.id)} className='tag__content__texts__text'>
                        <div className='tag__content__texts__text__inner'>
    
                          <div className='tag__content__texts__text__inner__img' style={{backgroundImage: `url('https://cinetica.nyc3.digitaloceanspaces.com/Trabalhos/Cin%C3%A9tica/Imagens/${text.Texto.imagem}')`}}></div>
                          <Container fluid>
                            <Row>
                              <Col md={8}>
                                <Link className='tag__content__texts__text__inner__link' to="/">
                                  <div className="tag__content__texts__text__inner__info">
                                    <h2 className="tag__content__texts__text__inner__info__title"> {text.Texto.titulo.length > 25 ? <span>{text.Texto.titulo.substring(0, 25) + '...'}</span>: <span>{text.Texto.titulo}</span>}</h2>
                                    <h3 className='tag__content__texts__text__inner__info__film'>{text.Texto.filme}</h3>
                                  </div>
                                </Link>
                              </Col>
                              <Col md={4}>
                                <h4 className="tag__content__texts__text__inner__date">{moment(text.Texto.data).utcOffset('+000').format('D/M/Y')}</h4>
                              </Col>
                            </Row>
                          </Container>
                                
                        </div>
                      </div>
                      
                    </Col>
                  )}
                </Row>
              </Container> 
            </div>

              {parseInt(tag.total_pages) > 1?
                <div className="tag__content__pages">
                  <Container fluid>
                    <Row>
                      <Col md={2}>
                        {
                          parseInt(tag.page) - 1 > 0 ?
                          <div>
                            <Link to={`/tags/${id}/${(parseInt(page) -1)}`}><img  className='tag__content__pages__icon' src="/images/icons/previous.svg" alt="" /></Link>
                            <span className="tag__content__pages__number left">{(parseInt(page) -1)}</span>
                          </div>
                          :null
                        }
                      </Col>
                      
                      <Col md={8}>
                        <h1 className='tag__content__pages__text'>{page}<span className="tag__content__pages__text__sub">/{tag.total_pages}</span></h1>
                      </Col>
    
                      <Col md={2}>
                        {
                          parseInt(tag.page) < tag.total_pages ?
                          <div>
                            <span className="tag__content__pages__number right">{(parseInt(page) +1)}</span>
                            <Link to={`/tags/${id}/${(parseInt(page) +1)}`}><img className='tag__content__pages__icon next' src="/images/icons/previous.svg" alt="" /></Link>
                          </div>
                          :null
                        }
                      </Col>
    
                    </Row>
                  </Container>
                </div>
                :null            

              }
  
          </div>
  
          <Footer></Footer>
        </div>
      )
    }

  }



}

function mapStateToProps(state) {
  return {
    tag: state.tag,
    texto: state.texto,
  }
}

export default connect(
  mapStateToProps
)(TagsIdId);
