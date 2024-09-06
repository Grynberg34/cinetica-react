import { connect } from 'react-redux';
import { store } from '../store';
import { GetText } from '../actions';
import { GetTextColors } from '../actions';
import { SetFontSize } from '../actions';
import { Link, useParams } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../scss/texto.scss";
import moment from 'moment';
import 'react-multi-carousel/lib/styles.css';
import parse from 'html-react-parser';
import "../scss/loader.scss";

function Texto(props) {

  var { id } = useParams();

  var texto = props.texto;

  var font = props.font;

  var cores = props.cores;

  var mobile = props.mobile;

  var font_value = 0.1;

  if (window.innerWidth < 768 && font === 1) {
    store.dispatch(SetFontSize(4))
  } 

  if (window.innerWidth < 768) {
    font_value = 1
  } 

  function setFontSize(font) {

    if (font > 0.7 && font < 1.5) {
      store.dispatch(SetFontSize(font))
    } else if (font > 2 && font < 7) {
      store.dispatch(SetFontSize(font))
    }
  }

  if (cores.texto === null) {

    store.dispatch(GetTextColors())
  }

  if (texto === null || parseInt(id) !== texto.id) {
    store.dispatch(GetText(id))


    return (
      <div id='loader'>
        <Header></Header>

        <div className="spinner"></div>
      </div>
    )
  } else {

    return (
      <div>

        <Header></Header>
        
        <div className='texto'>
          <div className='texto__banner'>
            <div className={mobile === false?'texto__banner__img kenburns-bottom':'texto__banner__img bg-pan-right'} style={{backgroundImage: `url('https://cinetica.nyc3.digitaloceanspaces.com/Trabalhos/Cin%C3%A9tica/Imagens/${texto.imagem}')`}}></div>
          </div>

          <div className='texto__header'>

            <h1 className='texto__header__title'>{texto.titulo}</h1>
            <h2 className='texto__header__film'>{texto.filme}</h2>
            <h2 className='texto__header__director'>{texto.diretor}</h2>
            <h2 className='texto__header__date'>{moment(texto.data).utcOffset('+000').format('D/M/Y')}</h2>

          </div>

          <div className='texto__main' style={{backgroundColor: `${cores.fundo}`}}>
            <div className='texto__main__info'>
              <Container fluid className='texto__main__info__container'>
                <Row>
                  <Col md={6}>
                    <h3 className='texto__main__info__title'>{texto.titulo}</h3>
                  </Col>

                  <Col md={6}>
                    <h4 className='texto__main__info__author'>{texto.autores[0].nome} {texto.autores[1] !== undefined? <span>| {texto.autores[1].nome}</span>: null} {texto.autores[2] !== undefined? <span>| {texto.autores[2].nome}</span>: null} {texto.autores[3] !== undefined? <span>| {texto.autores[3].nome}</span>: null}</h4>
                  </Col>
                </Row>
              </Container>
            </div>

            <div className="texto__main__font">
              <h5 className="texto__main__font__title">Tamanho da fonte: <span onClick={()=> setFontSize(font-font_value)} className="texto__main__font__size">-</span> <span onClick={()=> setFontSize(font+font_value)} className="texto__main__font__size">+</span></h5>
            </div>

            <p className='texto__main__text' style={{color: `${cores.texto}`, fontSize: `${font}vw`}}>{parse(texto.texto)}</p>
          </div>

          <div className='texto__footer'>
            { texto.categorias.map( (item, index) =>

              <Link key={item.id} className="texto__footer__categories" to={`/categorias/${item.categoria.toLowerCase()}/1`}>{item.categoria}</Link>

            )}

            { texto.tags.map( (item, index) =>

              <Link key={item.id} className="texto__footer__tags"  to={!item.tag.includes('20')?`/tags/${item.tag.toLowerCase()}/1`:`/anos/${item.tag.toLowerCase()}/1`}>{item.tag}</Link>

            )}
          </div>

        </div>

        <Footer></Footer>


      </div>

    )

  }
  
}

function mapStateToProps(state) {
  return {
    texto: state.texto,
    link: state.link,
    index: state.index,
    font: state.font,
    cores: state.cores,
    mobile: state.mobile
  }
}

export default connect(
  mapStateToProps
)(Texto);
