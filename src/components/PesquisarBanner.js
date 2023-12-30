import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../scss/pesquisar.scss";
import moment from 'moment';
import "../scss/loader.scss";
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

function PesquisarBanner(props) {

  var resultados = props.resultados;

  var texto = props.texto;

  var mobile = props.mobile;
  
  console.log(resultados);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
  };

  return (
    <div style={{position:'relative'}}> 

      {
        (resultados !== null && texto !== null)?
        <div className='pesquisar__content__banner'>

          {}
          
          <div className='pesquisar__content__banner__img kenburns-bottom' style={{backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.7) 100%), url('https://cinetica.nyc3.digitaloceanspaces.com/Trabalhos/Cin%C3%A9tica/Imagens/${texto.imagem}')`}}></div>

          <Container fluid className='pesquisar__content__banner__container'>
            <Row>
              <Col md={6} xs={7}>

              <h2 style={{marginTop: mobile === true && texto.titulo.length > 25?'8vw':''}} className="pesquisar__content__banner__date">{moment(texto.data).utcOffset('+000').format('D/M/Y')}</h2>
                <h1 className="pesquisar__content__banner__title">{texto.titulo}</h1>
                <h1 className="pesquisar__content__banner__film">{texto.filme}</h1>
                <h2 className="pesquisar__content__banner__author">{texto.autores[0].nome} {texto.autores[1] !== undefined? <span>| {texto.autores[1].nome}</span>: null} {texto.autores[2] !== undefined? <span>| {texto.autores[2].nome}</span>: null} {texto.autores[3] !== undefined? <span>| {texto.autores[3].nome}</span>: null} </h2>

              </Col>

              {
                mobile === false?
                <Col md={4}>
          
                  <div className="pesquisar__content__banner__words">
          
                  { texto.categorias.map( (item, index) =>
          
                    <Link key={item.id} className="pesquisar__content__banner__words__categories" to={`/categorias/${item.categoria.toLowerCase()}/1`}>{item.categoria}</Link>
          
                    )}
          
                    { texto.tags.map( (item, index) =>
          
                    <Link key={item.id} className="pesquisar__content__banner__words__tag"  to={!item.tag.includes('20')?`/tags/${item.tag.toLowerCase()}/1`:`/anos/${item.tag.toLowerCase()}/1`}>{item.tag}</Link>
          
                  )}
          
          
                  </div>
          
                </Col>
                :<Col xs={2}>
                  <img onClick={() => handleShow()} className="pesquisar__content__banner__tag" src="/images/icons/tag.svg" alt="" />
                </Col>
              }

              <Col md={2} xs={3}>
                <Link className="pesquisar__content__banner__link" to={`/texto/${texto.id}`}>Acessar</Link>
              </Col>
            </Row>
          </Container>

        </div>
        :null
      }


      {
        texto !== null?
          <Modal show={show} onHide={handleClose} className="modal">
          <div className='search'>
                    
            { texto.categorias.map( (item, index) =>
              <Link key={item.id} className="search__categories" to={`/categorias/${item.categoria.toLowerCase()}/1`}>{item.categoria}</Link>
            )}

            { texto.tags.map( (item, index) =>
              <Link key={item.id} className="search__tag"  to={!item.tag.includes('20')?`/tags/${item.tag.toLowerCase()}/1`:`/anos/${item.tag.toLowerCase()}/1`}>{item.tag}</Link>
            )}
          </div>
        </Modal>
        :null
      }

    </div>
  )
  
}

function mapStateToProps(state) {
  return {
    texto: state.texto,
    page: state.page,
    mobile: state.mobile,
    resultados: state.resultados
  }
}

export default connect(
  mapStateToProps
)(PesquisarBanner);
