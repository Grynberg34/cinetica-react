import { connect } from 'react-redux';
import { store } from '../store';
import { GetTag } from '../actions';
import { GetText } from '../actions';
import { OpenCloseTagsMobile } from '../actions';
import { Link, useParams, useNavigate } from "react-router-dom";
import Header from './Header';
import SelectionBanner from './SelectionBanner';
import Footer from './Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';
import "../scss/selection.scss";
import "../scss/loader.scss";

function TagsIdId(props) {

  var { id } = useParams();

  var { page } = useParams();

  var history = useNavigate();

  var tag = props.tag;

  var tags_menu = props.tags_menu;

  var texto = props.texto;

  function getTextBanner(id) {
    store.dispatch(GetText(id))
  }

  function setMenu(value) {
    store.dispatch(OpenCloseTagsMobile(value))
  }

  if (tag === null || tag.titulo.toLowerCase() !== id || page !== tag.page ) {
    store.dispatch(GetTag(id, page))

    return (
      <div id='loader'>
        <Header></Header>

        <div className="spinner"></div>
      </div>
    )
  } else {

    if (texto === null || !tag.textos.find((texto__banner) => texto__banner.textoId === texto?.id)) {

      if (tag.textos[0]) {
        store.dispatch(GetText(tag.textos[0].Texto.id))
      }
      

      return (
        <div id='loader'>
          <Header></Header>

          <div className="spinner"></div>
        </div>
      )
    } else {
      return (
        <div className='selection'>
          <Header></Header>
  
          <SelectionBanner></SelectionBanner>
  
          <div className='selection__content'>
            
            <div className='selection__content__header'>
              <Container fluid>
                <Row>
                  <Col md={1} xs={2}>
                    <img onClick={() => history(-1)} className='selection__content__header__icon' src="/images/icons/seta-esquerda.svg" alt="" />
                  </Col>
  
                  <Col md={8} xs={8}>
                    <h2 className='selection__content__header__title'>{tag.titulo}</h2>
                  </Col>
                </Row>
              </Container>
  
            </div>
  
            <div className="selection__content__texts">
              <Container fluid>
                <Row>
                  { tag.textos.map( (text, index) =>
                    <Col key={text.Texto.id} md={3} xs={6}>
                      <div onClick={()=> {getTextBanner(text.Texto.id); setMenu(false)}} className='selection__content__texts__text'>
                        <div className='selection__content__texts__text__inner'>
    
                          <div className='selection__content__texts__text__inner__img' style={{backgroundImage: `url('https://cinetica.nyc3.digitaloceanspaces.com/Trabalhos/Cin%C3%A9tica/Imagens/${text.Texto.imagem}')`}}></div>
                          <Container fluid className='selection__content__texts__text__inner__container'>
                            <Row>
                              <Col md={9} xs={12}>
                                <div className="selection__content__texts__text__inner__info">
                                  <h2 className="selection__content__texts__text__inner__info__title"> {text.Texto.titulo.length > 40 ? <span>{text.Texto.titulo.substring(0, 40) + '...'}</span>: <span>{text.Texto.titulo}</span>}</h2>
                                  <h3 className='selection__content__texts__text__inner__info__film'>{text.Texto.filme}</h3>
                                </div>
                              </Col>
                              <Col md={3} xs={12}>
                                <h4 className="selection__content__texts__text__inner__date">{moment(text.Texto.data).utcOffset('+000').format('D/M/Y')}</h4>
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
                <div className="selection__content__pages">
                  <Container fluid>
                    <Row>
                      <Col md={2} xs={3}>
                        {
                          parseInt(tag.page) - 1 > 0 ?
                          <div>
                            <Link onClick={()=> setMenu(false)} to={`/tags/${id}/${(parseInt(page) -1)}`}><img  className='selection__content__pages__icon' src="/images/icons/seta-esquerda.svg" alt="" /></Link>
                            <span className="selection__content__pages__number left">{(parseInt(page) -1)}</span>
                          </div>
                          :null
                        }
                      </Col>
                      
                      <Col md={8} xs={6}>
                        <h1 className='selection__content__pages__text'>{page}<span className="selection__content__pages__text__sub">/{tag.total_pages}</span></h1>
                      </Col>
    
                      <Col md={2} xs={3}>
                        {
                          parseInt(tag.page) < tag.total_pages ?
                          <div>
                            <span className="selection__content__pages__number right">{(parseInt(page) +1)}</span>
                            <Link onClick={()=> setMenu(false)} to={`/tags/${id}/${(parseInt(page) +1)}`}><img className='selection__content__pages__icon next' src="/images/icons/seta-esquerda.svg" alt="" /></Link>
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
