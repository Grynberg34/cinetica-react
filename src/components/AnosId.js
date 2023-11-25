import { connect } from 'react-redux';
import { store } from '../store';
import { GetAno } from '../actions';
import { GetText } from '../actions';
import { Link, useParams, useNavigate } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';
import "../scss/anosId.scss";


function AnosId(props) {

  var { id } = useParams();

  var { page } = useParams();

  var ano = props.ano;

  var history = useNavigate();

  var texto = props.texto;

  function getTextBanner(id) {
    store.dispatch(GetText(id))
  }

  if (ano === null || ano.titulo.toLowerCase() !== id || page !== ano.page ) {
    store.dispatch(GetAno(id, page))

    return (
      <div>

      </div>
    )
  } else {

    if (texto === null || !ano.textos.find((texto__banner) => texto__banner.textoId === texto?.id)) {

      if (ano.textos[0]) {
        store.dispatch(GetText(ano.textos[0].Texto.id))
      }
      

      return (
        <div></div>
      )
    } else {
      return (
        <div className='ano'>
          <Header></Header>
  
          <div className='ano__banner' style={{backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.7) 100%), url('https://cinetica.nyc3.digitaloceanspaces.com/Trabalhos/Cin%C3%A9tica/Imagens/${texto.imagem}')`}}>
  
            <Container fluid>
              <Row>
                <Col md={6}>

                  <h2 className="ano__banner__date">{moment(texto.data).utcOffset('+000').format('D/M/Y')}</h2>
                  <h1 className="ano__banner__title">{texto.titulo}</h1>
                  <h1 className="ano__banner__film">{texto.filme}</h1>
                  <h2 className="ano__banner__author">{texto.autores[0].nome} {texto.autores[1] !== undefined? <span>| {texto.autores[1].nome}</span>: null} {texto.autores[2] !== undefined? <span>| {texto.autores[2].nome}</span>: null} {texto.autores[3] !== undefined? <span>| {texto.autores[3].nome}</span>: null} </h2>

                </Col>

                <Col md={4}>

                  <div className="ano__banner__words">

                  { texto.categorias.map( (item, index) =>

                    <Link key={item.id} className="ano__banner__words__categories" to={`/categorias/${item.categoria.toLowerCase()}/1`}>{item.categoria}</Link>

                    )}

                    { texto.tags.map( (item, index) =>

                    <Link key={item.id} className="ano__banner__words__tag"  to={!item.tag.includes('20')?`/tags/${item.tag.toLowerCase()}/1`:`/anos/${item.tag.toLowerCase()}/1`}>{item.tag}</Link>

                  )}


                  </div>

                </Col>

                <Col md={2}>
                  <Link className="ano__banner__link" to={`/texto/${texto.id}`}>Acessar</Link>
                </Col>
              </Row>
            </Container>
  
          </div>
  
          <div className='ano__content'>
            
            <div className='ano__content__header'>
              <Container fluid>
                <Row>
                  <Col md={1}>
                    <img onClick={() => history(-1)} className='ano__content__header__icon' src="/images/icons/previous.svg" alt="" />
                  </Col>
  
                  <Col md={8}>
                    <h2 className='ano__content__header__title'>{ano.titulo}</h2>
                  </Col>
                </Row>
              </Container>
  
            </div>
  
            <div className="ano__content__texts">
              <Container fluid>
                <Row>
                  { ano.textos.map( (text, index) =>
                    <Col key={text.Texto.id} md={3}>
                      <div onClick={()=> getTextBanner(text.Texto.id)} className='ano__content__texts__text'>
                        <div className='ano__content__texts__text__inner'>
    
                          <div className='ano__content__texts__text__inner__img' style={{backgroundImage: `url('https://cinetica.nyc3.digitaloceanspaces.com/Trabalhos/Cin%C3%A9tica/Imagens/${text.Texto.imagem}')`}}></div>
                          <Container fluid>
                            <Row>
                              <Col md={8}>
                                <Link className='ano__content__texts__text__inner__link' to="/">
                                  <div className="ano__content__texts__text__inner__info">
                                    <h2 className="ano__content__texts__text__inner__info__title"> {text.Texto.titulo.length > 25 ? <span>{text.Texto.titulo.substring(0, 25) + '...'}</span>: <span>{text.Texto.titulo}</span>}</h2>
                                    <h3 className='ano__content__texts__text__inner__info__film'>{text.Texto.filme}</h3>
                                  </div>
                                </Link>
                              </Col>
                              <Col md={4}>
                                <h4 className="ano__content__texts__text__inner__date">{moment(text.Texto.data).utcOffset('+000').format('D/M/Y')}</h4>
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

            {parseInt(ano.total_pages) > 1?
                <div className="ano__content__pages">
                <Container fluid>
                  <Row>
                    <Col md={2}>
                      {
                        parseInt(ano.page) - 1 > 0 ?
                        <div>
                          <Link to={`/anos/${id}/${(parseInt(page) -1)}`}><img  className='ano__content__pages__icon' src="/images/icons/previous.svg" alt="" /></Link>
                          <span className="ano__content__pages__number left">{(parseInt(page) -1)}</span>
                        </div>
                        :null
                      }
                    </Col>
                    
                    <Col md={8}>
                      <h1 className='ano__content__pages__text'>{page}<span className="ano__content__pages__text__sub">/{ano.total_pages}</span></h1>
                    </Col>
  
                    <Col md={2}>
                      {
                        parseInt(ano.page) < ano.total_pages ?
                        <div>
                          <span className="ano__content__pages__number right">{(parseInt(page) +1)}</span>
                          <Link to={`/anos/${id}/${(parseInt(page) +1)}`}><img className='ano__content__pages__icon next' src="/images/icons/previous.svg" alt="" /></Link>
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
    ano: state.ano,
    texto: state.texto,
  }
}

export default connect(
  mapStateToProps
)(AnosId);