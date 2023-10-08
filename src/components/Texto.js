import { connect } from 'react-redux';
import { store } from '../store';
import { GetText } from '../actions';
import { GetImgLink } from '../actions';
import { Link, useParams } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../scss/texto.scss";
import moment from 'moment';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

function Texto(props) {

  var { id } = useParams();

  var link = props.link;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (link) => {
    store.dispatch(GetImgLink(link))
    setShow(true)
  };

  var texto = props.texto;

  var numero_fundo = Math.floor(Math.random() * 4);

  var numero_texto= Math.floor(Math.random() * 4);

  var cores_fundo = ["#fae9e5","#f4e0d8","#f4f4f4","#e9e9e9"];

  var cores_texto = ["#747474", "#2a2a2a", "#782323", "#530000"];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  if (texto === null || parseInt(id) !== texto.id) {
    store.dispatch(GetText(id))


    return (
      <div></div>
    )
  } else {

    return (
      <div>

        <Header></Header>
        
        <div className='texto'>
          <div className='texto__banner' style={{backgroundImage: `url('https://cinetica.nyc3.digitaloceanspaces.com/Trabalhos/Cin%C3%A9tica/Imagens/${texto.imagem}')`}}></div>

          <div className='texto__header'>

            <h1 className='texto__header__title'>{texto.titulo}</h1>
            <h2 className='texto__header__film'>{texto.filme}</h2>
            <h2 className='texto__header__date'>{moment(texto.data).utcOffset('+000').format('D/M/Y')}</h2>

          </div>

          <div className='texto__main' style={{backgroundColor: `${cores_fundo[numero_fundo]}`}}>
            <div className='texto__main__info'>
              <Container fluid>
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

            {texto.galeria.length > 0 ?
              <div className="texto__main__gallery">

                <Carousel
                  additionalTransfrom={0}
                  arrows
                  className="texto__main__carousel"
                  containerClass="container"
                  draggable
                  focusOnSelect={false}
                  infinite={false}
                  itemClass=""
                  keyBoardControl
                  minimumTouchDrag={80}
                  responsive={responsive}
                  rtl={false}
                  showDots={false}
                  sliderClass=""
                  slidesToSlide={1}
                  swipeable
                >

                  { texto.galeria.map( (item, index) =>
                    <img key={index} className='texto__main__gallery__img' src={`https://cinetica.nyc3.digitaloceanspaces.com/Trabalhos/Cin%C3%A9tica/Galeria/${item.imagem}`} alt="" onClick={() => handleShow(`https://cinetica.nyc3.digitaloceanspaces.com/Trabalhos/Cin%C3%A9tica/Galeria/${item.imagem}`)} />
                  )}

                </Carousel>

              </div>
              :null
            }


            <p className='texto__main__text' style={{color: `${cores_texto[numero_texto]}`}}>{texto.texto}</p>
          </div>

          <div className='texto__footer'>
            { texto.categorias.map( (item, index) =>

              <Link key={item.id} className="texto__footer__categories" to="/">{item.categoria}</Link>

            )}

            { texto.tags.map( (item, index) =>

              <Link key={item.id} className="texto__footer__tags" to="/">{item.tag}</Link>

            )}
          </div>

        </div>

        <Footer></Footer>

        <Modal show={show} onHide={handleClose} className="modal">
          <img className='modal__img' src={link} alt="" />
          <button className="modal__close" onClick={handleClose}>VOLTAR</button>
        </Modal>

      </div>

    )

  }
  
}

function mapStateToProps(state) {
  return {
    texto: state.texto,
    link: state.link
  }
}

export default connect(
  mapStateToProps
)(Texto);